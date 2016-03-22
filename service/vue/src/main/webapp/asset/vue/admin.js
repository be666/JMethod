/**
 * Created by bqxu on 15/12/10.
 */
let Vue = require('vue');
let VueRouter = require('vue-router');
let VueResource = require('vue-resource');
let {inArray,config:{auth={}}} = require('./tools');
let {valid} = require('./auth');

Vue.config.debug = true;

Vue.use(function (vue) {
  vue.prototype.$config = {
    module: 'admin'
  };
  vue.prototype.$tools = require('./tools');
  vue.prototype.$auth = require('./auth');
  vue.prototype.$dialog = require('./plugin/dialog.js');
});


//layout
Vue.use(VueRouter);
Vue.use(VueResource);
//component

Vue.component('i_file', require("./component/file.vue"));
Vue.component('i_nav', require("./component/nav.vue"));
Vue.component('i_pagination', require("./component/pagination.vue"));
Vue.component('i_search', require("./component/search.vue"));
Vue.component('i_search_multi', require("./component/select-multi.vue"));
Vue.component('i_search_single', require("./component/select-single.vue"));
Vue.component('i_table', require("./component/table.vue"));
Vue.component('i_radio', require("./component/radio.vue"));
//directive


//filter

Vue.filter('equal', function (v1, v2) {
  return v1 == v2;
});

Vue.filter('gt0', function (arr) {
  let a = arr || 0;
  return a > 0;
});

//main
let App = Vue.extend({
  events: {
    link: function (pathName, params) {
      router.go({
        name: pathName,
        params: params || {}
      })
    }
  }
});

let router = new VueRouter();
router.map({
  '/': {
    name: "root",
    component: require("./layout/root.vue"),
    admin: true,
    subRoutes: {
      "/": {
        component: require("./layout/app.vue"),
        subRoutes: {
          "home": {
            name: "home",
            component: require("./admin/index.vue")
          },
          "user": {
            name: "user",
            component: require("./admin/user.vue")
          },
          "user/insert": {
            name: "user-add",
            component: require("./admin/user-insert.vue")
          },
          "app": {
            name: "app",
            component: require("./admin/app.vue")
          },
          "app/insert": {
            name: "app-add",
            component: require("./admin/app-insert.vue")
          },
          "app/:appId/user": {
            name: "app-user",
            component: require("./admin/app-user.vue")
          },
          "app/:appId/group": {
            name: "app-group",
            component: require("./admin/app-group.vue")
          },
          "app/:appId/group/insert": {
            name: "app-group-add",
            component: require("./admin/app-group-insert.vue")
          },
          "app/:appId/group/:groupId/user": {
            name: "app-group-user",
            component: require("./admin/app-group-user.vue")
          },
        }
      }
    },
    "*": {
      "name": "40x",
      component: require("./sys/40x.vue")
    }
  }
});

router.redirect({
  "/": "/home"
});

router.beforeEach(function (transition) {
  if (auth.ignoreAll) {
    transition.next()
  } else if (inArray(auth.ignore, transition.to.path)) {
    transition.next()
  } else {
    valid(transition.to.router.app, function () {
      transition.next();
    }, function () {
      window.location.href = "/";
    });
  }
});

router.start(App, 'body');



