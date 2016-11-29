module Core {
	/**
	 *
	 * @author 
	 *
	 */
	export class UIViewManager extends Core.BaseSingleton
	{
        private _uiLayer:egret.DisplayObjectContainer;
        private _viewDataMap: HashMap;
        private _curData: Core.EuiViewData;
        private _autoHideViewMap: HashMap;
		public constructor() 
		{
    		super();
    		this._viewDataMap = new HashMap();
    		this._autoHideViewMap = new HashMap();
		}
		
		public init(uiLayer:egret.DisplayObjectContainer):void
		{
    		this._uiLayer = uiLayer;
		}
		
        public show(euiComponentClass: any,resGroupName: string = null):void
		{
            var data: Core.EuiViewData = this.getData(euiComponentClass);
            if(data)
            {
                var view: BaseEuiView = data.view;
                this._uiLayer.addChild(view);
            } else
            {
                if(resGroupName == "") resGroupName = null;
                data = new Core.EuiViewData(euiComponentClass,resGroupName);
                if(resGroupName == null || RES.isGroupLoaded(resGroupName))
                {
                    this.createView(data);
                } else
                {
                    this._curData = data;
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
                    RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
                    RES.loadGroup(resGroupName,2);
                    Log.trace("开始加载资源包 " + resGroupName);
                }
            }
		}
		
        private onResourceLoadComplete(e: RES.ResourceEvent): void
        {
            if(this._curData && this._curData.resGroupName == e.groupName)
            {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
                this.createView(this._curData);
                this._curData = null;
            }
        }

        private onResourceLoadError(e: RES.ResourceEvent): void
        {
            if(this._curData && this._curData.resGroupName == e.groupName)
            {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
                this._curData = null;
            }
        }

        private createView(data: Core.EuiViewData): void
        {
            var euiComponentClass: any = data.euiComponentClass;
            this._viewDataMap.add(euiComponentClass,data);
            var view: BaseEuiView = new euiComponentClass();
            data.setView(view);
            this._uiLayer.addChild(view);
        }

        /**
         * 关闭视图
         * @param euiComponentClassOrView       视图类或者视图对象
         */
        public close(euiComponentClassOrView: any): void
        {
            var data: Core.EuiViewData = this.getData(euiComponentClassOrView);
            if(data)
            {
                ToolMod.removeFromParent(data.view);
                data.view.destroy();
                this._viewDataMap.remove(data.euiComponentClass);
                data.destroy();
            }
        }


        /**
         * 关闭所有视图
         */
        public closeAll(): void
        {
            while(this._viewDataMap.keyList.length > 0)
            {
                this.close(this._viewDataMap.keyList[0]);
            }
        }

        /**
         * 隐藏视图
         * @param euiComponentClassOrView       视图类或者视图对象
         */
        public hide(euiComponentClassOrView: any): void
        {
            var data: Core.EuiViewData = this.getData(euiComponentClassOrView);
            if(data)
            {
               ToolMod.removeFromParent(data.view);
            }
        }

        private addToAutoHideViews(data: Core.EuiViewData): void
        {
            var hideDataList: Core.EuiViewData[] = [];
            var theData: Core.EuiViewData;
            for(var i: number = 0;i < this._viewDataMap.valueList.length;i++)
            {
                theData = this._viewDataMap.valueList[i];
                if(theData.view && theData.view.visible)
                {
                    if(theData.euiComponentClass != data.euiComponentClass)
                    {
                        hideDataList.push(theData);
                        theData.view.visible = false;
                    }
                }
            }
            if(hideDataList.length > 0)
            {
                this._autoHideViewMap.add(data,hideDataList);
            }
        }

        private removeFromAutoHideViews(data: Core.EuiViewData): void
        {
            var hideDataList: Core.EuiViewData[] = this._autoHideViewMap.remove(data);
            if(hideDataList)
            {
                var theData: Core.EuiViewData;
                for(var i: number = 0;i < hideDataList.length;i++)
                {
                    theData = hideDataList[i];
                    if(theData && theData.view)
                    {
                        theData.view.visible = true;
                    }
                }
                hideDataList.splice(0,hideDataList.length);
            }
        }

        private getData(euiComponentClassOrView: any): Core.EuiViewData
        {
            var data: Core.EuiViewData = this._viewDataMap.getValue(euiComponentClassOrView);
            if(data)
            {
                return data;
            } else
            {
                for(var i: number = 0;i < this._viewDataMap.valueList.length;i++)
                {
                    data = this._viewDataMap.valueList[i];
                    if(data.view == euiComponentClassOrView)
                    {
                        return data;
                    }
                }
            }
            return null;
        }
	}
}
