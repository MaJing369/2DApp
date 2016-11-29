/**
 * author chuhua
 */
module Core.Views
{
    export class Background
    {
        public static NONE: string = "none";
        public static TILED: string = "tiled";
        public static STRETCH: string = "stretch";
        
        public isInit:Boolean = false;
        private _content:egret.DisplayObjectContainer;
        private _width:number;
        private _height:number;
        private _resGroupName:string;
        private _textureName:string;
        private _displayType:string;
        private _effectType:number;
        
    	  public constructor(width:number, height:number)
    	  {
            this._content = new egret.DisplayObjectContainer();
            this._width = width;
            this._height = height;
            this._content.touchEnabled = false;
            this._content.touchChildren = false;
    	  }
    	
    	  public destroy():void
    	  {
    	      this.clear();
            this._content = null;
    	  }
    	
        public loadFromTexture(textureName: string,effectType:number,displayType: string = Background.NONE): void
    	  {
            this.isInit = false;
            this._textureName = textureName;
            this._displayType = displayType;
            this._effectType = effectType;
            this.loadTexture();
    	  }
    	  
    	  private loadTexture():void
    	  {
              this.clear();
              var bmp: egret.Bitmap;
              if(this._displayType == Background.STRETCH)
              {
                  bmp = new egret.Bitmap(RES.getRes(this._textureName));
                  bmp.width = App.LayerManager.stage.stageWidth;
                  bmp.height = App.LayerManager.stage.stageHeight;
                  bmp.fillMode = egret.BitmapFillMode.SCALE;
                  this._content.addChild(bmp);
              } else if(this._displayType == Background.TILED)
              {
                  bmp = new egret.Bitmap(RES.getRes(this._textureName));
                  bmp.width = App.LayerManager.stage.stageWidth;
                  bmp.height = App.LayerManager.stage.stageHeight;
                  bmp.fillMode = egret.BitmapFillMode.REPEAT;
                  this._content.addChild(bmp);
                  this._content.cacheAsBitmap = true;
              } else
              {
                  bmp = new egret.Bitmap(RES.getRes(this._textureName));
                  bmp.width = App.LayerManager.stage.stageWidth;
                  bmp.height = App.LayerManager.stage.stageHeight;
                  this._content.addChild(bmp);
              }
              App.ShowViewEffect.showEffect(this._content,this._effectType,this.viewEffectStop,this);
    	  }
    	  
    	  private viewEffectStop():void
    	  {
        	  this.isInit = true;
        	  App.EventDispatcher.dispatchEvent(new egret.Event(EventName.SWITCHSCENE));
    	  }
    	
    	  public clear():void
    	  {
            this._content.cacheAsBitmap = false;
            var bmp: egret.Bitmap;
            for(var i: number = this._content.numChildren - 1; i >= 0 ; i--)
            {
                bmp = this._content.removeChildAt(i) as egret.Bitmap;
                if (bmp)
                {
                    bmp.texture = null;
                }
            }
    	  }
    
        public get content():egret.DisplayObject
        {
            return this._content;
        }
    
        public get width(): number {
            return this._width;
        }
    
        public get height(): number {
            return this._height;
        }
    }
}
