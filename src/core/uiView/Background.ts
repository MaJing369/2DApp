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
        
        private _content:egret.DisplayObjectContainer;
        private _width:number;
        private _height:number;
        private _resGroupName:string;
        private _textureName:string;
        private _displayType:string;
        private _effectType:number;
        
    	  public constructor(width:number, height:number)
    	  {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResLoadComplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResLoadError,this);
            RES.loadGroup("bg");
            this._content = new egret.DisplayObjectContainer();
            this._width = width;
            this._height = height;
            this._content.touchEnabled = false;
            this._content.touchChildren = false;
    	  }
    	
    	  public destroy():void
    	  {
            this.removeResLoadEvents();
    	      this.clear();
            this._content = null;
    	  }
    	
        public loadFromTexture(textureName: string,effectType:number,displayType: string = Background.NONE): void
    	  {
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
                  bmp.width = AppManager.LayerManager.stage.stageWidth;
                  bmp.height = AppManager.LayerManager.stage.stageHeight;
                  bmp.fillMode = egret.BitmapFillMode.SCALE;
                  this._content.addChild(bmp);
              } else if(this._displayType == Background.TILED)
              {
                  bmp = new egret.Bitmap(RES.getRes(this._textureName));
                  bmp.width = AppManager.LayerManager.stage.stageWidth;
                  bmp.height = AppManager.LayerManager.stage.stageHeight;
                  bmp.fillMode = egret.BitmapFillMode.REPEAT;
                  this._content.addChild(bmp);
                  this._content.cacheAsBitmap = true;
              } else
              {
                  bmp = new egret.Bitmap(RES.getRes(this._textureName));
                  bmp.width = AppManager.LayerManager.stage.stageWidth;
                  bmp.height = AppManager.LayerManager.stage.stageHeight;
                  this._content.addChild(bmp);
              }
              this["showSceneEffect_" + this._effectType]();
    	  }
    	  
          private showSceneEffect_1(): void 
          {
              this._content.alpha = 0;
              this._content.scaleX = 0.5;
              this._content.scaleY = 0.5;
              this._content.x = AppManager.LayerManager.stage.stageWidth / 4;
              this._content.y = AppManager.LayerManager.stage.stageHeight / 4;
              egret.Tween.get(this._content)
                  .to({ alpha: 1,scaleX: 1,scaleY: 1,x: 0,y: 0 },800,egret.Ease.backOut)
                  .call(this.onAddSceneBreak,this);
          }

          private showSceneEffect_2(): void 
          {
              this._content.alpha = 0;
              this._content.scaleX = 0.2;
              this._content.scaleY = 0.2;
              this._content.x = AppManager.LayerManager.stage.stageWidth / 4;
              this._content.y = AppManager.LayerManager.stage.stageHeight / 4;
              egret.Tween.get(this._content)
                  .to({ alpha: 1,scaleX: 1,scaleY: 1,x: 0,y: 0 },800,egret.Ease.elasticOut)
                  .call(this.onAddSceneBreak,this);
          }

          private showSceneEffect_3(): void {
              this._content.x = -AppManager.LayerManager.stage.stageWidth;
              egret.Tween.get(this._content).to({ x: 0 },600,egret.Ease.cubicOut).call(this.onAddSceneBreak,this);
          }

          private showSceneEffect_4(): void 
          {
              this._content.x = AppManager.LayerManager.stage.stageWidth;
              egret.Tween.get(this._content).to({ x: 0 },600,egret.Ease.cubicOut).call(this.onAddSceneBreak,this);
          }

          private showSceneEffect_5(): void {
              this._content.y = -AppManager.LayerManager.stage.stageHeight;
              egret.Tween.get(this._content).to({ y: 0 },600,egret.Ease.bounceOut).call(this.onAddSceneBreak,this);
          }

          private showSceneEffect_6(): void 
          {
              this._content.y = AppManager.LayerManager.stage.stageHeight;

              egret.Tween.get(this._content).to({ y: 0 },600,egret.Ease.cubicOut).call(this.onAddSceneBreak,this);
          }

          private onAddSceneBreak(): void 
          {
              egret.Tween.removeTweens(this._content);
              AppManager.EventDispatcher.dispatchEvent(new egret.Event(EventName.SWITCHSCENE));
          }

        private onResLoadComplete(e: RES.ResourceEvent): void
        {
            if(e.groupName == this._resGroupName)
            {
                this.removeResLoadEvents();
                this.loadTexture();
            }
        }

        private onResLoadError(e: RES.ResourceEvent): void
        {
            if(e.groupName == this._resGroupName)
            {
                this.removeResLoadEvents();
            }
        }
        
        private removeResLoadEvents():void
        {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResLoadError,this);
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
