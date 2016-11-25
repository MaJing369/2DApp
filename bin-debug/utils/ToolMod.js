var ToolMod = (function () {
    function ToolMod() {
    }
    var d = __define,c=ToolMod,p=c.prototype;
    /**
         * 将显示对象从父容器中移除
         * @param dis                   需要移除的显示对象
         * @param resetDisplayObject    是否将一些参数初始化
         */
    ToolMod.removeFromParent = function (dis, resetDisplayObject) {
        if (resetDisplayObject === void 0) { resetDisplayObject = false; }
        if (dis && dis.parent) {
            if (dis.parent) {
                dis.parent.removeChild(dis);
            }
            if (resetDisplayObject) {
                dis.scaleX = dis.scaleY = dis.rotation = dis.skewY = dis.skewY = 0;
                dis.alpha = 1;
            }
        }
    };
    /**
         * 清除显示容器内部的对象
         * @param dc                显示容器
         * @param autoDestroy       移除子显示对象时是否同时销毁该子显示对象（自动调用其destroy方法）
         * @param clearContent      移除子显示对象时是否同时清除其加载的资源
         * @param clearChild        移除子显示对象时是否清除其内部的子显示对象（逐层清除）
         */
    ToolMod.clearDisplayContainer = function (dc, autoDestroy, clearContent, clearChild) {
        if (autoDestroy === void 0) { autoDestroy = false; }
        if (clearContent === void 0) { clearContent = false; }
        if (clearChild === void 0) { clearChild = false; }
        var dis;
        for (var i = dc.numChildren - 1; i >= 0; i--) {
            dis = dc.removeChildAt(i);
            if (autoDestroy && dis["destroy"])
                dis["destroy"]();
            if (clearContent) {
                if (dis["texture"])
                    dis["texture"] = null;
                if (dis["source"])
                    dis["source"] = null;
                if (dis["text"])
                    dis["text"] = null;
            }
            if (clearChild && dis["numChildren"])
                this.clearDisplayContainer(dis, clearContent, clearChild);
        }
    };
    return ToolMod;
}());
egret.registerClass(ToolMod,'ToolMod');
//# sourceMappingURL=ToolMod.js.map