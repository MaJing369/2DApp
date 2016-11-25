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
        protected _scale:number;
        protected _canvasWidth:number;
        protected _canvasHeight:number;
        public constructor(skinResName: string) 
		{
    		super();
            this._skinResName = skinResName;
            this.skinName = RES.getRes(this._skinResName);
            if(this.skinName == null) throw new Error("皮肤加载失败,skinName:" + skinResName);
		}
		
        public destroy(): void
        {
            if(this._active)
            {
                this._active = false;
                this._skinResName = null;
                App.EventDispatcher.removeEventListener(EventName.STAGE_RESIZE,this.reSize,this);
                ToolMod.clearDisplayContainer(this);
            }
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
                    this.reSize();
                }
            }
        }
        
        public reSize():void
        {
            this.x = (this._canvasWidth - this.width * this._scale) / 2;
            this.y = (this._canvasHeight - this.height * this._scale) / 2;
        }
	}
}
