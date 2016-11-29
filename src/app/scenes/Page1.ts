module View {
	/**
	 *
	 * @author 
	 *
	 */
	export class Page1 extends Core.BaseEuiScene{
        private imgLogoBg:eui.Image;
        private imgLogoFont: eui.Image;
        private imgFont:eui.Image;
        private imgInto:eui.Image;
		public constructor() 
		{
            super("page1Skin_exml");
		}
		
		public destroy():void
		{
            if(this._active)
            {
                this.imgInto.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
                this.logoMoveStop();
                this.btnMoveStop();
                this.fontMoveStop();
                super.destroy();
            }
		}
		
		public init():void
		{
    		super.init();
    		
    		this.imgInto.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClick,this);
    		
    		var fontMask:egret.Shape = new egret.Shape();
    		fontMask.graphics.beginFill(0xffffff);
    		fontMask.graphics.drawRect(450,0,450, 530);
    		fontMask.graphics.endFill();
    		this.addChild(fontMask);
    		
    		this.imgFont.mask = fontMask;
    		this.imgInto.alpha = 0;
    		
    		this.imgLogoBg.alpha = 0;
    		this.imgLogoFont.alpha = 0;
    		this.imgLogoFont.scaleX = 3;
    		this.imgLogoFont.scaleY = 3;
    		egret.Tween.get(this.imgLogoBg).to({alpha: 1}, 1000)
    		.call(()=>{egret.Tween.get(this.imgLogoFont).to({alpha: 1, scaleX: 1, scaleY: 1},1000).call(this.logoMoveStop,this)},this);
		
    		egret.Tween.get(fontMask).to({x: -450}, 5000).call(this.fontMoveStop,this);
    		
    		ToolMod.delayApply(4000,this,this.showBtnMove);
		}
		
        private onBtnClick(e:egret.TouchEvent):void
        {
            App.LayerManager.bg.loadFromTexture("bg2_png",1);
            App.ScenesManager.switchScene(View.Page2,"page2")
            App.UIViewManager.show(View.BtnView,"btnview");
        }
        
        private showBtnMove():void
        {
            this.imgInto.scaleX = 0.5;
            this.imgInto.scaleY = 0.5;
            egret.Tween.get(this.imgInto).to({ alpha:1, scaleX:1, scaleY:1 },1000,egret.Ease.backOut).call(this.btnMoveStop,this);
        }
        
        private btnMoveStop():void
        {
            egret.Tween.removeTweens(this.imgInto);
        }
		
		private fontMoveStop():void
		{
    		egret.Tween.removeTweens(this.imgFont);
		}
		
		private logoMoveStop():void
		{
    		egret.Tween.removeTweens(this.imgLogoBg);
    		egret.Tween.removeTweens(this.imgLogoFont);
		}
	}
}
