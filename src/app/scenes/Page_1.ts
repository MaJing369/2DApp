module View {
	/**
	 *
	 * @author 
	 *
	 */
	export class Page_1 extends Core.BaseEuiScene{
    	private btnInto:eui.Image;
		public constructor() {
            super("page1Skin_exml");
            
            this.btnInto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnInto, this);
		}
		
		private onBtnInto():void
		{
		}
	}
}
