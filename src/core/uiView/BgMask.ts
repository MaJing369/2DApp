module Core.Views
/**
 * author chuhua
 */
{
    export class BgMask
    {
        private _bgMaskShape: egret.Shape;
        private _dc:egret.DisplayObjectContainer;
        private _showing:Boolean;
        private _alpha:number;
        
    	  public constructor(dc:egret.DisplayObjectContainer, stopTouchEvent:boolean = true, alpha = 0.6)
    	  {
            this._dc = dc;
            this._alpha = alpha;
            this._bgMaskShape = new egret.Shape();
            this._bgMaskShape.touchEnabled = stopTouchEvent;
            this._showing = false;
    	  }
        	
    	  public destroy():void
    	  {
            if(this._bgMaskShape)
            {
                this.hide();
                this._bgMaskShape = null;
            }
            this._dc = null;
            this._showing = false;
    	  }
    	  
    	  public show(childIndex:number = -1, delay:number = 0):void
    	  {
            this._showing = true;
            if(delay == 0)
            {
                this.drawGraphics(childIndex);
            } else {
                ToolMod.delayApply(delay,this,() => {
                    this.drawGraphics(childIndex);
                });
            }
    	  }
    	  
        private drawGraphics(childIndex: number):void
        {
            if(this._showing && this._bgMaskShape)
            {
                this._bgMaskShape.graphics.clear();
                this._bgMaskShape.graphics.beginFill(0x000000,this._alpha);
                this._bgMaskShape.graphics.drawRect(-this._dc.x,-this._dc.y,App.LayerManager.stage.stageWidth,App.LayerManager.stage.stageHeight);
                this._bgMaskShape.graphics.endFill();
                if(childIndex >= 0) {
                    this._dc.addChildAt(this._bgMaskShape,childIndex);
                } else {
                    this._dc.addChild(this._bgMaskShape);
                }
            }
        }
    	  
    	  public hide():void
    	  {
            this._showing = false;
            this._bgMaskShape.graphics.clear();
            ToolMod.removeFromParent(this._bgMaskShape);
    	  }
    	  
    	  public get showing():Boolean
    	  {
    	      return this._showing;
    	  }
    }
}
