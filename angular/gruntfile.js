/**
 * auth : iMethod
 * create_at: 15/9/30.
 * desc:
 * note:
 *  1.
 */
//Wrapper函数
module.exports = function (grunt) {

  // 配置项目
  grunt.initConfig({
    // 配置任务
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: 'app/lib',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },
    concat: {
      options: {
        separator: '\n'
      },
      app_js: {
        src: [
          "app/00-components/base.js",
          "app/00-components/*/*.js",
          "app/01-models/**/*.js",
          "app/02-services/*.js",
          "app/02-services/**/*.js",
          "app/03-views/*.js",
          "app/03-views/**/*.js",
          "app/04-configs/component.js",
          "app/04-configs/router.js",
          "app/04-configs/app.js"
        ],
        dest: 'app/dist.js'
      },
      plugin_js: {
        src: [
          "app/lib/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js",
          "app/lib/jquery/dist/js/jquery.js",
          "app/lib/bootstrap/dist/js/bootstrap.js",
          "app/lib/angular/angular.js",
          "app/lib/angular-loader/angular-loader.js",
          "app/lib/angular-mocks/angular-mocks.js",
          "app/lib/angular-route/angular-route.js",
          "app/lib/angular-ui-router/angular-ui-router.js"
        ],
        dest: 'app/plugins.js'
      },
      app_css: {
        src: ["app/03-views/*/*.css"],
        dest: 'app/dist.css'
      },
      plugin_css: {
        src: [
          "app/bower_components/html5-boilerplate/dist/css/normalize.css",
          "app/bower_components/html5-boilerplate/dist/css/main.css"
        ],
        dest: 'app/plugins.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! power by iMethod */\n',
        beautify: true,
        mangle: true //混淆变量名
      },
      built: {
        src: ["app/dist.js"],
        dest: "app/dist.min.js"
      }
    },
    clean: {
      js: ["app/dist.js","app/plugins.js", "app/dist.min.js"],
      css: ["app/dist.css","app/plugins.css"]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-bower-task');

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-copy');

  //监控文件
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'concat', 'uglify']);

};