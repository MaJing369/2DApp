module Core
{
    export class LayerManager extends Core.BaseSingleton
    {
        public stage: egret.Stage;
        public container: eui.UILayer;
        public bg: Core.Views.Background;
        public sceneLayer: egret.DisplayObjectContainer;
        public uiLayer: egret.DisplayObjectContainer;

        public init(stage: egret.Stage): void
        {
            this.stage = stage;

            this.container = new eui.UILayer();
            this.setTouchEnabled(this.container,false,true);
            
            this.bg = new Core.Views.Background(stage.stageWidth,stage.stageHeight);

            this.sceneLayer = new egret.DisplayObjectContainer();
            this.setTouchEnabled(this.sceneLayer,false,true);

            this.uiLayer = new egret.DisplayObjectContainer();
            this.setTouchEnabled(this.uiLayer,false,true);

            this.stage.addChild(this.container);
            this.container.addChild(this.bg.content);
            this.container.addChild(this.sceneLayer);
            this.container.addChild(this.uiLayer);
        }

        public setTouchEnabled(dc: egret.DisplayObjectContainer,touchEnabled: boolean,touchChildren: boolean): void
        {
            dc.touchEnabled = touchEnabled;
            dc.touchChildren = touchChildren;
        }
    }
}
