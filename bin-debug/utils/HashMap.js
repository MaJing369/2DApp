/**
 * author chuhua
 * 哈希表
 */
var HashMap = (function () {
    function HashMap() {
        this._keyList = [];
        this._valueList = [];
    }
    var d = __define,c=HashMap,p=c.prototype;
    p.clear = function () {
        if (this._keyList.length > 0)
            this._keyList.splice(0, this._keyList.length);
        if (this._valueList.length > 0)
            this._valueList.splice(0, this._valueList.length);
    };
    p.getValue = function (key) {
        var index = this._keyList.indexOf(key);
        if (index >= 0) {
            return this._valueList[index];
        }
        return null;
    };
    p.getFirstKey = function (value) {
        var index = this._valueList.indexOf(value);
        if (index >= 0) {
            return this._keyList[index];
        }
        return null;
    };
    p.has = function (key) {
        var index = this._keyList.indexOf(key);
        if (index >= 0) {
            return true;
        }
        return false;
    };
    p.add = function (key, value) {
        if (key != null) {
            this.remove(key);
            this._keyList.push(key);
            this._valueList.push(value);
        }
    };
    p.remove = function (key) {
        var index = this._keyList.indexOf(key);
        if (index >= 0) {
            this._keyList.splice(index, 1);
            var value = this._valueList.splice(index, 1)[0];
            return value;
        }
        return null;
    };
    d(p, "length"
        ,function () {
            return this._keyList.length;
        }
    );
    d(p, "keyList"
        ,function () {
            return this._keyList;
        }
    );
    d(p, "valueList"
        ,function () {
            return this._valueList;
        }
    );
    return HashMap;
}());
egret.registerClass(HashMap,'HashMap');
//# sourceMappingURL=HashMap.js.map