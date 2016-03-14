/**
 * auth : iMethod
 * create_at: 15/10/13.
 * desc:
 * note:
 *  1.
 */
(function ($w) {

    $w.iMethod.console = {
        history: [],
        _: null,
        _log: function () {
            var args = arguments;
            $w.iMethod.console.history.push(args);
            if (console) {
                if (args.length == 1) {
                    console.log(args[0]);
                } else {
                    console.log(Array.prototype.slice.call(args, 0));
                }
            }
        },
        log: function () {
            $w.iMethod.console._log.apply(null, Array.prototype.slice.call(arguments, 0))
        },
        info: function () {
            $w.iMethod.console._log.apply(null, Array.prototype.slice.call(arguments, 0))
        },
        debug: function () {
            $w.iMethod.console._log.apply(null, Array.prototype.slice.call(arguments, 0))
        }
        ,
        error: function () {
            $w.console && $w.console.error && $w.console.error(Array.prototype.slice.call(arguments, 0))
        }
    };

    $w.console = $w.console || {
            log: iMethod.console.log,
            error: iMethod.console.error,
            info: iMethod.console.info,
            debug: iMethod.console.debug
        }
})(window);