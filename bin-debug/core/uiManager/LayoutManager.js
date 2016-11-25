/**
 * 自动布局和视窗同步管理器
 * author chuhua
 */
var Core;
(function (Core) {
    var LayoutManager = (function (_super) {
        __extends(LayoutManager, _super);
        function LayoutManager() {
            _super.call(this);
            LayoutManager.self = this;
            this._clientSizeSyncList = [];
            this._autoLayoutMap = new HashMap();
            this._childScaleRatio = 1;
        }
        var d = __define,c=LayoutManager,p=c.prototype;
        p.init = function () {
            this.onClientWindowResize();
            window.addEventListener("resize", this.onClientWindowResize);
        };
        /**
         * 注册自动布局对象
         * @param dc                自动布局显示对象
         * @param onlySyncDisList   子项自动布局列表（null表示所有子项）
         */
        p.register = function (dc, onlySyncDisList) {
            if (onlySyncDisList === void 0) { onlySyncDisList = null; }
            this.registAutoLayout(dc, onlySyncDisList);
            this.registSyncToClientSize(dc);
        };
        /**
         * 注销自动布局对象
         * @param dc        自动布局显示对象
         */
        p.unRegister = function (dc) {
            this.unRegistSyncToClientSize(dc);
            this.unRegistAutoLayout(dc);
        };
        /**
         * 手动添加自动布局显示对象
         * @param dc        自动布局的显示容器
         * @param dis       显示容器内部的显示对象
         */
        p.addLayoutItemToDc = function (dc, dis) {
            if (dc && dis && dis.parent == dc) {
                var childLocMap = this._autoLayoutMap.getValue(dc);
                if (childLocMap == null) {
                    childLocMap = new HashMap();
                    this._autoLayoutMap.add(dc, childLocMap);
                }
                childLocMap.add(dis, [dis.x, dis.y]);
            }
        };
        /**
         * 手动移除自动布局显示对象
         * @param dc        自动布局的显示容器
         * @param dis       显示容器内部的显示对象
         */
        p.removeLayoutItemFromDc = function (dc, dis) {
            if (dc && dis) {
                var childLocMap = this._autoLayoutMap.getValue(dc);
                if (childLocMap) {
                    childLocMap.remove(dis);
                    if (childLocMap.keyList.length == 0) {
                        this._autoLayoutMap.remove(dc);
                    }
                }
            }
        };
        /**
         * 手动更新自动布局对象位置
         * @param dc            自动布局的显示容器
         * @param dis           显示容器内部的显示对象
         * @param targetX       目标位置X
         * @param targetY       目标位置Y
         */
        p.updateLayoutItemLoc = function (dc, dis, targetX, targetY) {
            if (targetX === void 0) { targetX = NaN; }
            if (targetY === void 0) { targetY = NaN; }
            if (dc && dis) {
                var childLocMap = this._autoLayoutMap.getValue(dc);
                if (childLocMap) {
                    var locList = childLocMap.getValue(dis);
                    if (locList && locList.length == 2) {
                        if (targetX != NaN) {
                            locList[0] = targetX;
                        }
                        else {
                            locList[0] = dis.x;
                        }
                        if (targetY != NaN) {
                            locList[1] = targetY;
                        }
                        else {
                            locList[1] = dis.y;
                        }
                    }
                }
            }
        };
        /**
         * 注册视窗同步对象
         * 注册后显示对象容器的大小会自动匹配浏览器实际窗口大小
         */
        p.registSyncToClientSize = function (dc) {
            if (dc) {
                if (this._clientSizeSyncList.indexOf(dc) < 0) {
                    this._clientSizeSyncList.push(dc);
                    this.syncToClientSize();
                }
            }
        };
        /**
         * 移除注册
         * @param dc        显示对象容器
         */
        p.unRegistSyncToClientSize = function (dc) {
            if (dc) {
                var idx = this._clientSizeSyncList.indexOf(dc);
                if (idx >= 0) {
                    this._clientSizeSyncList.splice(idx, 1);
                }
            }
        };
        /**
         * 注册自动布局对象
         * 注册后显示对象容器内的对象会根据容器本身大小自动调整位置布局
         */
        p.registAutoLayout = function (dc, onlySyncDisList) {
            if (dc) {
                var childLocMap = this._autoLayoutMap.getValue(dc);
                if (childLocMap)
                    this.unRegistAutoLayout(dc);
                childLocMap = new HashMap();
                var dis;
                var i;
                if (onlySyncDisList) {
                    for (i = 0; i < onlySyncDisList.length; i++) {
                        dis = onlySyncDisList[i];
                        if (dis.parent == dc) {
                            childLocMap.add(dis, [dis.x, dis.y]);
                        }
                    }
                }
                else {
                    for (i = 0; i < dc.numChildren; i++) {
                        dis = dc.getChildAt(i);
                        childLocMap.add(dis, [dis.x, dis.y]);
                    }
                }
                this._autoLayoutMap.add(dc, childLocMap);
            }
        };
        /**
         * 移除注册
         */
        p.unRegistAutoLayout = function (dc) {
            if (dc) {
                var childLocMap = this._autoLayoutMap.remove(dc);
                if (childLocMap) {
                    childLocMap.clear();
                }
            }
        };
        /**
         * 更新布局
         */
        p.update = function () {
            LayoutManager.self.getClientWindowSize();
            if (LayoutManager.self._clientSizeSyncList.length > 0) {
                LayoutManager.self.syncToClientSize();
            }
        };
        p.onClientWindowResize = function () {
            LayoutManager.self.update();
            App.EventDispatcher.dispatchEvent(new egret.Event(EventName.STAGE_RESIZE));
        };
        p.getClientWindowSize = function () {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            if (this.windowWidth == null || this.windowHeight == null) {
                if (document.body) {
                    this.windowWidth = document.body.clientWidth;
                    this.windowHeight = document.body.clientHeight;
                }
                if (this.windowWidth == null || this.windowHeight == null) {
                    if (document.documentElement) {
                        this.windowWidth = document.documentElement.clientWidth;
                        this.windowHeight = document.documentElement.clientHeight;
                    }
                }
            }
            if (this.windowHeight < this.windowWidth) {
                var temp = this.windowWidth;
                this.windowWidth = this.windowHeight;
                this.windowHeight = temp;
            }
            this.scaleX = this.windowWidth / App.LayerManager.stage.stageWidth;
            this.scaleY = this.windowHeight / App.LayerManager.stage.stageHeight;
            this.displayScale = Math.max(this.scaleX, this.scaleY);
            this.scaleX = this.scaleX / this.displayScale;
            this.scaleY = this.scaleY / this.displayScale;
            this.clientWidth = Math.round(this.windowWidth / this.displayScale);
            this.clientHeight = Math.round(this.windowHeight / this.displayScale);
            this.clientLeft = Math.round((App.LayerManager.stage.stageWidth - this.windowWidth / this.displayScale) / 2);
            this.clientTop = Math.round((App.LayerManager.stage.stageHeight - this.windowHeight / this.displayScale) / 2);
            var windowAspectRatio = this.windowHeight / this.windowWidth;
            if (windowAspectRatio < LayoutManager.aspectRatioLimitLow) {
                this._childScaleRatio = windowAspectRatio / LayoutManager.aspectRatioLimitLow;
            }
            else if (windowAspectRatio > LayoutManager.aspectRatioLimitHigh) {
                this._childScaleRatio = LayoutManager.aspectRatioLimitHigh / windowAspectRatio;
            }
            else {
                this._childScaleRatio = 1;
            }
        };
        p.syncToClientSize = function () {
            var dc;
            for (var i = 0; i < this._clientSizeSyncList.length; i++) {
                dc = this._clientSizeSyncList[i];
                dc.width = this.clientWidth;
                dc.height = this.clientHeight;
                dc.x = this.clientLeft;
                dc.y = this.clientTop;
                if (this._autoLayoutMap.has(dc)) {
                    this.autoLayoutChildren(dc);
                }
            }
        };
        /**
         * 手动调用自动布局
         * 显示对象容器内的对象会根据容器本身大小自动调整位置布局
         * @param dc        显示对象容器
         */
        p.autoLayoutChildren = function (dc) {
            var childLocMap = this._autoLayoutMap.getValue(dc);
            if (childLocMap) {
                var child;
                var childLoc;
                for (var i = 0; i < childLocMap.keyList.length; i++) {
                    child = childLocMap.keyList[i];
                    childLoc = childLocMap.getValue(child);
                    child.x = childLoc[0] * this.scaleX - child.width * (1 - this.scaleX) * childLoc[0] / App.LayerManager.stage.stageWidth;
                    child.y = childLoc[1] * this.scaleY - child.height * (1 - this.scaleY) * childLoc[1] / App.LayerManager.stage.stageHeight;
                    if (this._childScaleRatio < 1) {
                        child.x += child.width * (1 - this._childScaleRatio) * child.x / (dc.width - child.width);
                        child.y += child.height * (1 - this._childScaleRatio) * child.y / (dc.height - child.height);
                    }
                    child.scaleX = child.scaleY = this._childScaleRatio;
                }
            }
        };
        LayoutManager.aspectRatioLimitLow = 1.5; //屏幕宽高比的下限（用于横屏布局）
        LayoutManager.aspectRatioLimitHigh = 2; //屏幕宽高比的上限（用于竖屏布局）
        return LayoutManager;
    }(Core.BaseSingleton));
    Core.LayoutManager = LayoutManager;
    egret.registerClass(LayoutManager,'Core.LayoutManager');
})(Core || (Core = {}));
//# sourceMappingURL=LayoutManager.js.map