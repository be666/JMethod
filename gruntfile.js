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
          targetDir: '/lib',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: '/js/', src: ['**'], dest: 'dist/js'}
        ]
      }
    },
    concat: {
      options: {
        separator: '\n'
      },
      dist_js: {
        src: [
          "*/*.js"
        ],
        dest: '*/dest.js'
      },
      dist_css: {
        src: [
          "**/*.css"
        ],
        dest: '*/dest.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! power by iMethod */\n',
        beautify : true,
        mangle : true //混淆变量名
      },
      built: {
        src:["dist/js/built.js"],
        dest:"dist/js/built.min.js"
      }
    },
    jshint: {
      all: ['gruntfile.js', 'www/js/*.js']
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },
    clean: {
      js: ["dist/js/built.js"],
      css: ["dist/css/built.css"]
    },
    // 文件监控
    watch: {
      files: ['*/*.js'],
      options: {
        reload: true,
        livereload: {
          port: 3001
        }
      }
    }
    ,
    protractor: {
      options: {
        configFile: "node_modules/protractor/example/conf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        options: {
          configFile: "e2e.conf.js", // Target-specific config file
          args: {} // Target-specific arguments
        }
      }
    },

    //自动刷新，但是在 rails 开发环境下无法使用
    browserSync: {
      dev: {
        bsFiles: {
          src: ['dist/css/built.min.css', 'dist/js/built.min.js']
        },
        options: {
          watchTask: true,
          proxy: "",
          host: ""
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  //grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-bower-task');

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-copy');

  //监控文件
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-browser-sync');
  //grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.registerTask('default', ['bower','copy','concat','uglify','jshint',/*'cssmin',*/'clean'/*, 'watch'*/]);//,'protractor']);
  grunt.registerTask('watchfiles', ['bower','copy','concat','uglify','jshint',/*'cssmin',*/'clean', 'watch']);//,'protractor']);

};