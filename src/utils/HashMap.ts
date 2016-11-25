/**
 * author chuhua
 * 哈希表
 */
     class HashMap
    {
        private _keyList: any[];
        private _valueList: any[];
        
        constructor()
        {
            this._keyList = [];
            this._valueList = [];
        }
    
        public clear(): void
        {
            if(this._keyList.length > 0)
                this._keyList.splice(0,this._keyList.length);
            if(this._valueList.length > 0)
                this._valueList.splice(0,this._valueList.length);
        }
    
        public getValue(key: any): any
        {
            var index: number = this._keyList.indexOf(key);
            if(index >= 0)
            {
                return this._valueList[index];
            }
            return null;
        }
    
        public getFirstKey(value: any): any
        {
            var index: number = this._valueList.indexOf(value);
            if(index >= 0)
            {
                return this._keyList[index];
            }
            return null;
        }
        
        public has(key:any):boolean
        {
            var index:number = this._keyList.indexOf(key);
            if(index >= 0)
            {
                return true;
            }
            return false;
        }
        
        public add(key: any,value: any): void
        {
            if(key != null)
            {
                this.remove(key);
                this._keyList.push(key);
                this._valueList.push(value);
            }
        }
    
        public remove(key: any): any
        {
            var index: number = this._keyList.indexOf(key);
            if(index >= 0)
            {
                this._keyList.splice(index,1);
                var value:any = this._valueList.splice(index,1)[0];
                return value;
            }
            return null;
        }
        
        public get length():number
        {
            return this._keyList.length;
        }
    
        public get keyList(): any[]
        {
            return this._keyList;
        }
        
        public get valueList(): any[]
        {
            return this._valueList;
        }
    }
