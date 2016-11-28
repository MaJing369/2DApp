/**
 * 自动布局和视窗同步管理器
 * author chuhua
 */
module Core
{
    export class LayoutManager extends BaseSingleton
    {
        private static aspectRatioLimitLow: number = 1.5;//屏幕宽高比的下限（用于横屏布局）
        private static aspectRatioLimitHigh: number = 2;//屏幕宽高比的上限（用于竖屏布局）
        private static self: LayoutManager;

        public clientLeft: number;
        public clientTop: number;
        public clientWidth: number;
        public clientHeight: number;
        public windowWidth: number;
        public windowHeight: number;
        public displayScale: number;
        public scaleX: number;
        public scaleY: number;

        private _clientSizeSyncList: egret.DisplayObjectContainer[];
        private _autoLayoutMap: HashMap;
        private _childScaleRatio: number;

        private _isSafari: Boolean;

        public constructor()
        {
            super();
            LayoutManager.self = this;
            this._clientSizeSyncList = [];
            this._autoLayoutMap = new HashMap();
            this._childScaleRatio = 1;
        }

        public init(): void
        {
            this.onClientWindowResize();
            window.addEventListener("resize",this.onClientWindowResize);
        }


        /**
         * 注册自动布局对象
         * @param dc                自动布局显示对象
         * @param onlySyncDisList   子项自动布局列表（null表示所有子项）
         */
        public register(dc: egret.DisplayObjectContainer,onlySyncDisList: egret.DisplayObject[] = null): void
        {
            this.registAutoLayout(dc,onlySyncDisList);
            this.registSyncToClientSize(dc);
        }

        /**
         * 注销自动布局对象
         * @param dc        自动布局显示对象
         */
        public unRegister(dc: egret.DisplayObjectContainer): void
        {
            this.unRegistSyncToClientSize(dc);
            this.unRegistAutoLayout(dc);
        }


        /**
         * 手动添加自动布局显示对象
         * @param dc        自动布局的显示容器
         * @param dis       显示容器内部的显示对象
         */
        public addLayoutItemToDc(dc: egret.DisplayObjectContainer,dis: egret.DisplayObject): void
        {
            if(dc && dis && dis.parent == dc)
            {
                var childLocMap: HashMap = this._autoLayoutMap.getValue(dc);
                if(childLocMap == null)
                {
                    childLocMap = new HashMap();
                    this._autoLayoutMap.add(dc,childLocMap);
                }
                childLocMap.add(dis,[dis.x,dis.y]);
            }
        }


        /**
         * 手动移除自动布局显示对象
         * @param dc        自动布局的显示容器
         * @param dis       显示容器内部的显示对象
         */
        public removeLayoutItemFromDc(dc: egret.DisplayObjectContainer,dis: egret.DisplayObject): void
        {
            if(dc && dis)
            {
                var childLocMap: HashMap = this._autoLayoutMap.getValue(dc);
                if(childLocMap)
                {
                    childLocMap.remove(dis);
                    if(childLocMap.keyList.length == 0)
                    {
                        this._autoLayoutMap.remove(dc);
                    }
                }
            }
        }


        /**
         * 手动更新自动布局对象位置
         * @param dc            自动布局的显示容器
         * @param dis           显示容器内部的显示对象
         * @param targetX       目标位置X
         * @param targetY       目标位置Y
         */
        public updateLayoutItemLoc(dc: egret.DisplayObjectContainer,dis: egret.DisplayObject,targetX: number = NaN,targetY: number = NaN): void
        {
            if(dc && dis)
            {
                var childLocMap: HashMap = this._autoLayoutMap.getValue(dc);
                if(childLocMap)
                {
                    var locList: number[] = childLocMap.getValue(dis);
                    if(locList && locList.length == 2)
                    {
                        if(targetX != NaN)
                        {
                            locList[0] = targetX;
                        } else
                        {
                            locList[0] = dis.x;
                        }
                        if(targetY != NaN)
                        {
                            locList[1] = targetY;
                        } else
                        {
                            locList[1] = dis.y;
                        }
                    }
                }
            }
        }

        /**
         * 注册视窗同步对象
         * 注册后显示对象容器的大小会自动匹配浏览器实际窗口大小
         */
        private registSyncToClientSize(dc: egret.DisplayObjectContainer): void
        {
            if(dc)
            {
                if(this._clientSizeSyncList.indexOf(dc) < 0)
                {
                    this._clientSizeSyncList.push(dc);
                    this.syncToClientSize();
                }
            }
        }

        /**
         * 移除注册
         * @param dc        显示对象容器
         */
        private unRegistSyncToClientSize(dc: egret.DisplayObjectContainer): void
        {
            if(dc)
            {
                var idx: number = this._clientSizeSyncList.indexOf(dc);
                if(idx >= 0)
                {
                    this._clientSizeSyncList.splice(idx,1);
                }
            }
        }

        /**
         * 注册自动布局对象
         * 注册后显示对象容器内的对象会根据容器本身大小自动调整位置布局
         */
        private registAutoLayout(dc: egret.DisplayObjectContainer,onlySyncDisList: egret.DisplayObject[]): void
        {
            if(dc)
            {
                var childLocMap: HashMap = this._autoLayoutMap.getValue(dc);
                if(childLocMap) this.unRegistAutoLayout(dc);
                childLocMap = new HashMap();
                var dis: egret.DisplayObject;
                var i: number;
                if(onlySyncDisList)
                {
                    for(i = 0;i < onlySyncDisList.length;i++)
                    {
                        dis = onlySyncDisList[i];
                        if(dis.parent == dc)
                        {
                            childLocMap.add(dis,[dis.x,dis.y]);
                        }
                    }
                } else
                {
                    for(i = 0;i < dc.numChildren;i++)
                    {
                        dis = dc.getChildAt(i);
                        childLocMap.add(dis,[dis.x,dis.y]);
                    }
                }
                this._autoLayoutMap.add(dc,childLocMap);
            }
        }

        /**
         * 移除注册
         */
        private unRegistAutoLayout(dc: egret.DisplayObjectContainer): void
        {
            if(dc)
            {
                var childLocMap: HashMap = this._autoLayoutMap.remove(dc);
                if(childLocMap)
                {
                    childLocMap.clear();
                }
            }
        }

        /**
         * 更新布局
         */
        public update():void
        {
            LayoutManager.self.getClientWindowSize();
            if(LayoutManager.self._clientSizeSyncList.length > 0)
            {
                LayoutManager.self.syncToClientSize();
            }
            App.EventDispatcher.dispatchEvent(new egret.Event(EventName.STAGE_RESIZE));
        }
        
        private onClientWindowResize():void
        {
            LayoutManager.self.update();
        }

        private getClientWindowSize():void
        {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            if(this.windowWidth == null || this.windowHeight == null)
            {
                if(document.body)
                {
                    this.windowWidth = document.body.clientWidth;
                    this.windowHeight = document.body.clientHeight;
                }
                if(this.windowWidth == null || this.windowHeight == null)
                {
                    if(document.documentElement)
                    {
                        this.windowWidth = document.documentElement.clientWidth;
                        this.windowHeight = document.documentElement.clientHeight;
                    }
                }
            }
            if(this.windowHeight < this.windowWidth) //横屏处理
            {
                var temp: number = this.windowWidth;
                this.windowWidth = this.windowHeight;
                this.windowHeight = temp;
            }
            this.scaleX = this.windowWidth / App.LayerManager.stage.stageWidth;
            this.scaleY = this.windowHeight / App.LayerManager.stage.stageHeight;
            this.displayScale = Math.max(this.scaleX,this.scaleY);
            this.scaleX = this.scaleX / this.displayScale;
            this.scaleY = this.scaleY / this.displayScale;
            this.clientWidth = Math.round(this.windowWidth / this.displayScale);
            this.clientHeight = Math.round(this.windowHeight / this.displayScale);
            this.clientLeft = Math.round((App.LayerManager.stage.stageWidth - this.windowWidth / this.displayScale) / 2);
            this.clientTop = Math.round((App.LayerManager.stage.stageHeight - this.windowHeight / this.displayScale) / 2);

            var windowAspectRatio: number = this.windowHeight / this.windowWidth;
            if(windowAspectRatio < LayoutManager.aspectRatioLimitLow)
            {
                this._childScaleRatio = windowAspectRatio / LayoutManager.aspectRatioLimitLow;
            } else if(windowAspectRatio > LayoutManager.aspectRatioLimitHigh)
            {
                this._childScaleRatio = LayoutManager.aspectRatioLimitHigh / windowAspectRatio;
            } else
            {
                this._childScaleRatio = 1;
            }
        }

        private syncToClientSize():void
        {
            var dc: egret.DisplayObjectContainer;
            for(var i: number = 0;i < this._clientSizeSyncList.length;i++)
            {
                dc = this._clientSizeSyncList[i];
                dc.width = this.clientWidth;
                dc.height = this.clientHeight;
                dc.x = this.clientLeft;
                dc.y = this.clientTop;
                if(this._autoLayoutMap.has(dc))
                {
                    this.autoLayoutChildren(dc);
                }
            }
        }


        /**
         * 手动调用自动布局
         * 显示对象容器内的对象会根据容器本身大小自动调整位置布局
         * @param dc        显示对象容器
         */
        public autoLayoutChildren(dc: egret.DisplayObjectContainer):void
        {
            var childLocMap: HashMap = this._autoLayoutMap.getValue(dc);
            if(childLocMap)
            {
                var child: egret.DisplayObject;
                var childLoc: number[];
                for(var i: number = 0;i < childLocMap.keyList.length;i++)
                {
                    child = childLocMap.keyList[i];
                    childLoc = childLocMap.getValue(child);
                    child.x = childLoc[0] * this.scaleX - child.width * (1 - this.scaleX) * childLoc[0] / App.LayerManager.stage.stageWidth;
                    child.y = childLoc[1] * this.scaleY - child.height * (1 - this.scaleY) * childLoc[1] / App.LayerManager.stage.stageHeight;
                    if(this._childScaleRatio < 1)
                    {
                        child.x += child.width * (1 - this._childScaleRatio) * child.x / (dc.width - child.width);
                        child.y += child.height * (1 - this._childScaleRatio) * child.y / (dc.height - child.height);
                    }
                    child.scaleX = child.scaleY = this._childScaleRatio;
                }
            }
        }
    }
}
