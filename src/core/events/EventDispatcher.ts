module Core {
/**
 *
 * @author 
 *
 */
    export class EventDispatcher extends Core.BaseSingleton{
        private _eventDispatcher:egret.EventDispatcher
	    public constructor() 
	    {
    	      super();
    	      this._eventDispatcher = new egret.EventDispatcher();
	    }
	
        public addEventListener(type: string,listener: Function,thisObject: any,useCapture: boolean = false,priority: number = 0):void
        {
            this._eventDispatcher.addEventListener(type,listener,thisObject,useCapture,priority)
        }
    
        public removeEventListener(type: string,listener: Function,thisObject: any):void
        {
            this._eventDispatcher.removeEventListener(type,listener,thisObject);
        }
    
        public dispatchEvent(event:egret.Event):boolean
        {
            return this._eventDispatcher.dispatchEvent(event);
        }
    
        public hasEventListener(type: string):boolean
        {
            return this._eventDispatcher.hasEventListener(type);
        }
    }
}
