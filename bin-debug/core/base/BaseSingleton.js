var Core;
(function (Core) {
    var BaseSingleton = (function () {
        function BaseSingleton() {
        }
        var d = __define,c=BaseSingleton,p=c.prototype;
        /**
         * 获取一个单例
         */
        BaseSingleton.getInstance = function () {
            var Class = this;
            if (Class._instance == null) {
                Class._instance = new Class();
            }
            return Class._instance;
        };
        return BaseSingleton;
    }());
    Core.BaseSingleton = BaseSingleton;
    egret.registerClass(BaseSingleton,'Core.BaseSingleton');
})(Core || (Core = {}));
//# sourceMappingURL=BaseSingleton.js.map