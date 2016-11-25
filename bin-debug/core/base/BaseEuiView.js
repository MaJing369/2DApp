var Core;
(function (Core) {
    /**
     *
     * @author
     *
     */
    var BaseEuiView = (function (_super) {
        __extends(BaseEuiView, _super);
        function BaseEuiView(skinResName) {
            _super.call(this);
            this._active = false;
            this._skinResName = skinResName;
            this.skinName = RES.getRes(this._skinResName);
            if (this.skinName == null)
                throw new Error("皮肤加载失败,skinName:" + skinResName);
        }
        var d = __define,c=BaseEuiView,p=c.prototype;
        p.destroy = function () {
            if (this._active) {
                this._active = false;
                this._skinResName = null;
                App.EventDispatcher.removeEventListener(EventName.STAGE_RESIZE, this.reSize, this);
                ToolMod.clearDisplayContainer(this);
            }
        };
        p.onClose = function () {
        };
        p.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (BaseEuiView.FULL_ZOOM) {
                this.lockViewWithinWindow();
                App.EventDispatcher.addEventListener(EventName.STAGE_RESIZE, this.reSize, this);
            }
        };
        p.lockViewWithinWindow = function () {
            if (this.parent) {
                this._canvasWidth = App.LayoutManager.clientWidth;
                this._canvasHeight = App.LayoutManager.clientHeight;
                if (this._canvasWidth < this.width || this._canvasHeight < this.height) {
                    this._scale = Math.min(this._canvasWidth / this.width, this._canvasHeight / this.height);
                    this.scaleX = this.scaleY = this._scale;
                    this.reSize();
                }
            }
        };
        p.reSize = function () {
            this.x = (this._canvasWidth - this.width * this._scale) / 2;
            this.y = (this._canvasHeight - this.height * this._scale) / 2;
        };
        BaseEuiView.FULL_ZOOM = true; //完全缩放，使整个界面始终在可视范围内。
        return BaseEuiView;
    }(eui.Component));
    Core.BaseEuiView = BaseEuiView;
    egret.registerClass(BaseEuiView,'Core.BaseEuiView');
})(Core || (Core = {}));
//# sourceMappingURL=BaseEuiView.js.map