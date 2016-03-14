/**
 * auth : iMethod
 * create_at: 15/10/14.
 * desc:
 * note:
 *  1.
 */
define('service/mvc_service', function (require, exports, module) {
    exports.query = function (callback) {
        iMethod._.ajax({
            url: "/mvc/demo",
            type: "post",
            success: function (res) {
                console.log(res);
                callback && callback(res)
            }
        })
    }
    iMethod.service.mvc_service = module.exports
});