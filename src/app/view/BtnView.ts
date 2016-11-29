module View {
	/**
	 *
	 * @author 
	 *
	 */
	export class BtnView extends Core.BaseEuiView{
    	private btnTuiNa:eui.Image;
    	private btnZhenJiu:eui.Image;
    	private btnAiJiu:eui.Image;
    	private btnHuoLongJiu:eui.Image;
    	private btnContactMe:eui.Image;
    	
    	private _curSelect:eui.Image;
		public constructor() 
		{
    		super("BtnViewSkin_exml");
		}
		
		public init():void
		{
    		this.y = -400;
    		egret.Tween.get(this).to({ y: App.LayoutManager.clientTop + 10},1000,egret.Ease.bounceOut)
            .call(()=>{egret.Tween.removeTweens(this)},this);
    		
    		this.btnTuiNa.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    		this.btnZhenJiu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    		this.btnAiJiu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    		this.btnHuoLongJiu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    		this.btnContactMe.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
		}
		
		public destroy():void
		{
    		if(this._active)
    		{
                this.btnTuiNa.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
                this.btnZhenJiu.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
                this.btnAiJiu.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
                this.btnHuoLongJiu.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
                this.btnContactMe.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
        		super.destroy();
    		}
		}
		
        private onBtnClick(e:egret.TouchEvent):void
        {
            this.showBtnMove(e.currentTarget)
            if(this._curSelect && this._curSelect == e.currentTarget) return;
            this._curSelect = e.currentTarget;
            switch(e.currentTarget)
            {
                case this.btnTuiNa:
                    App.LayerManager.bg.loadFromTexture("bg2_png",1);
                    App.ScenesManager.switchScene(View.Page2,"page2")
                    break;
                case this.btnZhenJiu:
                    App.LayerManager.bg.loadFromTexture("bg3_png",1);
                    App.ScenesManager.switchScene(View.Page3,"page3")
                    break;
                case this.btnAiJiu:
                    App.LayerManager.bg.loadFromTexture("bg4_png",1);
                    App.ScenesManager.switchScene(View.Page3,"page4")
                    break;
                case this.btnHuoLongJiu:
                    App.LayerManager.bg.loadFromTexture("bg5_png",1);
                    App.ScenesManager.switchScene(View.Page3,"page5")
                    break;
                case this.btnContactMe:
                App.UIViewManager.show(View.ContactMeView, "me")
                    break;
            }
        }
        
        private showBtnMove(btn:eui.Button):void
        {
            btn.scaleX = 0.5;
            btn.scaleY = 0.5;
            egret.Tween.removeTweens(btn);
            egret.Tween.get(btn).to({ alpha: 1,scaleX: 1,scaleY: 1 },800,egret.Ease.backOut).call(()=>
                { 
                    egret.Tween.removeTweens(btn);
                },this);
        }
		
        public reSize(): void
        {
            this.x = App.LayoutManager.clientLeft + 10;
            this.y = App.LayoutManager.clientTop + 10;
        }
	}
}
