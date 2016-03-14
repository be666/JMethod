/**
 * auth : iMethod
 * create_at: 15/10/6.
 * desc:
 * note:
 *  1.
 */
'use strict';

(function(){
  var svc=function(){
    return {
      getId:function(){
        return 1;
      }
    }
  };

  services.push(initSvc("resource",[],svc))
})();