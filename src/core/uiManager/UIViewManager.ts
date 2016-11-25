module Core {
	/**
	 *
	 * @author 
	 *
	 */
	export class UIViewManager extends Core.BaseSingleton
	{
        private _uiLayer:egret.DisplayObjectContainer;
		public constructor() 
		{
    		super();
		}
		
		public init(uiLayer:egret.DisplayObjectContainer):void
		{
    		this._uiLayer = uiLayer;
		}
	}
}
