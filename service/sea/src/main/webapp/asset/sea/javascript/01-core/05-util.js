/**
 * auth : iMethod
 * create_at: 15/10/15.
 * desc:
 * note:
 *  1.
 */
(function ($w, $) {
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    var _parseInt = $w.parseInt;

    $w.parseInt = function (string, radix) {
        radix = radix || '10';
        return _parseInt(string, radix);
    };

    var utils = {};
    utils = {};
    /**
     * 判断是否为数字；
     * @param obj
     * @returns {boolean}
     */
    utils.isNaN = function (obj) {
        return isNaN(obj);
    };
    /**
     * 判断是否 为
     * @param obj
     * @returns {boolean}
     */
    utils.isUndef = function (obj) {
        return typeof obj == "undefined";
    };
    /**
     * 判断是否 为 null
     * @param obj
     * @returns {boolean}
     */
    utils.isNull = function (obj) {
        return obj == null;
    };

    /**
     * 判断是否 为 null
     * @param obj
     * @returns {boolean}
     */
    utils.isFunc = function (obj) {
        return typeof obj == "function";
    };

    /**
     * 判断是否 为 null
     * @param obj
     * @returns {boolean}
     */
    utils.nothing = function (obj) {
        return utils.isUndef(obj) || utils.isNull(obj);
    };

    /**
     * 字符串trim
     * @param text
     * @returns {*}
     */
    utils.trim = function (text) {
        if (utils.isStr(text)) {
            return $.trim(text);
        }
        return "";
    };
    /**
     * 判断是否 为 string
     * @param obj
     * @returns {boolean}
     */
    utils.isStr = function (obj) {
        return typeof obj == "string";
    };

    /**
     * 字符串 长度
     * @param obj
     * @returns {*}
     */
    utils.strLen = function (obj) {
        if (typeof obj == "string") {
            return obj.length;
        }
        return 0;
    };
    /**
     * 是否为空字符
     * @param obj
     * @returns {boolean}
     */
    utils.isEmptyStr = function (obj) {
        if (utils.isUndef(obj)) {
            return true;
        } else if (utils.isNull(obj)) {
            return true;
        } else if (utils.isStr(obj) && utils.trim(obj) == "") {
            return true;
        }
        return false;
    };

    /**
     * 输出json 字符串
     * @param value
     * @param replacer
     * @param space
     * @returns {*}
     */
    utils.toJsonStr = function (value, replacer, space) {
        return $w.JSON.stringify(value, replacer, space)
    };

    /**
     * 输出json 对象
     * @param jsonString
     * @param reviver
     * @returns {*}
     */
    utils.toJsonObj = function (jsonString, reviver) {
        return $w.JSON.parse(jsonString, reviver)
    };

    /**
     * 判断是否为 数组
     * @type {{}}
     */
    utils.isArr = function (obj) {
        return $w.toString.call(obj) == '[object Array]';
    };

    /**
     * 判断是否为 数组
     * @type {{}}
     */
    utils.arrLen = function (obj) {
        return utils.isArr(obj) ? obj.length : 0;
    };

    /**
     * 判断 是否 空数组
     */
    utils.isEmptyArr = function (obj) {
        if (!utils.isArr(obj)) {
            return true;
        }
        return utils.arrLen(obj) == 0;
    };

    /**
     * 判断 是否 空数组
     */
    utils.isEmptyObj = function (obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    };

    /**
     *u 循环数组
     * @param arr
     * @param callback
     */
    utils.eachArr = function (arr, callback) {
        if (utils.isArr(arr)) {
            var l = utils.arrLen(arr);
            for (var i = 0; i < l; i++) {
                if (callback(arr[i], i, arr) === false) {
                    break;
                }
            }
        }
    };

    /**
     * 循环数组 ，并返回返回值，nothing  不保存
     * @param arr
     * @param callback
     * @returns {Array}
     */
    utils.arrFind = function (arr, callback) {
        var _r = [];
        var _re;
        if (utils.isArr(arr)) {
            var l = utils.arrLen(arr);
            for (var i = 0; i < l; i++) {
                _re = callback(arr[i], i, arr);
                if (!utils.nothing(_re)) {
                    _r.push(_re);
                }
            }
        }
        return _r;
    };

    utils.toArr = function (obj) {
        return Array.prototype.slice.call(obj, 0);
    };

    utils.split = function (str, split) {
        if (!utils.isStr(str)) {
            str = "";
        }
        split = split || " ";
        return str.split(split)
    };

    utils.join = function (arr, split) {
        split = split || " ";
        if (utils.isArr(arr)) {
            return arr.join(split)
        }
        return "";
    };

    utils.splitJoin = function (str, split, join) {
        return utils.join(utils.split(str, split), join);
    };

    utils.extend = function (dist, obj) {
        obj = obj || dist;
        dist = $.extend({}, dist);
        return $.extend(dist, obj)
    };

    utils.sortStrArr = function (arr) {
        return Array.prototype.sort.apply(arr)
    };
    utils.sortNumArr = function (arr) {
        return arr.sort(function (a, b) {
            return parseInt(a) > parseInt(b)
        });
    };

    utils.inArr = function (list, el) {
        return !utils.isEmptyArr(utils.arrFind(list, function (obj, i, arr) {
            return obj == el
        }));
    };

    utils.resoleUrl = function (str) {
        str = str || "";
        return str.replace(new RegExp("//", 'g'), "/");
    };

    utils.Array2Obj = function (arr) {
        var obj = {};
        var al = arr.length;
        for (var i = 0; i < al; i++) {
            var av = arr[i];
            obj[av['name']] = av['value'];
        }
        return obj;
    };

    utils.parseDate = function (timeStamp) {
        if (utils.isEmptyStr(timeStamp)) {
            return "";
        }
        return new Date(timeStamp).Format("yyyy-MM-dd");
    };
    $w.iMethod.utils = $w.iMethod.utils || utils;
})(window, jQuery);