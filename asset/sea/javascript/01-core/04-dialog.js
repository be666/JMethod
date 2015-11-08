/**
 * auth : iMethod
 * create_at: 15/10/13.
 * desc:
 * note:
 *  1.
 */
(function ($w) {
  $w.gxb._.dialog = {
    ext: {
      alert: null,
      confirm: null,
      warn: null,
      error: null,
      dialog: null
    },
    history: [],
    alert: function (msg, callback) {
      $w.gxb._.dialog.history.push(msg);
      if ($w.gxb._.dialog.ext.alert) {
        return $w.gxb._.dialog.ext.alert(msg, callback);
      } else {
        $w.alert(msg);
        callback && callback();
        return {};
      }
    },
    confirm: function (msg, callback) {
      $w.gxb._.dialog.history.push(msg);
      if ($w.gxb._.dialog.ext.confirm) {
        return $w.gxb._.dialog.ext.confirm(msg, callback);
      } else {
        var flag = $w.confirm(msg);
        if (flag) {
          callback && callback(!0);
        } else {
          callback && callback(!!0);
        }
        return {};
      }
    },
    warn: function (msg, callback) {
      $w.gxb._.dialog.history.push(msg);
      if ($w.gxb._.dialog.ext.warn) {
        return $w.gxb._.dialog.ext.warn(msg, callback);
      } else {
        $w.alert(msg);
        callback && callback();
        return {};
      }
    },
    error: function (msg, callback) {
      $w.gxb._.dialog.history.push(msg);
      if ($w.gxb._.dialog.ext.error) {
        return $w.gxb._.dialog.ext.error(msg, callback);
      } else {
        $w.alert(msg);
        callback && callback();
        return {};
      }
    },
    prompt: function (msg, callback) {
      $w.gxb._.dialog.history.push(msg);
      if ($w.gxb._.dialog.ext.prompt) {
        return $w.gxb._.dialog.ext.prompt(msg, callback);
      } else {
        var msg = $w.prompt(msg);
        callback && callback(msg);
        return {};
      }
    },
    dialog: function (text, opts) {
      $w.gxb._.dialog.history.push(text);
      if ($w.gxb._.dialog.ext.dialog) {
        return $w.gxb._.dialog.ext.dialog(text, opts);
      } else {
        $w.alert(text);
        return {};
      }
    }
  };
  $w.gxb.alert = $w.gxb._.dialog.alert;
  $w.gxb.confirm = $w.gxb._.dialog.confirm;
  $w.gxb.success = $w.gxb._.dialog.alert;
  $w.gxb.error = $w.gxb._.dialog.error;
  $w.gxb.warn = $w.gxb._.dialog.warn;
  $w.gxb.dialog = $w.gxb._.dialog.dialog;
  $w.gxb.prompt = $w.gxb._.dialog.prompt;
})(window);