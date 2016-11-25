module View {
	/**
	 *
	 * @author 
	 *
	 */
	export class TestScene extends Core.BaseEuiScene
	{
    	private btn1:eui.Button;
        private btn2:eui.Button;
        private btn3:eui.Button;
        private btn4:eui.Button;
        private btn5:eui.Button;
        private btn6:eui.Button;
		public constructor() 
		{
    		super("TestSkin_exml");
    		
    		this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBtnTap, this);
    		this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBtnTap, this);
    		this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBtnTap, this);
    		this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBtnTap, this);
    		this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBtnTap, this);
    		this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBtnTap, this);
		}
		
        public destroy():void
		{
            if(this._active)
            {
                this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnTap,this);
                this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnTap,this);
                this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnTap,this);
                this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnTap,this);
                this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnTap,this);
                this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnTap,this);
            }
            super.destroy();
		}
		
        private onBtnTap(e:egret.TouchEvent):void
        {
            switch(e.currentTarget)
            {
                case this.btn1:
                {
                    App.LayerManager.bg.loadFromTexture("sc1bg_png", 1);
                    break;
                }
                case this.btn2:
                {
                    App.LayerManager.bg.loadFromTexture("sc1bg_png", 2);
                    break;
                }
                case this.btn3:
                {
                    App.LayerManager.bg.loadFromTexture("sc1bg_png", 3);
                    break;
                }
                case this.btn4:
                {
                    App.LayerManager.bg.loadFromTexture("sc1bg_png", 4);
                    break;
                }
                case this.btn5:
                {
                    App.LayerManager.bg.loadFromTexture("sc1bg_png", 5);
                    break;
                }
                case this.btn6:
                {
                    App.LayerManager.bg.loadFromTexture("sc1bg_png", 6);
                    break;
                }
            }
        }
	}
}
