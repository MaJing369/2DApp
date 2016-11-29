module View {
	/**
	 *
	 * @author 
	 *
	 */
	export class ContactMeView extends Core.BaseEuiView{
		public constructor()
		{
    		super("");
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
    		
		}
	}
}
