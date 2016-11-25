/**
 * 基础场景类
 * author chuhua
 */
module Core
{
    export class BaseEuiScene extends eui.Component
    {
        protected _active: Boolean = false;
        protected _skinResName: string;

        public constructor(skinResName: string)
        {
            super();
            this._active = true;
            this._skinResName = skinResName;
            this.skinName = RES.getRes(this._skinResName);
            if(this.skinName == null) throw new Error("皮肤加载失败,skinName:" + skinResName);
        }

        public destroy(): void
        {
            if(this._active)
            {
                this.skinName = null;
                this._skinResName = null;
                this._active = false;
                ToolMod.clearDisplayContainer(this,true,true,true);
            }
        }

        public get skinResName(): string
        {
            return this._skinResName;
        }
    }
}
