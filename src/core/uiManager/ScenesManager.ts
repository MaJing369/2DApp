module Core 
{
	/**
	 *
	 * @author 
	 *
	 */
	export class ScenesManager extends BaseSingleton
	{
    	private _curSceneClass:any;
    	private _resGroupName:string;
        private _curScene: BaseEuiScene;
        private _layer: egret.DisplayObjectContainer;
    	
		public constructor() 
		{
    		super();
		}
		
        public init(sceneLayer: egret.DisplayObjectContainer): void
        {
            this._layer = sceneLayer;
        }
		
        public switchScene(sceneClass:any, resGroupName:string=null):void
        {
            this._curSceneClass = sceneClass;
            this._resGroupName = resGroupName;
            
            if(resGroupName == null || resGroupName == "" || RES.isGroupLoaded(resGroupName))
            {
                this.toScene();
            }else
            {
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
                RES.loadGroup(resGroupName,3);
                Log.trace("开始加载资源包 " + resGroupName);
            }
        }
        
        private onResourceLoadComplete(e: RES.ResourceEvent): void
        {
            if(this._curSceneClass && this._resGroupName == e.groupName)
            {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
                Log.trace("加载资源包成功 " + this._resGroupName);
                this.toScene();
                this._curSceneClass = null;
                this._resGroupName = null;
            }
        }

        private onResourceLoadError(e: RES.ResourceEvent): void
        {
            if(this._curSceneClass && this._resGroupName == e.groupName)
            {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
                Log.trace("加载资源包失败 " + this._resGroupName);
                this._curSceneClass = null;
                this._resGroupName = null;
            }
        }
        
        private toScene():void
        {
            this._curScene = new this._curSceneClass();
            App.LayoutManager.register(this._curScene);
            this.clearScene();
            this._layer.addChild(this._curScene);
        }
        
        public clearScene():void
        {
            while(this._layer.numChildren) 
            {
                var sc: Core.BaseEuiScene = this._layer.getChildAt(0) as Core.BaseEuiScene
                ToolMod.removeFromParent(sc);
                ToolMod.clearDisplayContainer(sc,true,true,true);
            }
        }
	}
}
