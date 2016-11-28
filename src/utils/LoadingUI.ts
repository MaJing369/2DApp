class LoadingUI extends egret.Sprite {
    private _txtField: egret.TextField;
    private _imgLogo:eui.Image;
    public constructor() {
        super();
        RES.loadGroup("logo");
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        this.createView();
    }
    
    private onResourceLoadComplete(e:RES.ResourceEvent):void
    {
        if(e.groupName != "logo") return;
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        this._imgLogo = new eui.Image();
        this._imgLogo.texture = RES.getRes("logo_png");
        this._imgLogo.anchorOffsetY = this._imgLogo.anchorOffsetX = 110;
        this._imgLogo.x = (this.stage.stageWidth - this._imgLogo.width) / 2 + 110;
        this._imgLogo.y = (this.stage.stageHeight - this._imgLogo.height) / 2 - 10;
        this.addChild(this._imgLogo);
        egret.Tween.get(this._imgLogo,{ loop: true }).to({ rotation: 360 },2000);
    }
    
    public destroy():void
    {
        if(this._imgLogo)
        {
            egret.Tween.removeTweens(this._imgLogo);
            if(this._imgLogo)
            {
                if(this._imgLogo.texture)this._imgLogo.texture.dispose();
                this.removeChild(this._imgLogo);
                this._imgLogo = null;
            }
        }
        
        if(this._txtField)
        {
            this.removeChild(this._txtField);
        }
    }

    private createView():void {
        this._txtField = new egret.TextField();
        this.addChild(this._txtField);
        this._txtField.y = 400;
        this._txtField.width = 480;
        this._txtField.height = 100;
        this._txtField.x = (App.LayerManager.stage.stageWidth - this._txtField.width) / 2;
        this._txtField.textAlign = "center";
    }

    public setProgress(current:number, total:number):void {
        this._txtField.text = `Loading...${current}/${total}`;
    }
}
