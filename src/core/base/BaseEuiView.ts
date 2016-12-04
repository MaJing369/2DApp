module Core {
	/**
	 *
	 * @author 
	 *
	 */
	export class BaseEuiView extends eui.Component
	{
        private static FULL_ZOOM: Boolean = true;//完全缩放，使整个界面始终在可视范围内。
        
        private _skinResName:string;
        protected _active: Boolean = false;
        protected _scale:number = 1;
        protected _canvasWidth:number;
        protected _canvasHeight:number;
        private _isModal:Boolean;
        private _bgMask:Views.BgMask;
        public constructor(skinResName: string,isModal: Boolean = false) 
		{
    		super();
            this._active = true;
            this._skinResName = skinResName;
            this._isModal = isModal;
            this.skinName = RES.getRes(this._skinResName);
            this._bgMask = null;
            if(this.skinName == null) throw new Error("皮肤加载失败,skinName:" + skinResName);
		}
		
        public destroy(): void
        {
            if(this._active)
            {
                this._active = false;
                this._skinResName = null;
                this.hideBgMask();
                App.EventDispatcher.removeEventListener(EventName.STAGE_RESIZE,this.reSize,this);
                ToolMod.clearDisplayContainer(this);
            }
        }
        
        public init():void
        {
            
        }
        
        public onClose():void
        {
        }
        
        
        
        protected childrenCreated(): void
        {
            super.childrenCreated();
            if(BaseEuiView.FULL_ZOOM)
            {
                this.lockViewWithinWindow();
                App.EventDispatcher.addEventListener(EventName.STAGE_RESIZE,this.reSize,this);
            }
            
            if(this._isModal && this.parent)
            {
                this.showBgMask();
            }
            
            this.init();
        }
        
        protected onBtnCloseTap(e: egret.TouchEvent): void
        {
            App.UIViewManager.close(this);
        }
        
        protected showBgMask(): void 
        {
            if(this._bgMask == null) 
            {
                this._bgMask = new Views.BgMask(this.parent,true);
                this._bgMask.show(this.parent.getChildIndex(this));
            }
        }

        protected hideBgMask(): void 
        {
            if(this._bgMask) 
            {
                this._bgMask.destroy();
                this._bgMask = null;
            }
        }
        
        private lockViewWithinWindow(): void
        {
            if(this.parent)
            {
                this._canvasWidth = App.LayoutManager.clientWidth;
                this._canvasHeight = App.LayoutManager.clientHeight;
                if(this._canvasWidth < this.width || this._canvasHeight < this.height)
                {
                    this._scale = Math.min(this._canvasWidth / this.width,this._canvasHeight / this.height);
                    this.scaleX = this.scaleY = this._scale;
                }
                this.reSize();
            }
        }
        
        public reSize():void
        {
            this.x = (this._canvasWidth - this.width * this._scale) / 2;
            this.y = (this._canvasHeight - this.height * this._scale) / 2;
        }
	}
}
