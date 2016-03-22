webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by bqxu on 15/12/10.
	 */
	var Vue = __webpack_require__(1);
	var VueRouter = __webpack_require__(3);
	var VueResource = __webpack_require__(4);

	var _require = __webpack_require__(12);

	var inArray = _require.inArray;
	var _require$config$auth = _require.config.auth;
	var auth = _require$config$auth === undefined ? {} : _require$config$auth;

	var _require2 = __webpack_require__(14);

	var valid = _require2.valid;


	Vue.config.debug = true;

	Vue.use(function (vue) {
	  vue.prototype.$config = {
	    module: 'admin'
	  };
	  vue.prototype.$tools = __webpack_require__(12);
	  vue.prototype.$auth = __webpack_require__(14);
	  vue.prototype.$dialog = __webpack_require__(15);
	});

	//layout
	Vue.use(VueRouter);
	Vue.use(VueResource);
	//component

	Vue.component('i_file', __webpack_require__(62));
	Vue.component('i_nav', __webpack_require__(66));
	Vue.component('i_pagination', __webpack_require__(70));
	Vue.component('i_search', __webpack_require__(74));
	Vue.component('i_search_multi', __webpack_require__(78));
	Vue.component('i_search_single', __webpack_require__(82));
	Vue.component('i_table', __webpack_require__(85));
	Vue.component('i_radio', __webpack_require__(88));
	//directive

	//filter

	Vue.filter('equal', function (v1, v2) {
	  return v1 == v2;
	});

	Vue.filter('gt0', function (arr) {
	  var a = arr || 0;
	  return a > 0;
	});

	//main
	var App = Vue.extend({
	  events: {
	    link: function link(pathName, params) {
	      router.go({
	        name: pathName,
	        params: params || {}
	      });
	    }
	  }
	});

	var router = new VueRouter();
	router.map({
	  '/': {
	    name: "root",
	    component: __webpack_require__(91),
	    admin: true,
	    subRoutes: {
	      "/": {
	        component: __webpack_require__(101),
	        subRoutes: {
	          "home": {
	            name: "home",
	            component: __webpack_require__(105)
	          },
	          "user": {
	            name: "user",
	            component: __webpack_require__(109)
	          },
	          "user/insert": {
	            name: "user-add",
	            component: __webpack_require__(113)
	          },
	          "app": {
	            name: "app",
	            component: __webpack_require__(117)
	          },
	          "app/insert": {
	            name: "app-add",
	            component: __webpack_require__(123)
	          },
	          "app/:appId/user": {
	            name: "app-user",
	            component: __webpack_require__(127)
	          },
	          "app/:appId/group": {
	            name: "app-group",
	            component: __webpack_require__(134)
	          },
	          "app/:appId/group/insert": {
	            name: "app-group-add",
	            component: __webpack_require__(138)
	          },
	          "app/:appId/group/:groupId/user": {
	            name: "app-group-user",
	            component: __webpack_require__(142)
	          }
	        }
	      }
	    },
	    "*": {
	      "name": "40x",
	      component: __webpack_require__(148)
	    }
	  }
	});

	router.redirect({
	  "/": "/home"
	});

	router.beforeEach(function (transition) {
	  if (auth.ignoreAll) {
	    transition.next();
	  } else if (inArray(auth.ignore, transition.to.path)) {
	    transition.next();
	  } else {
	    valid(transition.to.router.app, function () {
	      transition.next();
	    }, function () {
	      window.location.href = "/";
	    });
	  }
	});

	router.start(App, 'body');

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-router v0.7.11
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.VueRouter = factory();
	}(this, function () { 'use strict';

	  var babelHelpers = {};

	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };
	  function Target(path, matcher, delegate) {
	    this.path = path;
	    this.matcher = matcher;
	    this.delegate = delegate;
	  }

	  Target.prototype = {
	    to: function to(target, callback) {
	      var delegate = this.delegate;

	      if (delegate && delegate.willAddRoute) {
	        target = delegate.willAddRoute(this.matcher.target, target);
	      }

	      this.matcher.add(this.path, target);

	      if (callback) {
	        if (callback.length === 0) {
	          throw new Error("You must have an argument in the function passed to `to`");
	        }
	        this.matcher.addChild(this.path, target, callback, this.delegate);
	      }
	      return this;
	    }
	  };

	  function Matcher(target) {
	    this.routes = {};
	    this.children = {};
	    this.target = target;
	  }

	  Matcher.prototype = {
	    add: function add(path, handler) {
	      this.routes[path] = handler;
	    },

	    addChild: function addChild(path, target, callback, delegate) {
	      var matcher = new Matcher(target);
	      this.children[path] = matcher;

	      var match = generateMatch(path, matcher, delegate);

	      if (delegate && delegate.contextEntered) {
	        delegate.contextEntered(target, match);
	      }

	      callback(match);
	    }
	  };

	  function generateMatch(startingPath, matcher, delegate) {
	    return function (path, nestedCallback) {
	      var fullPath = startingPath + path;

	      if (nestedCallback) {
	        nestedCallback(generateMatch(fullPath, matcher, delegate));
	      } else {
	        return new Target(startingPath + path, matcher, delegate);
	      }
	    };
	  }

	  function addRoute(routeArray, path, handler) {
	    var len = 0;
	    for (var i = 0, l = routeArray.length; i < l; i++) {
	      len += routeArray[i].path.length;
	    }

	    path = path.substr(len);
	    var route = { path: path, handler: handler };
	    routeArray.push(route);
	  }

	  function eachRoute(baseRoute, matcher, callback, binding) {
	    var routes = matcher.routes;

	    for (var path in routes) {
	      if (routes.hasOwnProperty(path)) {
	        var routeArray = baseRoute.slice();
	        addRoute(routeArray, path, routes[path]);

	        if (matcher.children[path]) {
	          eachRoute(routeArray, matcher.children[path], callback, binding);
	        } else {
	          callback.call(binding, routeArray);
	        }
	      }
	    }
	  }

	  function map (callback, addRouteCallback) {
	    var matcher = new Matcher();

	    callback(generateMatch("", matcher, this.delegate));

	    eachRoute([], matcher, function (route) {
	      if (addRouteCallback) {
	        addRouteCallback(this, route);
	      } else {
	        this.add(route);
	      }
	    }, this);
	  }

	  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];

	  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

	  function isArray(test) {
	    return Object.prototype.toString.call(test) === "[object Array]";
	  }

	  // A Segment represents a segment in the original route description.
	  // Each Segment type provides an `eachChar` and `regex` method.
	  //
	  // The `eachChar` method invokes the callback with one or more character
	  // specifications. A character specification consumes one or more input
	  // characters.
	  //
	  // The `regex` method returns a regex fragment for the segment. If the
	  // segment is a dynamic of star segment, the regex fragment also includes
	  // a capture.
	  //
	  // A character specification contains:
	  //
	  // * `validChars`: a String with a list of all valid characters, or
	  // * `invalidChars`: a String with a list of all invalid characters
	  // * `repeat`: true if the character specification can repeat

	  function StaticSegment(string) {
	    this.string = string;
	  }
	  StaticSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      var string = this.string,
	          ch;

	      for (var i = 0, l = string.length; i < l; i++) {
	        ch = string.charAt(i);
	        callback({ validChars: ch });
	      }
	    },

	    regex: function regex() {
	      return this.string.replace(escapeRegex, '\\$1');
	    },

	    generate: function generate() {
	      return this.string;
	    }
	  };

	  function DynamicSegment(name) {
	    this.name = name;
	  }
	  DynamicSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "/", repeat: true });
	    },

	    regex: function regex() {
	      return "([^/]+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function StarSegment(name) {
	    this.name = name;
	  }
	  StarSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "", repeat: true });
	    },

	    regex: function regex() {
	      return "(.+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function EpsilonSegment() {}
	  EpsilonSegment.prototype = {
	    eachChar: function eachChar() {},
	    regex: function regex() {
	      return "";
	    },
	    generate: function generate() {
	      return "";
	    }
	  };

	  function parse(route, names, specificity) {
	    // normalize route as not starting with a "/". Recognition will
	    // also normalize.
	    if (route.charAt(0) === "/") {
	      route = route.substr(1);
	    }

	    var segments = route.split("/"),
	        results = [];

	    // A routes has specificity determined by the order that its different segments
	    // appear in. This system mirrors how the magnitude of numbers written as strings
	    // works.
	    // Consider a number written as: "abc". An example would be "200". Any other number written
	    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	    // leading symbol, "1".
	    // The rule is that symbols to the left carry more weight than symbols to the right
	    // when a number is written out as a string. In the above strings, the leading digit
	    // represents how many 100's are in the number, and it carries more weight than the middle
	    // number which represents how many 10's are in the number.
	    // This system of number magnitude works well for route specificity, too. A route written as
	    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	    // `x`, irrespective of the other parts.
	    // Because of this similarity, we assign each type of segment a number value written as a
	    // string. We can find the specificity of compound routes by concatenating these strings
	    // together, from left to right. After we have looped through all of the segments,
	    // we convert the string to a number.
	    specificity.val = '';

	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i],
	          match;

	      if (match = segment.match(/^:([^\/]+)$/)) {
	        results.push(new DynamicSegment(match[1]));
	        names.push(match[1]);
	        specificity.val += '3';
	      } else if (match = segment.match(/^\*([^\/]+)$/)) {
	        results.push(new StarSegment(match[1]));
	        specificity.val += '2';
	        names.push(match[1]);
	      } else if (segment === "") {
	        results.push(new EpsilonSegment());
	        specificity.val += '1';
	      } else {
	        results.push(new StaticSegment(segment));
	        specificity.val += '4';
	      }
	    }

	    specificity.val = +specificity.val;

	    return results;
	  }

	  // A State has a character specification and (`charSpec`) and a list of possible
	  // subsequent states (`nextStates`).
	  //
	  // If a State is an accepting state, it will also have several additional
	  // properties:
	  //
	  // * `regex`: A regular expression that is used to extract parameters from paths
	  //   that reached this accepting state.
	  // * `handlers`: Information on how to convert the list of captures into calls
	  //   to registered handlers with the specified parameters
	  // * `types`: How many static, dynamic or star segments in this route. Used to
	  //   decide which route to use if multiple registered routes match a path.
	  //
	  // Currently, State is implemented naively by looping over `nextStates` and
	  // comparing a character specification against a character. A more efficient
	  // implementation would use a hash of keys pointing at one or more next states.

	  function State(charSpec) {
	    this.charSpec = charSpec;
	    this.nextStates = [];
	  }

	  State.prototype = {
	    get: function get(charSpec) {
	      var nextStates = this.nextStates;

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        var child = nextStates[i];

	        var isEqual = child.charSpec.validChars === charSpec.validChars;
	        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

	        if (isEqual) {
	          return child;
	        }
	      }
	    },

	    put: function put(charSpec) {
	      var state;

	      // If the character specification already exists in a child of the current
	      // state, just return that state.
	      if (state = this.get(charSpec)) {
	        return state;
	      }

	      // Make a new state for the character spec
	      state = new State(charSpec);

	      // Insert the new state as a child of the current state
	      this.nextStates.push(state);

	      // If this character specification repeats, insert the new state as a child
	      // of itself. Note that this will not trigger an infinite loop because each
	      // transition during recognition consumes a character.
	      if (charSpec.repeat) {
	        state.nextStates.push(state);
	      }

	      // Return the new state
	      return state;
	    },

	    // Find a list of child states matching the next character
	    match: function match(ch) {
	      // DEBUG "Processing `" + ch + "`:"
	      var nextStates = this.nextStates,
	          child,
	          charSpec,
	          chars;

	      // DEBUG "  " + debugState(this)
	      var returned = [];

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        child = nextStates[i];

	        charSpec = child.charSpec;

	        if (typeof (chars = charSpec.validChars) !== 'undefined') {
	          if (chars.indexOf(ch) !== -1) {
	            returned.push(child);
	          }
	        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	          if (chars.indexOf(ch) === -1) {
	            returned.push(child);
	          }
	        }
	      }

	      return returned;
	    }

	    /** IF DEBUG
	    , debug: function() {
	      var charSpec = this.charSpec,
	          debug = "[",
	          chars = charSpec.validChars || charSpec.invalidChars;
	       if (charSpec.invalidChars) { debug += "^"; }
	      debug += chars;
	      debug += "]";
	       if (charSpec.repeat) { debug += "+"; }
	       return debug;
	    }
	    END IF **/
	  };

	  /** IF DEBUG
	  function debug(log) {
	    console.log(log);
	  }

	  function debugState(state) {
	    return state.nextStates.map(function(n) {
	      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	    }).join(", ")
	  }
	  END IF **/

	  // Sort the routes by specificity
	  function sortSolutions(states) {
	    return states.sort(function (a, b) {
	      return b.specificity.val - a.specificity.val;
	    });
	  }

	  function recognizeChar(states, ch) {
	    var nextStates = [];

	    for (var i = 0, l = states.length; i < l; i++) {
	      var state = states[i];

	      nextStates = nextStates.concat(state.match(ch));
	    }

	    return nextStates;
	  }

	  var oCreate = Object.create || function (proto) {
	    function F() {}
	    F.prototype = proto;
	    return new F();
	  };

	  function RecognizeResults(queryParams) {
	    this.queryParams = queryParams || {};
	  }
	  RecognizeResults.prototype = oCreate({
	    splice: Array.prototype.splice,
	    slice: Array.prototype.slice,
	    push: Array.prototype.push,
	    length: 0,
	    queryParams: null
	  });

	  function findHandler(state, path, queryParams) {
	    var handlers = state.handlers,
	        regex = state.regex;
	    var captures = path.match(regex),
	        currentCapture = 1;
	    var result = new RecognizeResults(queryParams);

	    for (var i = 0, l = handlers.length; i < l; i++) {
	      var handler = handlers[i],
	          names = handler.names,
	          params = {};

	      for (var j = 0, m = names.length; j < m; j++) {
	        params[names[j]] = captures[currentCapture++];
	      }

	      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	    }

	    return result;
	  }

	  function addSegment(currentState, segment) {
	    segment.eachChar(function (ch) {
	      var state;

	      currentState = currentState.put(ch);
	    });

	    return currentState;
	  }

	  function decodeQueryParamPart(part) {
	    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	    part = part.replace(/\+/gm, '%20');
	    return decodeURIComponent(part);
	  }

	  // The main interface

	  var RouteRecognizer = function RouteRecognizer() {
	    this.rootState = new State();
	    this.names = {};
	  };

	  RouteRecognizer.prototype = {
	    add: function add(routes, options) {
	      var currentState = this.rootState,
	          regex = "^",
	          specificity = {},
	          handlers = [],
	          allSegments = [],
	          name;

	      var isEmpty = true;

	      for (var i = 0, l = routes.length; i < l; i++) {
	        var route = routes[i],
	            names = [];

	        var segments = parse(route.path, names, specificity);

	        allSegments = allSegments.concat(segments);

	        for (var j = 0, m = segments.length; j < m; j++) {
	          var segment = segments[j];

	          if (segment instanceof EpsilonSegment) {
	            continue;
	          }

	          isEmpty = false;

	          // Add a "/" for the new segment
	          currentState = currentState.put({ validChars: "/" });
	          regex += "/";

	          // Add a representation of the segment to the NFA and regex
	          currentState = addSegment(currentState, segment);
	          regex += segment.regex();
	        }

	        var handler = { handler: route.handler, names: names };
	        handlers.push(handler);
	      }

	      if (isEmpty) {
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	      }

	      currentState.handlers = handlers;
	      currentState.regex = new RegExp(regex + "$");
	      currentState.specificity = specificity;

	      if (name = options && options.as) {
	        this.names[name] = {
	          segments: allSegments,
	          handlers: handlers
	        };
	      }
	    },

	    handlersFor: function handlersFor(name) {
	      var route = this.names[name],
	          result = [];
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      for (var i = 0, l = route.handlers.length; i < l; i++) {
	        result.push(route.handlers[i]);
	      }

	      return result;
	    },

	    hasRoute: function hasRoute(name) {
	      return !!this.names[name];
	    },

	    generate: function generate(name, params) {
	      var route = this.names[name],
	          output = "";
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      var segments = route.segments;

	      for (var i = 0, l = segments.length; i < l; i++) {
	        var segment = segments[i];

	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }

	        output += "/";
	        output += segment.generate(params);
	      }

	      if (output.charAt(0) !== '/') {
	        output = '/' + output;
	      }

	      if (params && params.queryParams) {
	        output += this.generateQueryString(params.queryParams);
	      }

	      return output;
	    },

	    generateQueryString: function generateQueryString(params) {
	      var pairs = [];
	      var keys = [];
	      for (var key in params) {
	        if (params.hasOwnProperty(key)) {
	          keys.push(key);
	        }
	      }
	      keys.sort();
	      for (var i = 0, len = keys.length; i < len; i++) {
	        key = keys[i];
	        var value = params[key];
	        if (value == null) {
	          continue;
	        }
	        var pair = encodeURIComponent(key);
	        if (isArray(value)) {
	          for (var j = 0, l = value.length; j < l; j++) {
	            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	            pairs.push(arrayPair);
	          }
	        } else {
	          pair += "=" + encodeURIComponent(value);
	          pairs.push(pair);
	        }
	      }

	      if (pairs.length === 0) {
	        return '';
	      }

	      return "?" + pairs.join("&");
	    },

	    parseQueryString: function parseQueryString(queryString) {
	      var pairs = queryString.split("&"),
	          queryParams = {};
	      for (var i = 0; i < pairs.length; i++) {
	        var pair = pairs[i].split('='),
	            key = decodeQueryParamPart(pair[0]),
	            keyLength = key.length,
	            isArray = false,
	            value;
	        if (pair.length === 1) {
	          value = 'true';
	        } else {
	          //Handle arrays
	          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	            isArray = true;
	            key = key.slice(0, keyLength - 2);
	            if (!queryParams[key]) {
	              queryParams[key] = [];
	            }
	          }
	          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	        }
	        if (isArray) {
	          queryParams[key].push(value);
	        } else {
	          queryParams[key] = value;
	        }
	      }
	      return queryParams;
	    },

	    recognize: function recognize(path) {
	      var states = [this.rootState],
	          pathLen,
	          i,
	          l,
	          queryStart,
	          queryParams = {},
	          isSlashDropped = false;

	      queryStart = path.indexOf('?');
	      if (queryStart !== -1) {
	        var queryString = path.substr(queryStart + 1, path.length);
	        path = path.substr(0, queryStart);
	        queryParams = this.parseQueryString(queryString);
	      }

	      path = decodeURI(path);

	      // DEBUG GROUP path

	      if (path.charAt(0) !== "/") {
	        path = "/" + path;
	      }

	      pathLen = path.length;
	      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	        path = path.substr(0, pathLen - 1);
	        isSlashDropped = true;
	      }

	      for (i = 0, l = path.length; i < l; i++) {
	        states = recognizeChar(states, path.charAt(i));
	        if (!states.length) {
	          break;
	        }
	      }

	      // END DEBUG GROUP

	      var solutions = [];
	      for (i = 0, l = states.length; i < l; i++) {
	        if (states[i].handlers) {
	          solutions.push(states[i]);
	        }
	      }

	      states = sortSolutions(solutions);

	      var state = solutions[0];

	      if (state && state.handlers) {
	        // if a trailing slash was dropped and a star segment is the last segment
	        // specified, put the trailing slash back
	        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	          path = path + "/";
	        }
	        return findHandler(state, path, queryParams);
	      }
	    }
	  };

	  RouteRecognizer.prototype.map = map;

	  RouteRecognizer.VERSION = '0.1.9';

	  var genQuery = RouteRecognizer.prototype.generateQueryString;

	  // export default for holding the Vue reference
	  var exports$1 = {};
	  /**
	   * Warn stuff.
	   *
	   * @param {String} msg
	   */

	  function warn(msg) {
	    /* istanbul ignore next */
	    if (window.console) {
	      console.warn('[vue-router] ' + msg);
	      if (!exports$1.Vue || exports$1.Vue.config.debug) {
	        console.warn(new Error('warning stack trace:').stack);
	      }
	    }
	  }

	  /**
	   * Resolve a relative path.
	   *
	   * @param {String} base
	   * @param {String} relative
	   * @param {Boolean} append
	   * @return {String}
	   */

	  function resolvePath(base, relative, append) {
	    var query = base.match(/(\?.*)$/);
	    if (query) {
	      query = query[1];
	      base = base.slice(0, -query.length);
	    }
	    // a query!
	    if (relative.charAt(0) === '?') {
	      return base + relative;
	    }
	    var stack = base.split('/');
	    // remove trailing segment if:
	    // - not appending
	    // - appending to trailing slash (last segment is empty)
	    if (!append || !stack[stack.length - 1]) {
	      stack.pop();
	    }
	    // resolve relative path
	    var segments = relative.replace(/^\//, '').split('/');
	    for (var i = 0; i < segments.length; i++) {
	      var segment = segments[i];
	      if (segment === '.') {
	        continue;
	      } else if (segment === '..') {
	        stack.pop();
	      } else {
	        stack.push(segment);
	      }
	    }
	    // ensure leading slash
	    if (stack[0] !== '') {
	      stack.unshift('');
	    }
	    return stack.join('/');
	  }

	  /**
	   * Forgiving check for a promise
	   *
	   * @param {Object} p
	   * @return {Boolean}
	   */

	  function isPromise(p) {
	    return p && typeof p.then === 'function';
	  }

	  /**
	   * Retrive a route config field from a component instance
	   * OR a component contructor.
	   *
	   * @param {Function|Vue} component
	   * @param {String} name
	   * @return {*}
	   */

	  function getRouteConfig(component, name) {
	    var options = component && (component.$options || component.options);
	    return options && options.route && options.route[name];
	  }

	  /**
	   * Resolve an async component factory. Have to do a dirty
	   * mock here because of Vue core's internal API depends on
	   * an ID check.
	   *
	   * @param {Object} handler
	   * @param {Function} cb
	   */

	  var resolver = undefined;

	  function resolveAsyncComponent(handler, cb) {
	    if (!resolver) {
	      resolver = {
	        resolve: exports$1.Vue.prototype._resolveComponent,
	        $options: {
	          components: {
	            _: handler.component
	          }
	        }
	      };
	    } else {
	      resolver.$options.components._ = handler.component;
	    }
	    resolver.resolve('_', function (Component) {
	      handler.component = Component;
	      cb(Component);
	    });
	  }

	  /**
	   * Map the dynamic segments in a path to params.
	   *
	   * @param {String} path
	   * @param {Object} params
	   * @param {Object} query
	   */

	  function mapParams(path, params, query) {
	    if (params === undefined) params = {};

	    path = path.replace(/:([^\/]+)/g, function (_, key) {
	      var val = params[key];
	      /* istanbul ignore if */
	      if (!val) {
	        warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	      }
	      return val || '';
	    });
	    if (query) {
	      path += genQuery(query);
	    }
	    return path;
	  }

	  var hashRE = /#.*$/;

	  var HTML5History = (function () {
	    function HTML5History(_ref) {
	      var root = _ref.root;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HTML5History);

	      if (root) {
	        // make sure there's the starting slash
	        if (root.charAt(0) !== '/') {
	          root = '/' + root;
	        }
	        // remove trailing slash
	        this.root = root.replace(/\/$/, '');
	        this.rootRE = new RegExp('^\\' + this.root);
	      } else {
	        this.root = null;
	      }
	      this.onChange = onChange;
	      // check base tag
	      var baseEl = document.querySelector('base');
	      this.base = baseEl && baseEl.getAttribute('href');
	    }

	    HTML5History.prototype.start = function start() {
	      var _this = this;

	      this.listener = function (e) {
	        var url = decodeURI(location.pathname + location.search);
	        if (_this.root) {
	          url = url.replace(_this.rootRE, '');
	        }
	        _this.onChange(url, e && e.state, location.hash);
	      };
	      window.addEventListener('popstate', this.listener);
	      this.listener();
	    };

	    HTML5History.prototype.stop = function stop() {
	      window.removeEventListener('popstate', this.listener);
	    };

	    HTML5History.prototype.go = function go(path, replace, append) {
	      var url = this.formatPath(path, append);
	      if (replace) {
	        history.replaceState({}, '', url);
	      } else {
	        // record scroll position by replacing current state
	        history.replaceState({
	          pos: {
	            x: window.pageXOffset,
	            y: window.pageYOffset
	          }
	        }, '', location.href);
	        // then push new state
	        history.pushState({}, '', url);
	      }
	      var hashMatch = path.match(hashRE);
	      var hash = hashMatch && hashMatch[0];
	      path = url
	      // strip hash so it doesn't mess up params
	      .replace(hashRE, '')
	      // remove root before matching
	      .replace(this.rootRE, '');
	      this.onChange(path, null, hash);
	    };

	    HTML5History.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/'
	      // absolute path
	      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	    };

	    return HTML5History;
	  })();

	  var HashHistory = (function () {
	    function HashHistory(_ref) {
	      var hashbang = _ref.hashbang;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HashHistory);

	      this.hashbang = hashbang;
	      this.onChange = onChange;
	    }

	    HashHistory.prototype.start = function start() {
	      var self = this;
	      this.listener = function () {
	        var path = location.hash;
	        var raw = path.replace(/^#!?/, '');
	        // always
	        if (raw.charAt(0) !== '/') {
	          raw = '/' + raw;
	        }
	        var formattedPath = self.formatPath(raw);
	        if (formattedPath !== path) {
	          location.replace(formattedPath);
	          return;
	        }
	        // determine query
	        // note it's possible to have queries in both the actual URL
	        // and the hash fragment itself.
	        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	        self.onChange(decodeURI(path.replace(/^#!?/, '') + query));
	      };
	      window.addEventListener('hashchange', this.listener);
	      this.listener();
	    };

	    HashHistory.prototype.stop = function stop() {
	      window.removeEventListener('hashchange', this.listener);
	    };

	    HashHistory.prototype.go = function go(path, replace, append) {
	      path = this.formatPath(path, append);
	      if (replace) {
	        location.replace(path);
	      } else {
	        location.hash = path;
	      }
	    };

	    HashHistory.prototype.formatPath = function formatPath(path, append) {
	      var isAbsoloute = path.charAt(0) === '/';
	      var prefix = '#' + (this.hashbang ? '!' : '');
	      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	    };

	    return HashHistory;
	  })();

	  var AbstractHistory = (function () {
	    function AbstractHistory(_ref) {
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, AbstractHistory);

	      this.onChange = onChange;
	      this.currentPath = '/';
	    }

	    AbstractHistory.prototype.start = function start() {
	      this.onChange('/');
	    };

	    AbstractHistory.prototype.stop = function stop() {
	      // noop
	    };

	    AbstractHistory.prototype.go = function go(path, replace, append) {
	      path = this.currentPath = this.formatPath(path, append);
	      this.onChange(path);
	    };

	    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	    };

	    return AbstractHistory;
	  })();

	  /**
	   * Determine the reusability of an existing router view.
	   *
	   * @param {Directive} view
	   * @param {Object} handler
	   * @param {Transition} transition
	   */

	  function canReuse(view, handler, transition) {
	    var component = view.childVM;
	    if (!component || !handler) {
	      return false;
	    }
	    // important: check view.Component here because it may
	    // have been changed in activate hook
	    if (view.Component !== handler.component) {
	      return false;
	    }
	    var canReuseFn = getRouteConfig(component, 'canReuse');
	    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	      to: transition.to,
	      from: transition.from
	    }) : true; // defaults to true
	  }

	  /**
	   * Check if a component can deactivate.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canDeactivate(view, transition, next) {
	    var fromComponent = view.childVM;
	    var hook = getRouteConfig(fromComponent, 'canDeactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, fromComponent, next, {
	        expectBoolean: true
	      });
	    }
	  }

	  /**
	   * Check if a component can activate.
	   *
	   * @param {Object} handler
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canActivate(handler, transition, next) {
	    resolveAsyncComponent(handler, function (Component) {
	      // have to check due to async-ness
	      if (transition.aborted) {
	        return;
	      }
	      // determine if this component can be activated
	      var hook = getRouteConfig(Component, 'canActivate');
	      if (!hook) {
	        next();
	      } else {
	        transition.callHook(hook, null, next, {
	          expectBoolean: true
	        });
	      }
	    });
	  }

	  /**
	   * Call deactivate hooks for existing router-views.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function deactivate(view, transition, next) {
	    var component = view.childVM;
	    var hook = getRouteConfig(component, 'deactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHooks(hook, component, next);
	    }
	  }

	  /**
	   * Activate / switch component for a router-view.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Number} depth
	   * @param {Function} [cb]
	   */

	  function activate(view, transition, depth, cb, reuse) {
	    var handler = transition.activateQueue[depth];
	    if (!handler) {
	      saveChildView(view);
	      if (view._bound) {
	        view.setComponent(null);
	      }
	      cb && cb();
	      return;
	    }

	    var Component = view.Component = handler.component;
	    var activateHook = getRouteConfig(Component, 'activate');
	    var dataHook = getRouteConfig(Component, 'data');
	    var waitForData = getRouteConfig(Component, 'waitForData');

	    view.depth = depth;
	    view.activated = false;

	    var component = undefined;
	    var loading = !!(dataHook && !waitForData);

	    // "reuse" is a flag passed down when the parent view is
	    // either reused via keep-alive or as a child of a kept-alive view.
	    // of course we can only reuse if the current kept-alive instance
	    // is of the correct type.
	    reuse = reuse && view.childVM && view.childVM.constructor === Component;

	    if (reuse) {
	      // just reuse
	      component = view.childVM;
	      component.$loadingRouteData = loading;
	    } else {
	      saveChildView(view);

	      // unbuild current component. this step also destroys
	      // and removes all nested child views.
	      view.unbuild(true);

	      // build the new component. this will also create the
	      // direct child view of the current one. it will register
	      // itself as view.childView.
	      component = view.build({
	        _meta: {
	          $loadingRouteData: loading
	        },
	        created: function created() {
	          this._routerView = view;
	        }
	      });

	      // handle keep-alive.
	      // when a kept-alive child vm is restored, we need to
	      // add its cached child views into the router's view list,
	      // and also properly update current view's child view.
	      if (view.keepAlive) {
	        component.$loadingRouteData = loading;
	        var cachedChildView = component._keepAliveRouterView;
	        if (cachedChildView) {
	          view.childView = cachedChildView;
	          component._keepAliveRouterView = null;
	        }
	      }
	    }

	    // cleanup the component in case the transition is aborted
	    // before the component is ever inserted.
	    var cleanup = function cleanup() {
	      component.$destroy();
	    };

	    // actually insert the component and trigger transition
	    var insert = function insert() {
	      if (reuse) {
	        cb && cb();
	        return;
	      }
	      var router = transition.router;
	      if (router._rendered || router._transitionOnLoad) {
	        view.transition(component);
	      } else {
	        // no transition on first render, manual transition
	        /* istanbul ignore if */
	        if (view.setCurrent) {
	          // 0.12 compat
	          view.setCurrent(component);
	        } else {
	          // 1.0
	          view.childVM = component;
	        }
	        component.$before(view.anchor, null, false);
	      }
	      cb && cb();
	    };

	    var afterData = function afterData() {
	      // activate the child view
	      if (view.childView) {
	        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	      }
	      insert();
	    };

	    // called after activation hook is resolved
	    var afterActivate = function afterActivate() {
	      view.activated = true;
	      if (dataHook && waitForData) {
	        // wait until data loaded to insert
	        loadData(component, transition, dataHook, afterData, cleanup);
	      } else {
	        // load data and insert at the same time
	        if (dataHook) {
	          loadData(component, transition, dataHook);
	        }
	        afterData();
	      }
	    };

	    if (activateHook) {
	      transition.callHooks(activateHook, component, afterActivate, {
	        cleanup: cleanup,
	        postActivate: true
	      });
	    } else {
	      afterActivate();
	    }
	  }

	  /**
	   * Reuse a view, just reload data if necessary.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   */

	  function reuse(view, transition) {
	    var component = view.childVM;
	    var dataHook = getRouteConfig(component, 'data');
	    if (dataHook) {
	      loadData(component, transition, dataHook);
	    }
	  }

	  /**
	   * Asynchronously load and apply data to component.
	   *
	   * @param {Vue} component
	   * @param {Transition} transition
	   * @param {Function} hook
	   * @param {Function} cb
	   * @param {Function} cleanup
	   */

	  function loadData(component, transition, hook, cb, cleanup) {
	    component.$loadingRouteData = true;
	    transition.callHooks(hook, component, function () {
	      component.$loadingRouteData = false;
	      component.$emit('route-data-loaded', component);
	      cb && cb();
	    }, {
	      cleanup: cleanup,
	      postActivate: true,
	      processData: function processData(data) {
	        // handle promise sugar syntax
	        var promises = [];
	        if (isPlainObject(data)) {
	          Object.keys(data).forEach(function (key) {
	            var val = data[key];
	            if (isPromise(val)) {
	              promises.push(val.then(function (resolvedVal) {
	                component.$set(key, resolvedVal);
	              }));
	            } else {
	              component.$set(key, val);
	            }
	          });
	        }
	        if (promises.length) {
	          return promises[0].constructor.all(promises);
	        }
	      }
	    });
	  }

	  /**
	   * Save the child view for a kept-alive view so that
	   * we can restore it when it is switched back to.
	   *
	   * @param {Directive} view
	   */

	  function saveChildView(view) {
	    if (view.keepAlive && view.childVM && view.childView) {
	      view.childVM._keepAliveRouterView = view.childView;
	    }
	    view.childView = null;
	  }

	  /**
	   * Check plain object.
	   *
	   * @param {*} val
	   */

	  function isPlainObject(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  /**
	   * A RouteTransition object manages the pipeline of a
	   * router-view switching process. This is also the object
	   * passed into user route hooks.
	   *
	   * @param {Router} router
	   * @param {Route} to
	   * @param {Route} from
	   */

	  var RouteTransition = (function () {
	    function RouteTransition(router, to, from) {
	      babelHelpers.classCallCheck(this, RouteTransition);

	      this.router = router;
	      this.to = to;
	      this.from = from;
	      this.next = null;
	      this.aborted = false;
	      this.done = false;
	    }

	    /**
	     * Abort current transition and return to previous location.
	     */

	    RouteTransition.prototype.abort = function abort() {
	      if (!this.aborted) {
	        this.aborted = true;
	        // if the root path throws an error during validation
	        // on initial load, it gets caught in an infinite loop.
	        var abortingOnLoad = !this.from.path && this.to.path === '/';
	        if (!abortingOnLoad) {
	          this.router.replace(this.from.path || '/');
	        }
	      }
	    };

	    /**
	     * Abort current transition and redirect to a new location.
	     *
	     * @param {String} path
	     */

	    RouteTransition.prototype.redirect = function redirect(path) {
	      if (!this.aborted) {
	        this.aborted = true;
	        if (typeof path === 'string') {
	          path = mapParams(path, this.to.params, this.to.query);
	        } else {
	          path.params = path.params || this.to.params;
	          path.query = path.query || this.to.query;
	        }
	        this.router.replace(path);
	      }
	    };

	    /**
	     * A router view transition's pipeline can be described as
	     * follows, assuming we are transitioning from an existing
	     * <router-view> chain [Component A, Component B] to a new
	     * chain [Component A, Component C]:
	     *
	     *  A    A
	     *  | => |
	     *  B    C
	     *
	     * 1. Reusablity phase:
	     *   -> canReuse(A, A)
	     *   -> canReuse(B, C)
	     *   -> determine new queues:
	     *      - deactivation: [B]
	     *      - activation: [C]
	     *
	     * 2. Validation phase:
	     *   -> canDeactivate(B)
	     *   -> canActivate(C)
	     *
	     * 3. Activation phase:
	     *   -> deactivate(B)
	     *   -> activate(C)
	     *
	     * Each of these steps can be asynchronous, and any
	     * step can potentially abort the transition.
	     *
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.start = function start(cb) {
	      var transition = this;

	      // determine the queue of views to deactivate
	      var deactivateQueue = [];
	      var view = this.router._rootView;
	      while (view) {
	        deactivateQueue.unshift(view);
	        view = view.childView;
	      }
	      var reverseDeactivateQueue = deactivateQueue.slice().reverse();

	      // determine the queue of route handlers to activate
	      var activateQueue = this.activateQueue = toArray(this.to.matched).map(function (match) {
	        return match.handler;
	      });

	      // 1. Reusability phase
	      var i = undefined,
	          reuseQueue = undefined;
	      for (i = 0; i < reverseDeactivateQueue.length; i++) {
	        if (!canReuse(reverseDeactivateQueue[i], activateQueue[i], transition)) {
	          break;
	        }
	      }
	      if (i > 0) {
	        reuseQueue = reverseDeactivateQueue.slice(0, i);
	        deactivateQueue = reverseDeactivateQueue.slice(i).reverse();
	        activateQueue = activateQueue.slice(i);
	      }

	      // 2. Validation phase
	      transition.runQueue(deactivateQueue, canDeactivate, function () {
	        transition.runQueue(activateQueue, canActivate, function () {
	          transition.runQueue(deactivateQueue, deactivate, function () {
	            // 3. Activation phase

	            // Update router current route
	            transition.router._onTransitionValidated(transition);

	            // trigger reuse for all reused views
	            reuseQueue && reuseQueue.forEach(function (view) {
	              return reuse(view, transition);
	            });

	            // the root of the chain that needs to be replaced
	            // is the top-most non-reusable view.
	            if (deactivateQueue.length) {
	              var _view = deactivateQueue[deactivateQueue.length - 1];
	              var depth = reuseQueue ? reuseQueue.length : 0;
	              activate(_view, transition, depth, cb);
	            } else {
	              cb();
	            }
	          });
	        });
	      });
	    };

	    /**
	     * Asynchronously and sequentially apply a function to a
	     * queue.
	     *
	     * @param {Array} queue
	     * @param {Function} fn
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	      var transition = this;
	      step(0);
	      function step(index) {
	        if (index >= queue.length) {
	          cb();
	        } else {
	          fn(queue[index], transition, function () {
	            step(index + 1);
	          });
	        }
	      }
	    };

	    /**
	     * Call a user provided route transition hook and handle
	     * the response (e.g. if the user returns a promise).
	     *
	     * If the user neither expects an argument nor returns a
	     * promise, the hook is assumed to be synchronous.
	     *
	     * @param {Function} hook
	     * @param {*} [context]
	     * @param {Function} [cb]
	     * @param {Object} [options]
	     *                 - {Boolean} expectBoolean
	     *                 - {Boolean} postActive
	     *                 - {Function} processData
	     *                 - {Function} cleanup
	     */

	    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	      var _ref$expectBoolean = _ref.expectBoolean;
	      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	      var _ref$postActivate = _ref.postActivate;
	      var postActivate = _ref$postActivate === undefined ? false : _ref$postActivate;
	      var processData = _ref.processData;
	      var cleanup = _ref.cleanup;

	      var transition = this;
	      var nextCalled = false;

	      // abort the transition
	      var abort = function abort() {
	        cleanup && cleanup();
	        transition.abort();
	      };

	      // handle errors
	      var onError = function onError(err) {
	        postActivate ? next() : abort();
	        if (err && !transition.router._suppress) {
	          warn('Uncaught error during transition: ');
	          throw err instanceof Error ? err : new Error(err);
	        }
	      };

	      // since promise swallows errors, we have to
	      // throw it in the next tick...
	      var onPromiseError = function onPromiseError(err) {
	        try {
	          onError(err);
	        } catch (e) {
	          setTimeout(function () {
	            throw e;
	          }, 0);
	        }
	      };

	      // advance the transition to the next step
	      var next = function next() {
	        if (nextCalled) {
	          warn('transition.next() should be called only once.');
	          return;
	        }
	        nextCalled = true;
	        if (transition.aborted) {
	          cleanup && cleanup();
	          return;
	        }
	        cb && cb();
	      };

	      var nextWithBoolean = function nextWithBoolean(res) {
	        if (typeof res === 'boolean') {
	          res ? next() : abort();
	        } else if (isPromise(res)) {
	          res.then(function (ok) {
	            ok ? next() : abort();
	          }, onPromiseError);
	        } else if (!hook.length) {
	          next();
	        }
	      };

	      var nextWithData = function nextWithData(data) {
	        var res = undefined;
	        try {
	          res = processData(data);
	        } catch (err) {
	          return onError(err);
	        }
	        if (isPromise(res)) {
	          res.then(next, onPromiseError);
	        } else {
	          next();
	        }
	      };

	      // expose a clone of the transition object, so that each
	      // hook gets a clean copy and prevent the user from
	      // messing with the internals.
	      var exposed = {
	        to: transition.to,
	        from: transition.from,
	        abort: abort,
	        next: processData ? nextWithData : next,
	        redirect: function redirect() {
	          transition.redirect.apply(transition, arguments);
	        }
	      };

	      // actually call the hook
	      var res = undefined;
	      try {
	        res = hook.call(context, exposed);
	      } catch (err) {
	        return onError(err);
	      }

	      if (expectBoolean) {
	        // boolean hooks
	        nextWithBoolean(res);
	      } else if (isPromise(res)) {
	        // promise
	        if (processData) {
	          res.then(nextWithData, onPromiseError);
	        } else {
	          res.then(next, onPromiseError);
	        }
	      } else if (processData && isPlainOjbect(res)) {
	        // data promise sugar
	        nextWithData(res);
	      } else if (!hook.length) {
	        next();
	      }
	    };

	    /**
	     * Call a single hook or an array of async hooks in series.
	     *
	     * @param {Array} hooks
	     * @param {*} context
	     * @param {Function} cb
	     * @param {Object} [options]
	     */

	    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	      var _this = this;

	      if (Array.isArray(hooks)) {
	        this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, next, options);
	          }
	        }, cb);
	      } else {
	        this.callHook(hooks, context, cb, options);
	      }
	    };

	    return RouteTransition;
	  })();

	  function isPlainOjbect(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  function toArray(val) {
	    return val ? Array.prototype.slice.call(val) : [];
	  }

	  var internalKeysRE = /^(component|subRoutes)$/;

	  /**
	   * Route Context Object
	   *
	   * @param {String} path
	   * @param {Router} router
	   */

	  var Route = function Route(path, router) {
	    var _this = this;

	    babelHelpers.classCallCheck(this, Route);

	    var matched = router._recognizer.recognize(path);
	    if (matched) {
	      // copy all custom fields from route configs
	      [].forEach.call(matched, function (match) {
	        for (var key in match.handler) {
	          if (!internalKeysRE.test(key)) {
	            _this[key] = match.handler[key];
	          }
	        }
	      });
	      // set query and params
	      this.query = matched.queryParams;
	      this.params = [].reduce.call(matched, function (prev, cur) {
	        if (cur.params) {
	          for (var key in cur.params) {
	            prev[key] = cur.params[key];
	          }
	        }
	        return prev;
	      }, {});
	    }
	    // expose path and router
	    this.path = path;
	    this.router = router;
	    // for internal use
	    this.matched = matched || router._notFoundHandler;
	    // Important: freeze self to prevent observation
	    Object.freeze(this);
	  };

	  function applyOverride (Vue) {
	    var _Vue$util = Vue.util;
	    var extend = _Vue$util.extend;
	    var isArray = _Vue$util.isArray;
	    var defineReactive = _Vue$util.defineReactive;

	    // override Vue's init and destroy process to keep track of router instances
	    var init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      options = options || {};
	      var root = options._parent || options.parent || this;
	      var router = root.$router;
	      var route = root.$route;
	      if (router) {
	        // expose router
	        this.$router = router;
	        router._children.push(this);
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          defineReactive(this, '$route', route);
	        }
	      }
	      init.call(this, options);
	    };

	    var destroy = Vue.prototype._destroy;
	    Vue.prototype._destroy = function () {
	      if (!this._isBeingDestroyed && this.$router) {
	        this.$router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    };

	    // 1.0 only: enable route mixins
	    var strats = Vue.config.optionMergeStrategies;
	    var hooksToMergeRE = /^(data|activate|deactivate)$/;

	    if (strats) {
	      strats.route = function (parentVal, childVal) {
	        if (!childVal) return parentVal;
	        if (!parentVal) return childVal;
	        var ret = {};
	        extend(ret, parentVal);
	        for (var key in childVal) {
	          var a = ret[key];
	          var b = childVal[key];
	          // for data, activate and deactivate, we need to merge them into
	          // arrays similar to lifecycle hooks.
	          if (a && hooksToMergeRE.test(key)) {
	            ret[key] = (isArray(a) ? a : [a]).concat(b);
	          } else {
	            ret[key] = b;
	          }
	        }
	        return ret;
	      };
	    }
	  }

	  function View (Vue) {

	    var _ = Vue.util;
	    var componentDef =
	    // 0.12
	    Vue.directive('_component') ||
	    // 1.0
	    Vue.internalDirectives.component;
	    // <router-view> extends the internal component directive
	    var viewDef = _.extend({}, componentDef);

	    // with some overrides
	    _.extend(viewDef, {

	      _isRouterView: true,

	      bind: function bind() {
	        var route = this.vm.$route;
	        /* istanbul ignore if */
	        if (!route) {
	          warn('<router-view> can only be used inside a ' + 'router-enabled app.');
	          return;
	        }
	        // force dynamic directive so v-component doesn't
	        // attempt to build right now
	        this._isDynamicLiteral = true;
	        // finally, init by delegating to v-component
	        componentDef.bind.call(this);

	        // locate the parent view
	        var parentView = undefined;
	        var parent = this.vm;
	        while (parent) {
	          if (parent._routerView) {
	            parentView = parent._routerView;
	            break;
	          }
	          parent = parent.$parent;
	        }
	        if (parentView) {
	          // register self as a child of the parent view,
	          // instead of activating now. This is so that the
	          // child's activate hook is called after the
	          // parent's has resolved.
	          this.parentView = parentView;
	          parentView.childView = this;
	        } else {
	          // this is the root view!
	          var router = route.router;
	          router._rootView = this;
	        }

	        // handle late-rendered view
	        // two possibilities:
	        // 1. root view rendered after transition has been
	        //    validated;
	        // 2. child view rendered after parent view has been
	        //    activated.
	        var transition = route.router._currentTransition;
	        if (!parentView && transition.done || parentView && parentView.activated) {
	          var depth = parentView ? parentView.depth + 1 : 0;
	          activate(this, transition, depth);
	        }
	      },

	      unbind: function unbind() {
	        if (this.parentView) {
	          this.parentView.childView = null;
	        }
	        componentDef.unbind.call(this);
	      }
	    });

	    Vue.elementDirective('router-view', viewDef);
	  }

	  var trailingSlashRE = /\/$/;
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var queryStringRE = /\?.*$/;

	  // install v-link, which provides navigation support for
	  // HTML5 history mode
	  function Link (Vue) {
	    var _Vue$util = Vue.util;
	    var _bind = _Vue$util.bind;
	    var isObject = _Vue$util.isObject;
	    var addClass = _Vue$util.addClass;
	    var removeClass = _Vue$util.removeClass;

	    Vue.directive('link-active', {
	      priority: 1001,
	      bind: function bind() {
	        this.el.__v_link_active = true;
	      }
	    });

	    Vue.directive('link', {
	      priority: 1000,

	      bind: function bind() {
	        var vm = this.vm;
	        /* istanbul ignore if */
	        if (!vm.$route) {
	          warn('v-link can only be used inside a router-enabled app.');
	          return;
	        }
	        this.router = vm.$route.router;
	        // update things when the route changes
	        this.unwatch = vm.$watch('$route', _bind(this.onRouteUpdate, this));
	        // check if active classes should be applied to a different element
	        this.activeEl = this.el;
	        var parent = this.el.parentNode;
	        while (parent) {
	          if (parent.__v_link_active) {
	            this.activeEl = parent;
	            break;
	          }
	          parent = parent.parentNode;
	        }
	        // no need to handle click if link expects to be opened
	        // in a new window/tab.
	        /* istanbul ignore if */
	        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	          return;
	        }
	        // handle click
	        this.handler = _bind(this.onClick, this);
	        this.el.addEventListener('click', this.handler);
	      },

	      update: function update(target) {
	        this.target = target;
	        if (isObject(target)) {
	          this.append = target.append;
	          this.exact = target.exact;
	          this.prevActiveClass = this.activeClass;
	          this.activeClass = target.activeClass;
	        }
	        this.onRouteUpdate(this.vm.$route);
	      },

	      onClick: function onClick(e) {
	        // don't redirect with control keys
	        /* istanbul ignore if */
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        /* istanbul ignore if */
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        /* istanbul ignore if */
	        if (e.button !== 0) return;

	        var target = this.target;
	        if (target) {
	          // v-link with expression, just go
	          e.preventDefault();
	          this.router.go(target);
	        } else {
	          // no expression, delegate for an <a> inside
	          var el = e.target;
	          while (el.tagName !== 'A' && el !== this.el) {
	            el = el.parentNode;
	          }
	          if (el.tagName === 'A' && sameOrigin(el)) {
	            e.preventDefault();
	            this.router.go({
	              path: el.pathname,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      },

	      onRouteUpdate: function onRouteUpdate(route) {
	        // router._stringifyPath is dependent on current route
	        // and needs to be called again whenver route changes.
	        var newPath = this.router._stringifyPath(this.target);
	        if (this.path !== newPath) {
	          this.path = newPath;
	          this.updateActiveMatch();
	          this.updateHref();
	        }
	        this.updateClasses(route.path);
	      },

	      updateActiveMatch: function updateActiveMatch() {
	        this.activeRE = this.path && !this.exact ? new RegExp('^' + this.path.replace(/\/$/, '').replace(queryStringRE, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      },

	      updateHref: function updateHref() {
	        if (this.el.tagName !== 'A') {
	          return;
	        }
	        var path = this.path;
	        var router = this.router;
	        var isAbsolute = path.charAt(0) === '/';
	        // do not format non-hash relative paths
	        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, this.append) : path;
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      },

	      updateClasses: function updateClasses(path) {
	        var el = this.activeEl;
	        var activeClass = this.activeClass || this.router._linkActiveClass;
	        // clear old class
	        if (this.prevActiveClass !== activeClass) {
	          removeClass(el, this.prevActiveClass);
	        }
	        // remove query string before matching
	        var dest = this.path.replace(queryStringRE, '');
	        path = path.replace(queryStringRE, '');
	        // add new class
	        if (this.exact) {
	          if (dest === path ||
	          // also allow additional trailing slash
	          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	            addClass(el, activeClass);
	          } else {
	            removeClass(el, activeClass);
	          }
	        } else {
	          if (this.activeRE && this.activeRE.test(path)) {
	            addClass(el, activeClass);
	          } else {
	            removeClass(el, activeClass);
	          }
	        }
	      },

	      unbind: function unbind() {
	        this.el.removeEventListener('click', this.handler);
	        this.unwatch && this.unwatch();
	      }
	    });

	    function sameOrigin(link) {
	      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	    }
	  }

	  var historyBackends = {
	    abstract: AbstractHistory,
	    hash: HashHistory,
	    html5: HTML5History
	  };

	  // late bind during install
	  var Vue = undefined;

	  /**
	   * Router constructor
	   *
	   * @param {Object} [options]
	   */

	  var Router = (function () {
	    function Router() {
	      var _this = this;

	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var _ref$hashbang = _ref.hashbang;
	      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	      var _ref$abstract = _ref.abstract;
	      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	      var _ref$history = _ref.history;
	      var history = _ref$history === undefined ? false : _ref$history;
	      var _ref$saveScrollPosition = _ref.saveScrollPosition;
	      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	      var _ref$transitionOnLoad = _ref.transitionOnLoad;
	      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	      var _ref$suppressTransitionError = _ref.suppressTransitionError;
	      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	      var _ref$root = _ref.root;
	      var root = _ref$root === undefined ? null : _ref$root;
	      var _ref$linkActiveClass = _ref.linkActiveClass;
	      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	      babelHelpers.classCallCheck(this, Router);

	      /* istanbul ignore if */
	      if (!Router.installed) {
	        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	      }

	      // Vue instances
	      this.app = null;
	      this._children = [];

	      // route recognizer
	      this._recognizer = new RouteRecognizer();
	      this._guardRecognizer = new RouteRecognizer();

	      // state
	      this._started = false;
	      this._startCb = null;
	      this._currentRoute = {};
	      this._currentTransition = null;
	      this._previousTransition = null;
	      this._notFoundHandler = null;
	      this._notFoundRedirect = null;
	      this._beforeEachHooks = [];
	      this._afterEachHooks = [];

	      // trigger transition on initial render?
	      this._rendered = false;
	      this._transitionOnLoad = transitionOnLoad;

	      // history mode
	      this._root = root;
	      this._abstract = abstract;
	      this._hashbang = hashbang;

	      // check if HTML5 history is available
	      var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	      this._history = history && hasPushState;
	      this._historyFallback = history && !hasPushState;

	      // create history object
	      var inBrowser = Vue.util.inBrowser;
	      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';

	      var History = historyBackends[this.mode];
	      this.history = new History({
	        root: root,
	        hashbang: this._hashbang,
	        onChange: function onChange(path, state, anchor) {
	          _this._match(path, state, anchor);
	        }
	      });

	      // other options
	      this._saveScrollPosition = saveScrollPosition;
	      this._linkActiveClass = linkActiveClass;
	      this._suppress = suppressTransitionError;
	    }

	    /**
	     * Allow directly passing components to a route
	     * definition.
	     *
	     * @param {String} path
	     * @param {Object} handler
	     */

	    // API ===================================================

	    /**
	    * Register a map of top-level paths.
	    *
	    * @param {Object} map
	    */

	    Router.prototype.map = function map(_map) {
	      for (var route in _map) {
	        this.on(route, _map[route]);
	      }
	      return this;
	    };

	    /**
	     * Register a single root-level path
	     *
	     * @param {String} rootPath
	     * @param {Object} handler
	     *                 - {String} component
	     *                 - {Object} [subRoutes]
	     *                 - {Boolean} [forceRefresh]
	     *                 - {Function} [before]
	     *                 - {Function} [after]
	     */

	    Router.prototype.on = function on(rootPath, handler) {
	      if (rootPath === '*') {
	        this._notFound(handler);
	      } else {
	        this._addRoute(rootPath, handler, []);
	      }
	      return this;
	    };

	    /**
	     * Set redirects.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.redirect = function redirect(map) {
	      for (var path in map) {
	        this._addRedirect(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set aliases.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.alias = function alias(map) {
	      for (var path in map) {
	        this._addAlias(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set global before hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.beforeEach = function beforeEach(fn) {
	      this._beforeEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Set global after hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.afterEach = function afterEach(fn) {
	      this._afterEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Navigate to a given path.
	     * The path can be an object describing a named path in
	     * the format of { name: '...', params: {}, query: {}}
	     * The path is assumed to be already decoded, and will
	     * be resolved against root (if provided)
	     *
	     * @param {String|Object} path
	     * @param {Boolean} [replace]
	     */

	    Router.prototype.go = function go(path) {
	      var replace = false;
	      var append = false;
	      if (Vue.util.isObject(path)) {
	        replace = path.replace;
	        append = path.append;
	      }
	      path = this._stringifyPath(path);
	      if (path) {
	        this.history.go(path, replace, append);
	      }
	    };

	    /**
	     * Short hand for replacing current path
	     *
	     * @param {String} path
	     */

	    Router.prototype.replace = function replace(path) {
	      if (typeof path === 'string') {
	        path = { path: path };
	      }
	      path.replace = true;
	      this.go(path);
	    };

	    /**
	     * Start the router.
	     *
	     * @param {VueConstructor} App
	     * @param {String|Element} container
	     * @param {Function} [cb]
	     */

	    Router.prototype.start = function start(App, container, cb) {
	      /* istanbul ignore if */
	      if (this._started) {
	        warn('already started.');
	        return;
	      }
	      this._started = true;
	      this._startCb = cb;
	      if (!this.app) {
	        /* istanbul ignore if */
	        if (!App || !container) {
	          throw new Error('Must start vue-router with a component and a ' + 'root container.');
	        }
	        /* istanbul ignore if */
	        if (App instanceof Vue) {
	          throw new Error('Must start vue-router with a component, not a ' + 'Vue instance.');
	        }
	        this._appContainer = container;
	        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	        // give it a name for better debugging
	        Ctor.options.name = Ctor.options.name || 'RouterApp';
	      }

	      // handle history fallback in browsers that do not
	      // support HTML5 history API
	      if (this._historyFallback) {
	        var _location = window.location;
	        var _history = new HTML5History({ root: this._root });
	        var path = _history.root ? _location.pathname.replace(_history.rootRE, '') : _location.pathname;
	        if (path && path !== '/') {
	          _location.assign((_history.root || '') + '/' + this.history.formatPath(path) + _location.search);
	          return;
	        }
	      }

	      this.history.start();
	    };

	    /**
	     * Stop listening to route changes.
	     */

	    Router.prototype.stop = function stop() {
	      this.history.stop();
	      this._started = false;
	    };

	    // Internal methods ======================================

	    /**
	    * Add a route containing a list of segments to the internal
	    * route recognizer. Will be called recursively to add all
	    * possible sub-routes.
	    *
	    * @param {String} path
	    * @param {Object} handler
	    * @param {Array} segments
	    */

	    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	      guardComponent(path, handler);
	      handler.path = path;
	      handler.fullPath = (segments.reduce(function (path, segment) {
	        return path + segment.path;
	      }, '') + path).replace('//', '/');
	      segments.push({
	        path: path,
	        handler: handler
	      });
	      this._recognizer.add(segments, {
	        as: handler.name
	      });
	      // add sub routes
	      if (handler.subRoutes) {
	        for (var subPath in handler.subRoutes) {
	          // recursively walk all sub routes
	          this._addRoute(subPath, handler.subRoutes[subPath],
	          // pass a copy in recursion to avoid mutating
	          // across branches
	          segments.slice());
	        }
	      }
	    };

	    /**
	     * Set the notFound route handler.
	     *
	     * @param {Object} handler
	     */

	    Router.prototype._notFound = function _notFound(handler) {
	      guardComponent('*', handler);
	      this._notFoundHandler = [{ handler: handler }];
	    };

	    /**
	     * Add a redirect record.
	     *
	     * @param {String} path
	     * @param {String} redirectPath
	     */

	    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	      if (path === '*') {
	        this._notFoundRedirect = redirectPath;
	      } else {
	        this._addGuard(path, redirectPath, this.replace);
	      }
	    };

	    /**
	     * Add an alias record.
	     *
	     * @param {String} path
	     * @param {String} aliasPath
	     */

	    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	      this._addGuard(path, aliasPath, this._match);
	    };

	    /**
	     * Add a path guard.
	     *
	     * @param {String} path
	     * @param {String} mappedPath
	     * @param {Function} handler
	     */

	    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	      var _this2 = this;

	      this._guardRecognizer.add([{
	        path: path,
	        handler: function handler(match, query) {
	          var realPath = mapParams(mappedPath, match.params, query);
	          _handler.call(_this2, realPath);
	        }
	      }]);
	    };

	    /**
	     * Check if a path matches any redirect records.
	     *
	     * @param {String} path
	     * @return {Boolean} - if true, will skip normal match.
	     */

	    Router.prototype._checkGuard = function _checkGuard(path) {
	      var matched = this._guardRecognizer.recognize(path);
	      if (matched) {
	        matched[0].handler(matched[0], matched.queryParams);
	        return true;
	      } else if (this._notFoundRedirect) {
	        matched = this._recognizer.recognize(path);
	        if (!matched) {
	          this.replace(this._notFoundRedirect);
	          return true;
	        }
	      }
	    };

	    /**
	     * Match a URL path and set the route context on vm,
	     * triggering view updates.
	     *
	     * @param {String} path
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._match = function _match(path, state, anchor) {
	      var _this3 = this;

	      if (this._checkGuard(path)) {
	        return;
	      }

	      var currentRoute = this._currentRoute;
	      var currentTransition = this._currentTransition;

	      if (currentTransition) {
	        if (currentTransition.to.path === path) {
	          // do nothing if we have an active transition going to the same path
	          return;
	        } else if (currentRoute.path === path) {
	          // We are going to the same path, but we also have an ongoing but
	          // not-yet-validated transition. Abort that transition and reset to
	          // prev transition.
	          currentTransition.aborted = true;
	          this._currentTransition = this._prevTransition;
	          return;
	        } else {
	          // going to a totally different path. abort ongoing transition.
	          currentTransition.aborted = true;
	        }
	      }

	      // construct new route and transition context
	      var route = new Route(path, this);
	      var transition = new RouteTransition(this, route, currentRoute);

	      // current transition is updated right now.
	      // however, current route will only be updated after the transition has
	      // been validated.
	      this._prevTransition = currentTransition;
	      this._currentTransition = transition;

	      if (!this.app) {
	        (function () {
	          // initial render
	          var router = _this3;
	          _this3.app = new _this3._appConstructor({
	            el: _this3._appContainer,
	            created: function created() {
	              this.$router = router;
	            },
	            _meta: {
	              $route: route
	            }
	          });
	        })();
	      }

	      // check global before hook
	      var beforeHooks = this._beforeEachHooks;
	      var startTransition = function startTransition() {
	        transition.start(function () {
	          _this3._postTransition(route, state, anchor);
	        });
	      };

	      if (beforeHooks.length) {
	        transition.runQueue(beforeHooks, function (hook, _, next) {
	          if (transition === _this3._currentTransition) {
	            transition.callHook(hook, null, next, {
	              expectBoolean: true
	            });
	          }
	        }, startTransition);
	      } else {
	        startTransition();
	      }

	      if (!this._rendered && this._startCb) {
	        this._startCb.call(null);
	      }

	      // HACK:
	      // set rendered to true after the transition start, so
	      // that components that are acitvated synchronously know
	      // whether it is the initial render.
	      this._rendered = true;
	    };

	    /**
	     * Set current to the new transition.
	     * This is called by the transition object when the
	     * validation of a route has succeeded.
	     *
	     * @param {Transition} transition
	     */

	    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	      // set current route
	      var route = this._currentRoute = transition.to;
	      // update route context for all children
	      if (this.app.$route !== route) {
	        this.app.$route = route;
	        this._children.forEach(function (child) {
	          child.$route = route;
	        });
	      }
	      // call global after hook
	      if (this._afterEachHooks.length) {
	        this._afterEachHooks.forEach(function (hook) {
	          return hook.call(null, {
	            to: transition.to,
	            from: transition.from
	          });
	        });
	      }
	      this._currentTransition.done = true;
	    };

	    /**
	     * Handle stuff after the transition.
	     *
	     * @param {Route} route
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	      // handle scroll positions
	      // saved scroll positions take priority
	      // then we check if the path has an anchor
	      var pos = state && state.pos;
	      if (pos && this._saveScrollPosition) {
	        Vue.nextTick(function () {
	          window.scrollTo(pos.x, pos.y);
	        });
	      } else if (anchor) {
	        Vue.nextTick(function () {
	          var el = document.getElementById(anchor.slice(1));
	          if (el) {
	            window.scrollTo(window.scrollX, el.offsetTop);
	          }
	        });
	      }
	    };

	    /**
	     * Normalize named route object / string paths into
	     * a string.
	     *
	     * @param {Object|String|Number} path
	     * @return {String}
	     */

	    Router.prototype._stringifyPath = function _stringifyPath(path) {
	      var fullPath = '';
	      if (path && typeof path === 'object') {
	        if (path.name) {
	          var extend = Vue.util.extend;
	          var currentParams = this._currentTransition && this._currentTransition.to.params;
	          var targetParams = path.params || {};
	          var params = currentParams ? extend(extend({}, currentParams), targetParams) : targetParams;
	          if (path.query) {
	            params.queryParams = path.query;
	          }
	          fullPath = this._recognizer.generate(path.name, params);
	        } else if (path.path) {
	          fullPath = path.path;
	          if (path.query) {
	            var query = this._recognizer.generateQueryString(path.query);
	            if (fullPath.indexOf('?') > -1) {
	              fullPath += '&' + query.slice(1);
	            } else {
	              fullPath += query;
	            }
	          }
	        }
	      } else {
	        fullPath = path ? path + '' : '';
	      }
	      return encodeURI(fullPath);
	    };

	    return Router;
	  })();

	  function guardComponent(path, handler) {
	    var comp = handler.component;
	    if (Vue.util.isPlainObject(comp)) {
	      comp = handler.component = Vue.extend(comp);
	    }
	    /* istanbul ignore if */
	    if (typeof comp !== 'function') {
	      handler.component = null;
	      warn('invalid component for route "' + path + '".');
	    }
	  }

	  /* Installation */

	  Router.installed = false;

	  /**
	   * Installation interface.
	   * Install the necessary directives.
	   */

	  Router.install = function (externalVue) {
	    /* istanbul ignore if */
	    if (Router.installed) {
	      warn('already installed.');
	      return;
	    }
	    Vue = externalVue;
	    applyOverride(Vue);
	    View(Vue);
	    Link(Vue);
	    exports$1.Vue = Vue;
	    Router.installed = true;
	  };

	  // auto install
	  /* istanbul ignore if */
	  if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(Router);
	  }

	  return Router;

	}));

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.error = exports.success = exports.open = undefined;

	var _getIterator2 = __webpack_require__(16);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(54);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(55);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by bqxu on 16/3/20.
	 */
	var tools = __webpack_require__(12);
	var Vue = __webpack_require__(1);
	var x = __webpack_require__(58);

	var dialogTemplate = [];
	dialogTemplate.push('<div class="i-modal {{dialogClass}}" id="{{dialogId}}">');
	dialogTemplate.push('<div class="i-modal-dialog" >');
	dialogTemplate.push('<div class="i-modal-hd">');
	dialogTemplate.push('{{dialogTitle}}');
	dialogTemplate.push('<a href="javascript: void(0)" class="am-close am-close-spin" v-on:click="close">&times;</a>');
	dialogTemplate.push('</div>');
	dialogTemplate.push('<div class="i-modal-bd">');
	dialogTemplate.push('<dialog_content v-ref:content></dialog_content>');
	dialogTemplate.push('</div>');
	dialogTemplate.push('<div class="i-modal-footer" id="{{dialogId}}-btn" v-if="showBtn">');
	dialogTemplate.push('</div>');
	dialogTemplate.push('</div>');
	dialogTemplate.push('</div>');

	var VueDialog = Vue.extend({
	  template: dialogTemplate.join('')
	});

	var VueDialogBtn = Vue.extend({
	  template: '<span class="am-modal-btn {{className}}" v-on:click="btnClick" >{{text}}</span>'
	});

	var DialogStore = function () {
	  function DialogStore() {
	    (0, _classCallCheck3.default)(this, DialogStore);

	    this.store = [];
	  }

	  (0, _createClass3.default)(DialogStore, [{
	    key: 'push',
	    value: function push($dialog) {
	      this.store.push({
	        id: $dialog.id,
	        dialog: $dialog
	      });
	      this.watchModal();
	    }
	  }, {
	    key: 'pop',
	    value: function pop($id) {
	      var index = this.store.findIndex(function (_ref) {
	        var id = _ref.id;

	        return id == $id;
	      });
	      if (index > -1) {
	        this.store.splice(index, 1);
	      }
	      this.watchModal();
	    }
	  }, {
	    key: 'watchModal',
	    value: function watchModal() {
	      var dialogModal = document.getElementById('vue-ui-dialog-modal');
	      var className = dialogModal.className;
	      className = className.split(' ');
	      var index = className.findIndex(function (n) {
	        return n == 'am-active';
	      });
	      if (index > -1) {
	        className.splice(index, 1);
	      }
	      if (this.store.length > 0) {
	        className.push('am-active');
	        dialogModal.style.display = 'block';
	      } else {
	        dialogModal.style.display = 'none';
	      }
	      dialogModal.className = className.join(' ');
	    }
	  }]);
	  return DialogStore;
	}();

	window.dialogStore = window.dialogStore || new DialogStore();

	var Dialog = function () {
	  function Dialog(dialogVue, _ref2) {
	    var id = _ref2.id;
	    var _ref2$buttons = _ref2.buttons;
	    var buttons = _ref2$buttons === undefined ? [] : _ref2$buttons;
	    var onClose = _ref2.onClose;
	    var title = _ref2.title;
	    var dialogClass = _ref2.dialogClass;
	    (0, _classCallCheck3.default)(this, Dialog);

	    this.id = id;
	    var $this = this;
	    this.vueDialog = new VueDialog({
	      components: {
	        "dialog_content": dialogVue
	      },
	      data: function data() {
	        var classArr = [];
	        classArr.push(buttons.length > 0 ? 'i-modal-confirm' : 'i-modal-no-btn');
	        classArr.push(dialogClass);
	        return {
	          dialogId: id,
	          dialogTitle: title,
	          showBtn: buttons.length > 0,
	          dialogClass: classArr.join(' ')
	        };
	      },

	      methods: {
	        close: function close() {
	          if (typeof onClose == 'function') {
	            if (onClose($this.vueDialog, $this, id)) {
	              $this.close();
	            }
	          } else {
	            $this.close();
	          }
	        }
	      },
	      ready: function ready() {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          var _loop = function _loop() {
	            var _step$value = _step.value;
	            var text = _step$value.text;
	            var click = _step$value.click;
	            var _step$value$className = _step$value.className;
	            var className = _step$value$className === undefined ? '' : _step$value$className;

	            var dialogBtn = new VueDialogBtn({
	              data: function data() {
	                return {
	                  text: text, className: className
	                };
	              },

	              methods: {
	                btnClick: function btnClick() {
	                  click && click($this.vueDialog, $this, id);
	                }
	              }
	            });
	            dialogBtn.$mount().$appendTo('#' + id + '-btn');
	          };

	          for (var _iterator = (0, _getIterator3.default)(buttons), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            _loop();
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }
	    });
	    this.vueDialog.$mount().$appendTo('#vue-ui-home');
	    this.show();
	  }

	  (0, _createClass3.default)(Dialog, [{
	    key: 'show',
	    value: function show() {
	      var $this = this;
	      this.css(this.vueDialog.$el, {
	        opacity: 1,
	        display: 'block'
	      });
	      window.addEventListener('resize', function () {
	        $this.lockWindow($this.id);
	      });

	      $this.lockWindow($this.id);

	      window.dialogStore.push($this);
	    }
	  }, {
	    key: 'css',
	    value: function css(target, styles) {
	      for (var key in styles) {
	        target.style[key] = styles[key];
	      }
	    }
	  }, {
	    key: 'lockWindow',
	    value: function lockWindow(id) {
	      var target = document.getElementById(id);
	      var winWidth = window.innerWidth || document.body.clientWidth || 0;
	      var winHeight = window.innerHeight || document.body.clientHeight || 0;
	      var tWidth = target.offsetWidth || 0;
	      var tHeight = target.offsetHeight || 0;
	      var left = (winWidth - tWidth) / 2;
	      var top = (winHeight - tHeight) / 2;
	      if (left < 0) {
	        left = 0;
	      }
	      if (top < 0) {
	        top = 0;
	      }
	      this.css(target, {
	        position: 'fixed',
	        left: parseInt(left) + 'px',
	        top: parseInt(top) + 'px'
	      });
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.vueDialog.$destroy(true);
	      window.dialogStore.pop(this.id);
	    }
	  }]);
	  return Dialog;
	}();

	var dialogModal = [];
	dialogModal.push('<div class="am-dimmer" id="vue-ui-dialog-modal">');
	dialogModal.push('</div>');
	if (!document.getElementById('vue-ui-home')) {
	  var uiHome = document.createElement('div');
	  uiHome.style.width = 0;
	  uiHome.style.height = 0;
	  uiHome.id = 'vue-ui-home';
	  uiHome.innerHTML = dialogModal.join('');
	  var l = document.body.childNodes.length;
	  document.body.insertBefore(uiHome, document.body.childNodes[l - 1]);
	}

	var open = exports.open = function open(dialogVue) {
	  var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var id = _ref3.id;
	  var buttons = _ref3.buttons;
	  var onSuccess = _ref3.onSuccess;
	  var onCancel = _ref3.onCancel;
	  var title = _ref3.title;
	  var onClose = _ref3.onClose;
	  var dialogClass = _ref3.dialogClass;

	  if (!id) {
	    id = tools.getEUID(10);
	  }
	  if (!buttons) {
	    buttons = [];
	    buttons.push({
	      text: '取消',
	      click: function click(content, $this, id) {
	        if (typeof onCancel == 'function') {
	          if (onCancel(content, $this, id)) {
	            $this.close();
	          }
	        } else {
	          $this.close();
	        }
	      }
	    });
	    buttons.push({
	      text: '确定',
	      click: function click(content, $this, id) {
	        if (typeof onSuccess == 'function') {
	          if (onSuccess(content, $this, id)) {
	            $this.close();
	          }
	        } else {
	          $this.close();
	        }
	      }
	    });
	  }
	  return new Dialog(dialogVue, { id: id, buttons: buttons, title: title, onClose: onClose, dialogClass: dialogClass });
	};

	var DialogMsg = Vue.extend({
	  template: '<div>{{dialogMsg}}</div>'
	});

	var success = exports.success = function success(msg, onclick) {
	  var dialogMsg = DialogMsg.extend({
	    data: function data() {
	      return { dialogMsg: msg };
	    }
	  });
	  return open(dialogMsg, {
	    buttons: [{
	      text: '确定',
	      click: function click(content, $this, id) {
	        if (typeof onclick == 'function') {
	          if (onclick(content, $this, id)) {
	            $this.close();
	          }
	        } else {
	          $this.close();
	        }
	      }
	    }]
	  });
	};

	var error = exports.error = function error(msg) {
	  var dialogMsg = DialogMsg.extend({
	    data: function data() {
	      return { dialogMsg: msg };
	    }
	  });
	  return open(dialogMsg, { buttons: [] });
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(17), __esModule: true };

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(18);
	__webpack_require__(46);
	module.exports = __webpack_require__(49);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(19);
	var Iterators = __webpack_require__(22);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(20)
	  , step             = __webpack_require__(21)
	  , Iterators        = __webpack_require__(22)
	  , toIObject        = __webpack_require__(23);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(27)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(24)
	  , defined = __webpack_require__(26);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(25);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(28)
	  , $export        = __webpack_require__(29)
	  , redefine       = __webpack_require__(34)
	  , hide           = __webpack_require__(35)
	  , has            = __webpack_require__(40)
	  , Iterators      = __webpack_require__(22)
	  , $iterCreate    = __webpack_require__(41)
	  , setToStringTag = __webpack_require__(42)
	  , getProto       = __webpack_require__(36).getProto
	  , ITERATOR       = __webpack_require__(43)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(30)
	  , core      = __webpack_require__(31)
	  , ctx       = __webpack_require__(32)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 30 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 31 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(33);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(35);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(36)
	  , createDesc = __webpack_require__(37);
	module.exports = __webpack_require__(38) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(39)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(36)
	  , descriptor     = __webpack_require__(37)
	  , setToStringTag = __webpack_require__(42)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(35)(IteratorPrototype, __webpack_require__(43)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(36).setDesc
	  , has = __webpack_require__(40)
	  , TAG = __webpack_require__(43)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(44)('wks')
	  , uid    = __webpack_require__(45)
	  , Symbol = __webpack_require__(30).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(30)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(47)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(27)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(48)
	  , defined   = __webpack_require__(26);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(50)
	  , get      = __webpack_require__(52);
	module.exports = __webpack_require__(31).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(51);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(53)
	  , ITERATOR  = __webpack_require__(43)('iterator')
	  , Iterators = __webpack_require__(22);
	module.exports = __webpack_require__(31).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(25)
	  , TAG = __webpack_require__(43)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(56);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(36);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(59);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(61)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/less-loader/index.js!./dialog.less", function() {
				var newContent = require("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/less-loader/index.js!./dialog.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(60)();
	// imports


	// module
	exports.push([module.id, ".i-modal {\n  z-index: 1101;\n}\n.i-dialog-max {\n  width: 960px;\n}\n.i-dialog-max .i-modal-bd {\n  min-height: 460px;\n}\n.i-modal-dialog {\n  border-radius: 0;\n  background: #f8f8f8;\n}\n.i-modal-hd {\n  padding: 15px 10px 5px;\n  font-size: 1.8rem;\n}\n.i-modal-hd + .am-modal-bd {\n  padding-top: 0;\n}\n.i-modal-hd .am-close {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n}\n.i-modal-bd {\n  padding: 15px 10px;\n  text-align: center;\n  border-bottom: 1px solid #dedede;\n  border-radius: 2px 2px 0 0;\n}\n.i-modal-bd + .am-modal-bd {\n  margin-top: 5px;\n}\n.i-modal-footer {\n  height: 44px;\n  overflow: hidden;\n  display: table;\n  width: 100%;\n  border-collapse: collapse;\n}\n.i-modal-btn {\n  display: table-cell !important;\n  padding: 0 5px;\n  height: 44px;\n  -webkit-box-sizing: border-box !important;\n  box-sizing: border-box !important;\n  font-size: 1.6rem;\n  line-height: 44px;\n  text-align: center;\n  color: #0e90d2;\n  word-wrap: normal;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  cursor: pointer;\n  border-right: 1px solid #dedede;\n}\n.i-modal-btn:first-child {\n  border-radius: 0;\n}\n.i-modal-btn:last-child {\n  border-right: none;\n  border-radius: 0;\n}\n.i-modal-btn:first-child:last-child {\n  border-radius: 0;\n}\n.i-modal-btn:active {\n  background: #d4d4d4;\n}\n.i-modal-btn + .i-modal-btn {\n  border-left: 1px solid #dedede;\n}\n.i-modal-no-btn .i-modal-dialog {\n  border-radius: 0;\n  border-bottom: none;\n}\n.i-modal-no-btn .i-modal-bd {\n  border-bottom: none;\n}\n.i-modal-no-btn .i-modal-footer {\n  display: none;\n}\n.i-modal-loading .i-modal-bd {\n  border-bottom: none;\n}\n", ""]);

	// exports


/***/ },
/* 60 */,
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(92)
	__vue_template__ = __webpack_require__(100)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <component :is="currentView"></component>
	//   <section>
	//     <router-view></router-view>
	//   </section>
	// </template>
	// <script>
	exports.default = {
	  components: {
	    home: __webpack_require__(93),
	    admin: __webpack_require__(96)
	  },
	  data: function data() {
	    var currentView = 'home';
	    if (this.$config.module == 'admin') {
	      currentView = 'admin';
	    }
	    return {
	      userInfo: this.userInfo,
	      currentView: currentView
	    };
	  },

	  route: {
	    data: function data(transition) {
	      this.userInfo = this.$tools.getUserInfo();
	    }
	  }
	};
	// </script>
	//

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(94)
	__vue_template__ = __webpack_require__(95)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 94 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
	//   <header class="am-topbar" id="topbar">
	//     <div class="am-container">
	//       <h1 class="am-topbar-brand">
	//         <a href="/">合生账号</a>
	//       </h1>
	//       <a href="/admin" style="float:right;line-height: 36px">我是管理员</a>
	//     </div>
	//   </header>
	// </template>
	// <script>
	exports.default = {
	  created: function created() {
	    this.userInfo = this.userInfo || {};
	  },

	  props: ["userInfo"],
	  methods: {
	    logout: function logout() {
	      this.$http.post(this.$tools.resolveUrl("/Users/logout"), function (data, status, request) {
	        this.$auth.loginOut();
	        this.$dispatch('link', "login");
	      });
	    }
	  }
	};
	// </script>
	//

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = "\n  <header class=\"am-topbar\" id=\"topbar\">\n    <div class=\"am-container\">\n      <h1 class=\"am-topbar-brand\">\n        <a href=\"/\">合生账号</a>\n      </h1>\n      <a href=\"/admin\" style=\"float:right;line-height: 36px\">我是管理员</a>\n    </div>\n  </header>\n";

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(97)
	__vue_script__ = __webpack_require__(98)
	__vue_template__ = __webpack_require__(99)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 97 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 98 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
	//   <header class="am-topbar" id="topbar">
	//     <div class="am-container">
	//       <ul class="am-nav  am-nav-pills">
	//         <li v-link="{name: 'home',activeClass:''}">
	//           <a>合生账号</a>
	//         </li>
	//         <li v-link="{name: 'user',activeClass:'am-active'}">
	//           <a>用户管理</a>
	//         </li>
	//         <li v-link="{name: 'app',activeClass:'am-active'}">
	//           <a>应用管理</a>
	//         </li>
	//         <li style="float: right">
	//           <a href="/">个人中心</a>
	//         </li>
	//       </ul>
	//     </div>
	//   </header>
	// </template>
	// <style lang="less">
	//   .am-topbar .am-nav-pills {
	//     border: none;
	//
	//   }
	//
	//   .am-topbar .am-nav-pills li {
	//     line-height: 36px;
	//   }
	//
	// </style>
	// <script>
	exports.default = {
	  created: function created() {
	    this.userInfo = this.userInfo || {};
	  },

	  props: ["userInfo"],
	  methods: {
	    logout: function logout() {
	      this.$http.post(this.$tools.resolveUrl("/Users/logout"), function (data, status, request) {
	        this.$auth.loginOut();
	        this.$dispatch('link', "login");
	      });
	    }
	  }
	};
	// </script>
	//

/***/ },
/* 99 */
/***/ function(module, exports) {

	module.exports = "\n  <header class=\"am-topbar\" id=\"topbar\">\n    <div class=\"am-container\">\n      <ul class=\"am-nav  am-nav-pills\">\n        <li v-link=\"{name: 'home',activeClass:''}\">\n          <a>合生账号</a>\n        </li>\n        <li v-link=\"{name: 'user',activeClass:'am-active'}\">\n          <a>用户管理</a>\n        </li>\n        <li v-link=\"{name: 'app',activeClass:'am-active'}\">\n          <a>应用管理</a>\n        </li>\n        <li style=\"float: right\">\n          <a href=\"/\">个人中心</a>\n        </li>\n      </ul>\n    </div>\n  </header>\n";

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = "\n  <component :is=\"currentView\"></component>\n  <section>\n    <router-view></router-view>\n  </section>\n";

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(102)
	__vue_script__ = __webpack_require__(103)
	__vue_template__ = __webpack_require__(104)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 102 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 103 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="am-g am-g-fixed" id="bd-warp">
	//     <div class="am-u-md-10 am-u-md-push-1 doc-content">
	//       <section>
	//         <router-view>
	//
	//         </router-view>
	//       </section>
	//     </div>
	//   </div>
	// </template>
	// <style>
	//   #bd-warp {
	//     min-width: 1000px;
	//   }
	// </style>
	// <script>
	exports.default = {
	  compiled: function compiled() {},
	  data: function data() {
	    return {
	      moduleName: this.moduleName
	    };
	  },

	  route: {
	    data: function data(transition) {
	      var to = transition.to;
	      if (to.matched && to.matched[1]) {
	        this.moduleName = transition.to.matched[1].handler.name;
	      }
	    }
	  }
	};
	// </script>
	//

/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"am-g am-g-fixed\" id=\"bd-warp\">\n    <div class=\"am-u-md-10 am-u-md-push-1 doc-content\">\n      <section>\n        <router-view>\n\n        </router-view>\n      </section>\n    </div>\n  </div>\n";

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(106)
	__vue_script__ = __webpack_require__(107)
	__vue_template__ = __webpack_require__(108)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 106 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 107 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	//   <div class="am-panel am-panel-default">
	//     <div class="am-panel-hd">
	//       <h3 class="am-panel-title">
	//         系统信息
	//       </h3>
	//     </div>
	//     <div class="am-panel-bd">
	//       <div class="am-g">
	//         <div class="am-u-md-10 am-u-end">
	//           用户数:x; <a v-on:click="link('user-add')">新增</a><br>
	//           应用数:y; <a v-on:click="link('app-add')">新增</a><br>
	//         </div>
	//       </div>
	//     </div>
	//   </div>
	//   <div class="am-panel am-panel-default">
	//     <div class="am-panel-hd">
	//       <h3 class="am-panel-title">
	//         xxx应用
	//       </h3>
	//     </div>
	//     <div class="am-panel-bd">
	//       用户数,<br>
	//       管理员,<br>
	//       本周登录次数,<br>
	//     </div>
	//   </div>
	// </template>
	// <style lang='less'>
	//   .admin-keep {
	//
	//   }
	// </style>
	// <script type="text/javascript">
	exports.default = {
	  date: function date() {
	    return {};
	  },
	  ready: function ready() {},

	  methods: {
	    link: function link(pathName, params) {
	      var $this = this;
	      $this.$dispatch('link', pathName, params);
	    }
	  },

	  attached: function attached() {}
	};
	// </script>
	//

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"am-panel am-panel-default\">\n    <div class=\"am-panel-hd\">\n      <h3 class=\"am-panel-title\">\n        系统信息\n      </h3>\n    </div>\n    <div class=\"am-panel-bd\">\n      <div class=\"am-g\">\n        <div class=\"am-u-md-10 am-u-end\">\n          用户数:x; <a v-on:click=\"link('user-add')\">新增</a><br>\n          应用数:y; <a v-on:click=\"link('app-add')\">新增</a><br>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"am-panel am-panel-default\">\n    <div class=\"am-panel-hd\">\n      <h3 class=\"am-panel-title\">\n        xxx应用\n      </h3>\n    </div>\n    <div class=\"am-panel-bd\">\n      用户数,<br>\n      管理员,<br>\n      本周登录次数,<br>\n    </div>\n  </div>\n";

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(110)
	__vue_script__ = __webpack_require__(111)
	__vue_template__ = __webpack_require__(112)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 110 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 111 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	//   <div class="am-panel am-panel-default">
	//     <div class="am-panel-hd">
	//       <h3 class="am-panel-title">
	//         用户列表
	//       </h3>
	//     </div>
	//     <div class="am-panel-bd">
	//       <div class="am-btn-toolbar">
	//         <div class="am-btn-group">
	//           <div class="am-btn am-btn-default" v-on:click="link('user-add')">
	//             新增
	//           </div>
	//         </div>
	//       </div>
	//       <div class="am-panel-bd">
	//         <i_table
	//           v-on:table-click="optionInfo"
	//           v-ref:table
	//         ></i_table>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	// <style lang='less'>
	//
	// </style>
	// <script type="text/javascript">
	exports.default = {
	  methods: {
	    link: function link(pathName, params) {
	      this.$dispatch('link', pathName, params);
	    },
	    optionInfo: function optionInfo() {}
	  },
	  ready: function ready() {
	    this.$refs.table.dataList = [];
	  },
	  created: function created(argument) {},
	  attached: function attached() {
	    var $this = this;
	    $this.$http.get($this.$tools.resolveUrl("/AuthUsers"), {
	      filter: {
	        where: {
	          state: 1
	        }
	      }
	    }, function (res, ste, req) {
	      $this.$refs.table.dataList = res;
	    });
	  },

	  compiled: function compiled() {
	    var $this = this;
	    $this.$refs.table.pk = 'id';
	    $this.$refs.table.checkbox = [];
	    $this.$refs.table.titleList = [{
	      id: "loginName",
	      text: "登录名"
	    }, {
	      id: "realName",
	      text: "真实姓名"
	    }, {
	      id: "sex",
	      text: "性别",
	      render: function render(el, attr, index) {
	        if (attr == 0) {
	          return '男';
	        } else {
	          return '女';
	        }
	      }
	    }, {
	      id: "birthday",
	      text: "出生日期"
	    }, {
	      id: "email",
	      text: "邮箱"
	    }, {
	      id: "telephone",
	      text: "电话"
	    }, {
	      id: "enable",
	      text: "状态",
	      render: function render(el, attr, index) {
	        if (attr == 0) {
	          return '禁用';
	        } else {
	          return '启用';
	        }
	      }
	    }];
	    $this.$refs.table.optionList = [{
	      className: 'am-btn-sm',
	      id: "in",
	      render: function render(el, index) {
	        if (el.enable == 0) {
	          return "启用";
	        } else {
	          return "禁用";
	        }
	      }
	    }];
	  }
	};

	// </script>
	//

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"am-panel am-panel-default\">\n    <div class=\"am-panel-hd\">\n      <h3 class=\"am-panel-title\">\n        用户列表\n      </h3>\n    </div>\n    <div class=\"am-panel-bd\">\n      <div class=\"am-btn-toolbar\">\n        <div class=\"am-btn-group\">\n          <div class=\"am-btn am-btn-default\" v-on:click=\"link('user-add')\">\n            新增\n          </div>\n        </div>\n      </div>\n      <div class=\"am-panel-bd\">\n        <i_table\n          v-on:table-click=\"optionInfo\"\n          v-ref:table\n        ></i_table>\n      </div>\n    </div>\n  </div>\n";

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(114)
	__vue_script__ = __webpack_require__(115)
	__vue_template__ = __webpack_require__(116)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 114 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 115 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	//   <div class='am-container'>
	//     <div class="am-panel am-panel-default">
	//
	//       <div class="am-panel-hd">
	//         <h3 class="am-panel-title">
	//           添加用户
	//         </h3>
	//       </div>
	//       <div class="am-panel-bd">
	//         <form class="am-form am-form-horizontal"
	//               v-on:submit.prevent="submitForm"
	//               v-on:reset.prevent="reset">
	//           <fieldset>
	//             <legend>用户信息</legend>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">登陆名</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="text" v-model="userInfo.loginName" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">用户名</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="text" v-model="userInfo.userName" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">真实姓名</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="text" v-model="userInfo.realName" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">邮箱</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="email" v-model="userInfo.email" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">电话</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="text" v-model="userInfo.telephone" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">出生日期</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="date" v-model="userInfo.birthday" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">联系地址</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="text" v-model="userInfo.address" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">性别</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <i_radio
	//                   v-bind:item-list="sexList"
	//                   v-bind:choose.sync="userInfo.sex"
	//                   sid="sid"
	//                   text="name"
	//                 ></i_radio>
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <div class="am-u-sm-10 am-u-sm-offset-2">
	//                 <button type="submit" class="am-btn am-btn-default">提交</button>
	//                 <button type="reset" class="am-btn am-btn-default">取消&返回</button>
	//               </div>
	//             </div>
	//           </fieldset>
	//         </form>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	// <style lang='less'>
	//
	// </style>
	// <script type="text/javascript">
	exports.default = {
	  route: {
	    canReuse: function canReuse(transition) {
	      return false;
	    }
	  },
	  data: function data() {
	    return {
	      sexList: [{
	        sid: '0',
	        name: '男'
	      }, {
	        sid: '1',
	        name: '女'
	      }],
	      userInfo: {}
	    };
	  },
	  ready: function ready() {},

	  methods: {
	    submitForm: function submitForm() {
	      var $this = this;
	      this.$http.post(this.$tools.resolveUrl("/AuthUsers"), {
	        loginName: this.userInfo.loginName,
	        realName: this.userInfo.realName,
	        userName: this.userInfo.userName,
	        email: this.userInfo.email,
	        sex: this.userInfo.sex,
	        address: this.userInfo.address,
	        birthday: this.userInfo.birthday,
	        telephone: this.userInfo.telephone
	      }, function (res, ste, req) {
	        this.$dispatch('link', 'user');
	      }).error(function () {
	        $this.$dialog.error('请稍后重试!');
	      });
	    },
	    reset: function reset() {
	      this.$dispatch('link', 'user');
	      this.userInfo = {};
	    }
	  },
	  attached: function attached() {}
	};
	// </script>
	//

/***/ },
/* 116 */
/***/ function(module, exports) {

	module.exports = "\n  <div class='am-container'>\n    <div class=\"am-panel am-panel-default\">\n\n      <div class=\"am-panel-hd\">\n        <h3 class=\"am-panel-title\">\n          添加用户\n        </h3>\n      </div>\n      <div class=\"am-panel-bd\">\n        <form class=\"am-form am-form-horizontal\"\n              v-on:submit.prevent=\"submitForm\"\n              v-on:reset.prevent=\"reset\">\n          <fieldset>\n            <legend>用户信息</legend>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">登陆名</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"text\" v-model=\"userInfo.loginName\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">用户名</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"text\" v-model=\"userInfo.userName\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">真实姓名</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"text\" v-model=\"userInfo.realName\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">邮箱</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"email\" v-model=\"userInfo.email\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">电话</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"text\" v-model=\"userInfo.telephone\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">出生日期</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"date\" v-model=\"userInfo.birthday\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">联系地址</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"text\" v-model=\"userInfo.address\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">性别</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <i_radio\n                  v-bind:item-list=\"sexList\"\n                  v-bind:choose.sync=\"userInfo.sex\"\n                  sid=\"sid\"\n                  text=\"name\"\n                ></i_radio>\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <div class=\"am-u-sm-10 am-u-sm-offset-2\">\n                <button type=\"submit\" class=\"am-btn am-btn-default\">提交</button>\n                <button type=\"reset\" class=\"am-btn am-btn-default\">取消&返回</button>\n              </div>\n            </div>\n          </fieldset>\n        </form>\n      </div>\n    </div>\n  </div>\n";

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(118)
	__vue_script__ = __webpack_require__(119)
	__vue_template__ = __webpack_require__(122)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 118 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(120);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	//   <div class="am-panel am-panel-default">
	//     <div class="am-panel-hd">
	//       <h3 class="am-panel-title">
	//         应用列表
	//       </h3>
	//     </div>
	//     <div class="am-panel-bd">
	//       <div class="am-btn-toolbar">
	//         <div class="am-btn-group">
	//           <div class="am-btn am-btn-default" v-on:click="link('app-add')">
	//             新增
	//           </div>
	//           <div class="am-btn am-btn-default"
	//                v-bind:class="[$refs.table.checkbox.length==1?'':'am-disabled']"
	//                v-on:click="groupCtl()">
	//             分组管理
	//           </div>
	//           <div class="am-btn am-btn-default"
	//                v-bind:class="[$refs.table.checkbox.length==1?'':'am-disabled']"
	//                v-on:click="userCtl()">
	//             用户管理
	//           </div>
	//         </div>
	//       </div>
	//       <div class="am-panel-bd">
	//         <i_table
	//           v-on:table-click="optionInfo"
	//           v-ref:table
	//         ></i_table>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	// <style lang='less'>
	//
	// </style>
	// <script type="text/javascript">
	module.exports = {
	  data: function data() {},
	  methods: {
	    link: function link(pathName, params) {
	      var $this = this;
	      $this.$dispatch('link', pathName, params);
	    },
	    optionInfo: function optionInfo() {},
	    groupCtl: function groupCtl() {
	      var $index = this.$refs.table.checkbox[0];
	      var data = JSON.parse((0, _stringify2.default)(this.$refs.table.dataList[$index]));
	      this.$dispatch('link', 'app-group', {
	        appId: data.id
	      });
	    },
	    userCtl: function userCtl() {
	      var $index = this.$refs.table.checkbox[0];
	      var data = JSON.parse((0, _stringify2.default)(this.$refs.table.dataList[$index]));
	      this.$dispatch('link', 'app-user', {
	        appId: data.id
	      });
	    }
	  },
	  ready: function ready() {
	    var $this = this;
	    $this.$refs.table.dataList = [];
	  },
	  created: function created(argument) {},
	  attached: function attached() {
	    var $this = this;
	    $this.$http.get($this.$tools.resolveUrl("/AuthApps"), {
	      filter: {
	        where: {
	          state: 1
	        }
	      }
	    }, function (res, ste, req) {
	      $this.$refs.table.dataList = res;
	    });
	  },
	  compiled: function compiled() {
	    var $this = this;
	    $this.$refs.table.pk = 'id';
	    $this.$refs.table.checkbox = [];
	    $this.$refs.table.titleList = [{
	      id: "appName",
	      text: "应用名称"
	    }, {
	      id: "siteUrl",
	      text: "站点地址"
	    }, {
	      id: "siteIp",
	      text: "IP地址"
	    }, {
	      id: "appToken",
	      text: "token",
	      render: function render(el, attr, i) {
	        return attr;
	      }
	    }];
	    $this.$refs.table.optionList = [{
	      className: 'am-btn-sm',
	      id: "in",
	      render: function render(el, index) {
	        if (el.enable == 0) {
	          return "启用";
	        } else {
	          return "禁用";
	        }
	      }
	    }];
	  }
	};

	// </script>
	//

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(31);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"am-panel am-panel-default\">\n    <div class=\"am-panel-hd\">\n      <h3 class=\"am-panel-title\">\n        应用列表\n      </h3>\n    </div>\n    <div class=\"am-panel-bd\">\n      <div class=\"am-btn-toolbar\">\n        <div class=\"am-btn-group\">\n          <div class=\"am-btn am-btn-default\" v-on:click=\"link('app-add')\">\n            新增\n          </div>\n          <div class=\"am-btn am-btn-default\"\n               v-bind:class=\"[$refs.table.checkbox.length==1?'':'am-disabled']\"\n               v-on:click=\"groupCtl()\">\n            分组管理\n          </div>\n          <div class=\"am-btn am-btn-default\"\n               v-bind:class=\"[$refs.table.checkbox.length==1?'':'am-disabled']\"\n               v-on:click=\"userCtl()\">\n            用户管理\n          </div>\n        </div>\n      </div>\n      <div class=\"am-panel-bd\">\n        <i_table\n          v-on:table-click=\"optionInfo\"\n          v-ref:table\n        ></i_table>\n      </div>\n    </div>\n  </div>\n";

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(124)
	__vue_script__ = __webpack_require__(125)
	__vue_template__ = __webpack_require__(126)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 124 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 125 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	//   <div class='am-container'>
	//     <div class="am-panel am-panel-default">
	//
	//       <div class="am-panel-hd">
	//         <h3 class="am-panel-title">
	//           添加应用
	//         </h3>
	//       </div>
	//       <div class="am-panel-bd">
	//         <form class="am-form am-form-horizontal"
	//               v-on:submit.prevent="submitForm"
	//               v-on:reset.prevent="reset">
	//           <fieldset>
	//             <legend>应用信息</legend>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">应用名称</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="text" v-model="appInfo.appName" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">站点地址</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="text" v-model="appInfo.siteUrl" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">IP地址</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="text" v-model="appInfo.siteIp" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <div class="am-u-sm-10 am-u-sm-offset-2">
	//                 <button type="submit" class="am-btn am-btn-default">提交</button>
	//                 <button type="reset" class="am-btn am-btn-default">取消&返回</button>
	//               </div>
	//             </div>
	//           </fieldset>
	//         </form>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	// <style lang='less'>
	//
	// </style>
	// <script type="text/javascript">
	exports.default = {
	  data: function data() {
	    return {
	      appInfo: {}
	    };
	  },
	  ready: function ready() {},

	  methods: {
	    submitForm: function submitForm() {
	      this.$http.post(this.$tools.resolveUrl("/AuthApps/insert"), {
	        appName: this.appInfo.appName,
	        siteUrl: this.appInfo.siteUrl,
	        siteIp: this.appInfo.siteIp
	      }, function (res, ste, req) {
	        this.$dispatch('link', 'app');
	      }).error(function () {});
	    },
	    reset: function reset() {
	      this.$dispatch('link', 'app');
	    }
	  },
	  attached: function attached() {}
	};
	// </script>
	//

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = "\n  <div class='am-container'>\n    <div class=\"am-panel am-panel-default\">\n\n      <div class=\"am-panel-hd\">\n        <h3 class=\"am-panel-title\">\n          添加应用\n        </h3>\n      </div>\n      <div class=\"am-panel-bd\">\n        <form class=\"am-form am-form-horizontal\"\n              v-on:submit.prevent=\"submitForm\"\n              v-on:reset.prevent=\"reset\">\n          <fieldset>\n            <legend>应用信息</legend>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">应用名称</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"text\" v-model=\"appInfo.appName\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">站点地址</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"text\" v-model=\"appInfo.siteUrl\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">IP地址</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"text\" v-model=\"appInfo.siteIp\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <div class=\"am-u-sm-10 am-u-sm-offset-2\">\n                <button type=\"submit\" class=\"am-btn am-btn-default\">提交</button>\n                <button type=\"reset\" class=\"am-btn am-btn-default\">取消&返回</button>\n              </div>\n            </div>\n          </fieldset>\n        </form>\n      </div>\n    </div>\n  </div>\n";

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(128)
	__vue_script__ = __webpack_require__(129)
	__vue_template__ = __webpack_require__(133)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 128 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(16);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	//   <div class="am-panel am-panel-default">
	//     <div class="am-panel-hd">
	//       <h3 class="am-panel-title">
	//         用户列表
	//       </h3>
	//     </div>
	//     <div class="am-panel-bd">
	//       <div class="am-btn-toolbar">
	//         <div class="am-btn-group">
	//           <div class="am-btn am-btn-default" v-on:click="appUserSelect()">
	//             导入用户
	//           </div>
	//         </div>
	//       </div>
	//       <div class="am-panel-bd">
	//         <i_table
	//           v-on:table-click="optionInfo"
	//           v-ref:table
	//         ></i_table>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	// <style lang='less'>
	//
	// </style>
	// <script type="text/javascript">
	exports.default = {
	  data: function data() {
	    return {
	      appId: this.$route.params.appId
	    };
	  },

	  events: {
	    refresh: function refresh() {
	      var $this = this;
	      $this.$http.get($this.$tools.resolveUrl("/AuthAppUsers"), {
	        filter: {
	          where: {
	            state: 1,
	            appId: $this.appId
	          },
	          include: 'user'
	        }
	      }, function (res, ste, req) {
	        $this.$refs.table.dataList = res;
	      });
	    }
	  },
	  methods: {
	    link: function link(pathName, params) {
	      this.$dispatch('link', pathName, params);
	    },
	    optionInfo: function optionInfo() {},
	    appUserSelect: function appUserSelect() {
	      var $this = this;
	      var VueUser = __webpack_require__(130);
	      var dialog = this.$dialog.open(VueUser, {
	        title: '导入用户到分组',
	        dialogClass: 'i-dialog-max',
	        onSuccess: function onSuccess(content, $dialog, id) {
	          var $table = content.$refs.content.$refs.table;
	          var dataList = $table.dataList;
	          var checkbox = $table.checkbox;
	          if (checkbox.length == 0) {
	            return true;
	          }
	          var userIds = [];
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;

	          try {
	            for (var _iterator = (0, _getIterator3.default)(checkbox), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var cb = _step.value;

	              userIds.push(dataList[cb].id);
	            }
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }

	          $this.$http.post($this.$tools.resolveUrl('/AuthAppUsers/bind'), {
	            appId: $this.appId,
	            userIds: userIds
	          }, function (res, ste, req) {
	            dialog.close();
	            $this.$dispatch('refresh');
	          }).error(function (err) {
	            $this.$dialog.error('请稍后重试!');
	          });
	          return false;
	        }
	      });
	    }
	  },
	  ready: function ready() {
	    this.$refs.table.dataList = [];
	  },
	  created: function created(argument) {},
	  attached: function attached() {
	    this.$dispatch('refresh');
	  },

	  compiled: function compiled() {
	    var $this = this;
	    $this.$refs.table.pk = 'id';
	    $this.$refs.table.checkbox = [];
	    $this.$refs.table.titleList = [{
	      id: "user",
	      text: "登录名",
	      render: function render(el, attr, index) {
	        return attr.loginName;
	      }
	    }, {
	      id: "user",
	      text: "真实姓名",
	      render: function render(el, attr, index) {
	        return attr.realName;
	      }
	    }, {
	      id: "user",
	      text: "性别",
	      render: function render(el, attr, index) {
	        if (attr.sex == 0) {
	          return '男';
	        } else {
	          return '女';
	        }
	      }
	    }, {
	      id: "user",
	      text: "邮箱",
	      render: function render(el, attr, index) {
	        return attr.email;
	      }
	    }, {
	      id: "user",
	      text: "电话",
	      render: function render(el, attr, index) {
	        return attr.telephone;
	      }
	    }, {
	      id: "state",
	      text: "状态",
	      render: function render(el, attr, index) {
	        if (attr == 0) {
	          return '禁用';
	        } else {
	          return '启用';
	        }
	      }
	    }];
	    $this.$refs.table.optionList = [{
	      className: 'am-btn-sm',
	      id: "in",
	      render: function render(el, index) {
	        if (el.state == 0) {
	          return "启用";
	        } else {
	          return "禁用";
	        }
	      }
	    }];
	  }
	};

	// </script>
	//

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(131)
	__vue_template__ = __webpack_require__(132)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 131 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	//   <div>
	//     <i_table
	//       v-on:table-click="optionInfo"
	//       v-ref:table
	//     ></i_table>
	//   </div>
	// </template>
	// <script type="text/javascript">
	exports.default = {
	  data: function data() {
	    return {
	      userUrl: '/AuthUsers',
	      filter: {
	        where: {
	          state: 1
	        }
	      }
	    };
	  },
	  ready: function ready() {},

	  methods: {
	    optionInfo: function optionInfo() {}
	  },
	  attached: function attached() {
	    var $this = this;
	    $this.$http.get($this.$tools.resolveUrl($this.userUrl), {
	      filter: $this.filter
	    }, function (res, ste, req) {
	      $this.$refs.table.dataList = res;
	    });
	  },
	  compiled: function compiled() {
	    var $this = this;
	    $this.$refs.table.pk = 'id';
	    $this.$refs.table.checkbox = [];
	    $this.$refs.table.titleList = [{
	      id: "loginName",
	      text: "登录名"
	    }, {
	      id: "realName",
	      text: "真实姓名"
	    }, {
	      id: "sex",
	      text: "性别",
	      render: function render(el, attr, index) {
	        if (attr == 0) {
	          return '男';
	        } else {
	          return '女';
	        }
	      }
	    }, {
	      id: "birthday",
	      text: "出生日期"
	    }, {
	      id: "email",
	      text: "邮箱"
	    }, {
	      id: "telephone",
	      text: "电话"
	    }, {
	      id: "state",
	      text: "状态",
	      render: function render(el, attr, index) {
	        if (attr == 0) {
	          return '禁用';
	        } else {
	          return '启用';
	        }
	      }
	    }];
	  }
	};
	// </script>
	//

/***/ },
/* 132 */
/***/ function(module, exports) {

	module.exports = "\n  <div>\n    <i_table\n      v-on:table-click=\"optionInfo\"\n      v-ref:table\n    ></i_table>\n  </div>\n";

/***/ },
/* 133 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"am-panel am-panel-default\">\n    <div class=\"am-panel-hd\">\n      <h3 class=\"am-panel-title\">\n        用户列表\n      </h3>\n    </div>\n    <div class=\"am-panel-bd\">\n      <div class=\"am-btn-toolbar\">\n        <div class=\"am-btn-group\">\n          <div class=\"am-btn am-btn-default\" v-on:click=\"appUserSelect()\">\n            导入用户\n          </div>\n        </div>\n      </div>\n      <div class=\"am-panel-bd\">\n        <i_table\n          v-on:table-click=\"optionInfo\"\n          v-ref:table\n        ></i_table>\n      </div>\n    </div>\n  </div>\n";

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(135)
	__vue_script__ = __webpack_require__(136)
	__vue_template__ = __webpack_require__(137)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 135 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(120);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	//   <div class="am-panel am-panel-default">
	//     <div class="am-panel-hd">
	//       <h3 class="am-panel-title">
	//         应用分组列表
	//       </h3>
	//     </div>
	//     <div class="am-panel-bd">
	//       <div class="am-btn-toolbar">
	//         <div class="am-btn-group">
	//           <div class="am-btn am-btn-default"
	//                v-on:click="groupAdd()">
	//             新增
	//           </div>
	//           <div class="am-btn am-btn-default"
	//                v-bind:class="[$refs.table.checkbox.length==1?'':'am-disabled']"
	//                v-on:click="groupUserCtl()">
	//             用户管理
	//           </div>
	//         </div>
	//       </div>
	//       <div class="am-panel-bd">
	//         <i_table
	//           v-on:table-click="optionInfo"
	//           v-ref:table
	//         ></i_table>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	// <style lang='less'>
	//
	// </style>
	// <script type="text/javascript">
	exports.default = {
	  data: function data() {
	    return {
	      appId: this.$route.params.appId
	    };
	  },

	  methods: {
	    link: function link(pathName, params) {
	      this.$dispatch('link', pathName, params);
	    },
	    optionInfo: function optionInfo() {},
	    groupAdd: function groupAdd() {
	      this.$dispatch('link', 'app-group-add', {
	        appId: this.appId
	      });
	    },
	    groupUserCtl: function groupUserCtl() {
	      var $index = this.$refs.table.checkbox[0];
	      var data = JSON.parse((0, _stringify2.default)(this.$refs.table.dataList[$index]));
	      this.$dispatch('link', 'app-group-user', {
	        appId: this.appId,
	        groupId: data.id
	      });
	    }
	  },
	  ready: function ready() {
	    this.$refs.table.dataList = [];
	  },
	  created: function created(argument) {},
	  attached: function attached() {
	    var $this = this;
	    $this.$http.get($this.$tools.resolveUrl("/AuthGroups"), {
	      filter: {
	        where: {
	          state: 1,
	          appId: $this.appId
	        },
	        include: 'groupUser'
	      }
	    }, function (res, ste, req) {
	      $this.$refs.table.dataList = res;
	    });
	  },

	  compiled: function compiled() {
	    var $this = this;
	    $this.$refs.table.pk = 'id';
	    $this.$refs.table.checkbox = [];
	    $this.$refs.table.titleList = [{
	      id: "gid",
	      text: "分组id"
	    }, {
	      id: "groupName",
	      text: "分组名称"
	    }, {
	      id: "groupUser",
	      text: "分组人数",
	      render: function render(el, attr, index) {
	        return attr.length;
	      }
	    }];
	    $this.$refs.table.optionList = [{
	      className: 'am-btn-sm',
	      id: "in",
	      render: function render(el, index) {
	        if (el.enable == 0) {
	          return "启用";
	        } else {
	          return "禁用";
	        }
	      }
	    }];
	  }
	};

	// </script>
	//

/***/ },
/* 137 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"am-panel am-panel-default\">\n    <div class=\"am-panel-hd\">\n      <h3 class=\"am-panel-title\">\n        应用分组列表\n      </h3>\n    </div>\n    <div class=\"am-panel-bd\">\n      <div class=\"am-btn-toolbar\">\n        <div class=\"am-btn-group\">\n          <div class=\"am-btn am-btn-default\"\n               v-on:click=\"groupAdd()\">\n            新增\n          </div>\n          <div class=\"am-btn am-btn-default\"\n               v-bind:class=\"[$refs.table.checkbox.length==1?'':'am-disabled']\"\n               v-on:click=\"groupUserCtl()\">\n            用户管理\n          </div>\n        </div>\n      </div>\n      <div class=\"am-panel-bd\">\n        <i_table\n          v-on:table-click=\"optionInfo\"\n          v-ref:table\n        ></i_table>\n      </div>\n    </div>\n  </div>\n";

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(139)
	__vue_script__ = __webpack_require__(140)
	__vue_template__ = __webpack_require__(141)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 139 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 140 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	//   <div class='am-container'>
	//     <div class="am-panel am-panel-default">
	//
	//       <div class="am-panel-hd">
	//         <h3 class="am-panel-title">
	//           添加应用分组
	//         </h3>
	//       </div>
	//       <div class="am-panel-bd">
	//         <form class="am-form am-form-horizontal"
	//               v-on:submit.prevent="submitForm"
	//               v-on:reset.prevent="reset">
	//           <fieldset>
	//             <legend>应用分组信息</legend>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">gid</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="text" v-model="groupInfo.gid" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">分组名称</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="text" v-model="groupInfo.groupName" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <label class="am-u-sm-3 am-form-label">权限代码</label>
	//               <div class="am-u-sm-9 am-u-end ">
	//                 <input type="text" v-model="groupInfo.groupCode" required placeholder="">
	//               </div>
	//             </div>
	//             <div class="am-form-group">
	//               <div class="am-u-sm-10 am-u-sm-offset-2">
	//                 <button type="submit" class="am-btn am-btn-default">提交</button>
	//                 <button type="reset" class="am-btn am-btn-default">取消&返回</button>
	//               </div>
	//             </div>
	//           </fieldset>
	//         </form>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	// <style lang='less'>
	//
	// </style>
	// <script type="text/javascript">
	exports.default = {
	  data: function data() {
	    return {
	      groupInfo: {},
	      appId: this.$route.params.appId
	    };
	  },
	  ready: function ready() {},

	  methods: {
	    submitForm: function submitForm() {
	      var $this = this;
	      $this.$http.post(this.$tools.resolveUrl("/AuthGroups"), {
	        appId: $this.appId,
	        gid: $this.groupInfo.gid,
	        groupName: $this.groupInfo.groupName,
	        groupCode: $this.groupInfo.groupCode
	      }, function (res, ste, req) {
	        $this.$dispatch('link', 'app-group', {
	          appId: $this.appId
	        });
	      }).error(function () {});
	    },
	    reset: function reset() {
	      this.$dispatch('link', 'app-group', {
	        appId: this.appId
	      });
	    }
	  },
	  attached: function attached() {}
	};
	// </script>
	//

/***/ },
/* 141 */
/***/ function(module, exports) {

	module.exports = "\n  <div class='am-container'>\n    <div class=\"am-panel am-panel-default\">\n\n      <div class=\"am-panel-hd\">\n        <h3 class=\"am-panel-title\">\n          添加应用分组\n        </h3>\n      </div>\n      <div class=\"am-panel-bd\">\n        <form class=\"am-form am-form-horizontal\"\n              v-on:submit.prevent=\"submitForm\"\n              v-on:reset.prevent=\"reset\">\n          <fieldset>\n            <legend>应用分组信息</legend>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">gid</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"text\" v-model=\"groupInfo.gid\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">分组名称</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"text\" v-model=\"groupInfo.groupName\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <label class=\"am-u-sm-3 am-form-label\">权限代码</label>\n              <div class=\"am-u-sm-9 am-u-end \">\n                <input type=\"text\" v-model=\"groupInfo.groupCode\" required placeholder=\"\">\n              </div>\n            </div>\n            <div class=\"am-form-group\">\n              <div class=\"am-u-sm-10 am-u-sm-offset-2\">\n                <button type=\"submit\" class=\"am-btn am-btn-default\">提交</button>\n                <button type=\"reset\" class=\"am-btn am-btn-default\">取消&返回</button>\n              </div>\n            </div>\n          </fieldset>\n        </form>\n      </div>\n    </div>\n  </div>\n";

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(143)
	__vue_template__ = __webpack_require__(147)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(16);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	//   <div class="am-panel am-panel-default">
	//     <div class="am-panel-hd">
	//       <h3 class="am-panel-title">
	//         应用用户列表
	//       </h3>
	//     </div>
	//     <div class="am-panel-bd">
	//       <div class="am-btn-toolbar">
	//         <div class="am-btn-group">
	//           <div class="am-btn am-btn-default" v-on:click="groupUserSelect()">
	//             选择用户
	//           </div>
	//         </div>
	//       </div>
	//       <div class="am-panel-bd">
	//         <i_table
	//           v-on:table-click="optionInfo"
	//           v-ref:table
	//         ></i_table>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	// <script type="text/javascript">
	exports.default = {
	  data: function data() {
	    return {
	      appId: this.$route.params.appId,
	      groupId: this.$route.params.groupId
	    };
	  },

	  events: {
	    refresh: function refresh() {
	      var $this = this;
	      $this.$http.get($this.$tools.resolveUrl("/AuthGroupUsers"), {
	        filter: {
	          where: {
	            state: 1,
	            appId: $this.appId,
	            groupId: $this.groupId
	          },
	          include: 'user'
	        }
	      }, function (res, ste, req) {
	        $this.$refs.table.dataList = res;
	      });
	    }
	  },
	  methods: {
	    link: function link(pathName, params) {
	      this.$dispatch('link', pathName, params);
	    },
	    optionInfo: function optionInfo() {},
	    groupUserSelect: function groupUserSelect() {
	      var $this = this;
	      var VueAppUser = __webpack_require__(144);
	      VueAppUser.data = function () {
	        return { appId: $this.appId };
	      };
	      var dialog = this.$dialog.open(VueAppUser, {
	        title: '导入用户到分组',
	        dialogClass: 'i-dialog-max',
	        onSuccess: function onSuccess(content, $dialog, id) {
	          var $table = content.$refs.content.$refs.table;
	          var dataList = $table.dataList;
	          var checkbox = $table.checkbox;
	          if (checkbox.length == 0) {
	            return true;
	          }
	          var userIds = [];
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;

	          try {
	            for (var _iterator = (0, _getIterator3.default)(checkbox), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var cb = _step.value;

	              userIds.push(dataList[cb].id);
	            }
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }

	          $this.$http.post($this.$tools.resolveUrl('/AuthGroupUsers/bind'), {
	            appId: $this.appId,
	            groupId: $this.groupId,
	            userIds: userIds
	          }, function (res, ste, req) {
	            dialog.close();
	            $this.$dispatch('refresh');
	          }).error(function (err) {
	            $this.$dialog.error('请稍后重试!');
	          });
	          return false;
	        }
	      });
	    }
	  },
	  ready: function ready() {
	    this.$refs.table.dataList = [];
	  },
	  created: function created(argument) {},
	  attached: function attached() {
	    this.$dispatch('refresh');
	  },

	  compiled: function compiled() {
	    var $this = this;
	    $this.$refs.table.pk = 'id';
	    $this.$refs.table.checkbox = [];
	    $this.$refs.table.titleList = [{
	      id: "user",
	      text: "登录名",
	      render: function render(el, attr, index) {
	        return attr.loginName;
	      }
	    }, {
	      id: "user",
	      text: "真实姓名",
	      render: function render(el, attr, index) {
	        return attr.realName;
	      }
	    }, {
	      id: "user",
	      text: "性别",
	      render: function render(el, attr, index) {
	        if (attr.sex == 0) {
	          return '男';
	        } else if (attr.sex == 1) {
	          return '女';
	        } else {
	          return '';
	        }
	      }
	    }, {
	      id: "user",
	      text: "邮箱",
	      render: function render(el, attr, index) {
	        return attr.email;
	      }
	    }, {
	      id: "user",
	      text: "电话",
	      render: function render(el, attr, index) {
	        return attr.telephone;
	      }
	    }, {
	      id: "state",
	      text: "状态",
	      render: function render(el, attr, index) {
	        if (attr == 0) {
	          return '禁用';
	        } else if (attr == 1) {
	          return '启用';
	        }
	      }
	    }];
	    $this.$refs.table.optionList = [{
	      className: 'am-btn-sm',
	      id: "in",
	      render: function render(el, index) {
	        if (el.state == 0) {
	          return "启用";
	        } else {
	          return "禁用";
	        }
	      }
	    }];
	  }
	};

	// </script>
	//

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(145)
	__vue_template__ = __webpack_require__(146)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 145 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	//   <div>
	//     <i_table
	//       v-on:table-click="optionInfo"
	//       v-ref:table
	//     ></i_table>
	//   </div>
	// </template>
	// <script type="text/javascript">
	exports.default = {
	  data: function data() {
	    return {
	      appId: null
	    };
	  },
	  ready: function ready() {},

	  methods: {
	    optionInfo: function optionInfo() {}
	  },
	  attached: function attached() {
	    var $this = this;
	    $this.$http.get($this.$tools.resolveUrl('/AuthAppUsers'), {
	      filter: {
	        where: {
	          state: 1,
	          appId: $this.appId
	        },
	        include: 'user'
	      }
	    }, function (res, ste, req) {
	      $this.$refs.table.dataList = res;
	    });
	  },
	  compiled: function compiled() {
	    var $this = this;
	    $this.$refs.table.pk = 'id';
	    $this.$refs.table.checkbox = [];
	    $this.$refs.table.titleList = [{
	      id: "user",
	      text: "登录名",
	      render: function render(el, attr, index) {
	        return attr.loginName;
	      }
	    }, {
	      id: "user",
	      text: "真实姓名",
	      render: function render(el, attr, index) {
	        return attr.realName;
	      }
	    }, {
	      id: "user",
	      text: "性别",
	      render: function render(el, attr, index) {
	        if (attr.sex == 0) {
	          return '男';
	        } else {
	          return '女';
	        }
	      }
	    }, {
	      id: "user",
	      text: "邮箱",
	      render: function render(el, attr, index) {
	        return attr.email;
	      }
	    }, {
	      id: "user",
	      text: "电话",
	      render: function render(el, attr, index) {
	        return attr.telephone;
	      }
	    }, {
	      id: "state",
	      text: "状态",
	      render: function render(el, attr, index) {
	        if (attr == 0) {
	          return '禁用';
	        } else {
	          return '启用';
	        }
	      }
	    }];
	  }
	};
	// </script>
	//

/***/ },
/* 146 */
/***/ function(module, exports) {

	module.exports = "\n  <div>\n    <i_table\n      v-on:table-click=\"optionInfo\"\n      v-ref:table\n    ></i_table>\n  </div>\n";

/***/ },
/* 147 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"am-panel am-panel-default\">\n    <div class=\"am-panel-hd\">\n      <h3 class=\"am-panel-title\">\n        应用用户列表\n      </h3>\n    </div>\n    <div class=\"am-panel-bd\">\n      <div class=\"am-btn-toolbar\">\n        <div class=\"am-btn-group\">\n          <div class=\"am-btn am-btn-default\" v-on:click=\"groupUserSelect()\">\n            选择用户\n          </div>\n        </div>\n      </div>\n      <div class=\"am-panel-bd\">\n        <i_table\n          v-on:table-click=\"optionInfo\"\n          v-ref:table\n        ></i_table>\n      </div>\n    </div>\n  </div>\n";

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_template__ = __webpack_require__(149)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }


/***/ },
/* 149 */
/***/ function(module, exports) {

	module.exports = "\n  page undefined\n";

/***/ }
]);