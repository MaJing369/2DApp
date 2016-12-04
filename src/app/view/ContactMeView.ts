module View {
	/**
	 *
	 * @author 
	 *
	 */
	export class ContactMeView extends Core.BaseEuiView{
    	private imgClose:eui.Image;
        public constructor()
		{
            super("contactMeSkin_exml",true);
		}
		
		public destroy():void
		{
    		if(this._active)
    		{
    		    super.destroy();
    		}
		}
		
		public init():void
		{
    		this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1},800,egret.Ease.backOut);
            this.imgClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnCloseTap, this);
		}
	}
}
