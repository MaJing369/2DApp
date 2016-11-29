/**
 * author chuhua
 */
module Core
{
    export class EuiViewData
    {
        private static idSeed:number = 0;
        
        private _euiComponentClass: any;
        private _view: BaseEuiView;
        private _resGroupName: string;
        private _id:number;
        
        public constructor(euiComponentClass: any,resGroupName: string)
        {
            this._euiComponentClass = euiComponentClass;
            this._resGroupName = resGroupName;
            
            Core.EuiViewData.idSeed++;
            this._id = Core.EuiViewData.idSeed;
    	  }
    	
    	  public destroy():void
    	  {
    	      this._euiComponentClass = null;
    	      this._view = null;
    	      this._resGroupName = "";
    	  }
    	  
    	  public setView(view:BaseEuiView):void
    	  {
    	      this._view = view;
    	  }

        public get euiComponentClass(): any
        {
            return this._euiComponentClass;
        }

        public get view(): BaseEuiView
        {
            return this._view;
        }

        public get resGroupName(): string
        {
            return this._resGroupName;
        }

        public get ID():number
        {
            return this._id;
        }
    }
}
