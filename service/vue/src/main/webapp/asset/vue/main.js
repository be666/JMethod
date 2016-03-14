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
  vue.prototype.$tools = require('./tools');
  vue.prototype.$auth = require('./auth');
});


//layout
Vue.use(VueRouter);
Vue.use(VueResource);
//component

Vue.component('i_file', require("./components/file.vue"));
Vue.component('i_nav', require("./components/nav.vue"));
Vue.component('i_pagination', require("./components/pagination.vue"));
Vue.component('i_search', require("./components/search.vue"));
Vue.component('i_search_multi', require("./components/select-multi.vue"));
Vue.component('i_search_single', require("./components/select-single.vue"));
Vue.component('i_table', require("./components/table.vue"));
Vue.component('i_radio', require("./components/radio.vue"));

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
    component: require("./layouts/root.vue"),
    subRoutes: {
      "/": {
        name: "app",
        component: require("./layouts/app.vue"),
        subRoutes: {
          "user": {
            name: "user",
            component: require("./app/user.vue")
          },
          "token": {
            name: "token",
            component: require("./app/token.vue")
          },
          "center": {
            name: "center",
            component: require("./app/center.vue")
          }
        }
      },
      "login": {
        name: "login",
        component: require("./sys/login.vue")
      },
      "sign": {
        name: "sign",
        component: require("./sys/sign.vue")
      }
    },
    "*": {
      "name": "40x",
      component: require("./sys/40x.vue")
    }
  }
});

router.redirect({
  "/": "/center"
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
      transition.redirect("/login")
    });
  }
});

router.start(App, 'body');
