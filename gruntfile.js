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
          targetDir: 'angular/app/lib',
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
          "angular/app/00-components/base.js",
          "angular/app/00-components/*/*.js",
          "angular/app/01-models/**/*.js",
          "angular/app/02-services/*.js",
          "angular/app/02-services/**/*.js",
          "angular/app/03-views/*.js",
          "angular/app/03-views/**/*.js",
          "angular/app/04-configs/component.js",
          "angular/app/04-configs/router.js",
          "angular/app/04-configs/app.js"
        ],
        dest: "angular/app/dist.js"
      },
      plugin_js: {
        src: [
          "angular/app/lib/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js",
          "angular/app/lib/jquery/jquery.js",
          "angular/app/bower_components/bootstrap/dist/js/bootstrap.js",
          "angular/app/lib/angular/angular.js",
          "angular/app/lib/angular-loader/angular-loader.js",
          "angular/app/lib/angular-mocks/angular-mocks.js",
          "angular/app/lib/angular-route/angular-route.js",
          "angular/app/lib/angular-ui-router/angular-ui-router.js"
        ],
        dest: "angular/app/plugins.js"
      },
      app_css: {
        src: ["angular/app/03-views/*/*.css"],
        dest: "angular/app/dist.css"
      },
      plugin_css: {
        src: [
          "angular/app/bower_components/bootstrap/dist/css/bootstrap.css",
          "angular/app/bower_components/bootstrap/dist/css/bootstrap-theme.css"
        ],
        dest: "angular/app/plugins.css"
      }
    },
    less: {
      dist: {
        files: {
          'angular/app/less.css': 'angular/app/05-style/main.less',
          'angular/app/merge.css': 'angular/app/05-style/merge.less'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! power by iMethod */\n',
        beautify: true,
        mangle: true //混淆变量名
      },
      built: {
        src: ["angular/app/dist.js"],
        dest: "angular/app/dist.min.js"
      }
    },
    clean: {
      js: ["angular/app/dist.js", "angular/app/plugins.js", "angular/app/dist.min.js"],
      css: ["angular/app/dist.css", "angular/app/plugins.css", "angular/app/less.css"],
      cordova: ["cordova/www/index.html", "cordova/www/*.js", "cordova/www/*.css", "cordova/www/app"]
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: "angular/app", src: ['index.html'], dest: "cordova/www/"}
        ]
      },
      main_js: {
        files: [
          {expand: true, cwd: "angular/app", src: ['dist.min.js'], dest: "cordova/www/"}
        ]
      },
      plugin_js: {
        files: [
          {expand: true, cwd: "angular/app", src: ['plugins.js'], dest: "cordova/www/"}
        ]
      },
      main_css: {
        files: [
          {expand: true, cwd: "angular/app", src: ['dist.css'], dest: "cordova/www/"},
          {expand: true, cwd: "angular/app", src: ['less.css'], dest: "cordova/www/"}
        ]
      },
      plugin_css: {
        files: [
          {expand: true, cwd: "angular/app", src: ['plugins.css'], dest: "cordova/www/"}
        ]
      },
      html: {
        files: [
          {expand: true, cwd: "angular/app/03-views", src: ['**/*.html'], dest: "cordova/www/app/03-views"}
        ]
      }
    },
    watch: {
      css: {
        files: ['angular/app/05-style/**/*.less', 'angular/app/03-views/**/*.js', 'angular/app/02-services/**/*.js'],
        tasks: ['clean', 'concat', 'uglify', 'less', 'copy'],
        options: {
          debounceDelay: 10000,
          interval: 1000,
          interrupt: true,
          reload: true
        }
      }
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

  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['bower', 'clean', 'concat', 'uglify', 'less', 'copy', 'watch']);

};