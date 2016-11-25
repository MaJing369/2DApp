module Core
{
    export class BaseSingleton
    {
        public constructor()
        {
        }
        /**
         * 获取一个单例
         */
        public static getInstance(): any
        {
            var Class: any = this;
            if(Class._instance == null)
            {
                Class._instance = new Class();
            }
            return Class._instance;
        }
    }
}