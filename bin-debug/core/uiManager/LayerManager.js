var Core;
(function (Core) {
    var LayerManager = (function (_super) {
        __extends(LayerManager, _super);
        function LayerManager() {
            _super.apply(this, arguments);
        }
        var d = __define,c=LayerManager,p=c.prototype;
        p.init = function (stage) {
            this.stage = stage;
            this.container = new eui.UILayer();
            this.setTouchEnabled(this.container, false, true);
            this.bg = new Core.Views.Background(stage.stageWidth, stage.stageHeight);
            this.sceneLayer = new egret.DisplayObjectContainer();
            this.setTouchEnabled(this.sceneLayer, false, true);
            this.uiLayer = new egret.DisplayObjectContainer();
            this.setTouchEnabled(this.uiLayer, false, true);
            this.stage.addChild(this.container);
            this.container.addChild(this.bg.content);
            this.container.addChild(this.sceneLayer);
            this.container.addChild(this.uiLayer);
        };
        p.setTouchEnabled = function (dc, touchEnabled, touchChildren) {
            dc.touchEnabled = touchEnabled;
            dc.touchChildren = touchChildren;
        };
        return LayerManager;
    }(Core.BaseSingleton));
    Core.LayerManager = LayerManager;
    egret.registerClass(LayerManager,'Core.LayerManager');
})(Core || (Core = {}));
//# sourceMappingURL=LayerManager.js.map