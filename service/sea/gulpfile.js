var gulp = require('gulp');

var minifycss = require('gulp-clean-css'), // CSS压缩
    uglify = require('gulp-uglify'),        // js压缩
    concat = require('gulp-concat'),        // 合并文件
    rename = require('gulp-rename'),        // 重命名
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    tmodjs = require('gulp-tmod'),
    mkdirp = require('mkdirp'),
    gulpSequence = require('gulp-sequence').use(gulp);

var cleanOff = true;
// Compile SASS & auto-inject into browsers
gulp.task('clean_bootstrap', function () {
    if (!cleanOff) {
        return gulp.src('src/main/webapp/asset/sea/dist/css/boot.min.css', {read: false})
            .pipe(clean({force: true}))
            .pipe(notify({message: 'clean_bootstrap task complete'}));
    }

});

gulp.task('less_bootstrap', function () {
    return gulp.src('src/main/webapp/asset/sea/javascript/00-lib/bootstrap/less/bootstrap.less')
        .pipe(less())
        .pipe(rename({suffix: '.min', basename: "boot"}))
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/css'))
});


gulp.task('copy_font', function () {
    return gulp.src('src/main/webapp/asset/sea/fonts/*')
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/fonts'))
});
gulp.task('copy_image', function () {
    return gulp.src('src/main/webapp/asset/sea/image/*.png')
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/image'))
});

var uiFile = "src/main/webapp/asset/sea/javascript/04-template/ui/*.ejs";
gulp.task('ui_template_pre', function () {
    return gulp.src(uiFile)
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest('src/main/webapp/asset/sea/out/ui'))
});

gulp.task('ui_template_compile', function () {
    return gulp.src("src/main/webapp/asset/sea/out/ui/*.html")
        .pipe(tmodjs({
            base: 'src/main/webapp/asset/sea/out/ui',
            combo: true,
            "charset": "utf-8",
            //"syntax": "native",
            "helpers": "src/main/webapp/asset/sea/javascript/04-template/help.js",
            "escape": true,
            "compress": true,
            "type": "default",
            "runtime": "template.js",
            "minify": false,
            "cache": false,
            output: 'src/main/webapp/asset/sea/out/tpl/ui'
        }))
})


var viewFile = "src/main/webapp/asset/sea/javascript/04-template/view/**/*.ejs";

gulp.task('view_template_pre', function () {
    return gulp.src(viewFile)
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest('src/main/webapp/asset/sea/out/vi/view'))

});


gulp.task('view_template_compile', function () {
    return gulp.src("src/main/webapp/asset/sea/out/vi/**/*.html")
        .pipe(tmodjs({
            base: 'src/main/webapp/asset/sea/out/vi/',
            combo: false,
            "charset": "utf-8",
            "syntax": "native",
            "helpers": "src/main/webapp/asset/sea/javascript/04-template/help.js",
            "escape": true,
            "compress": true,
            "type": "cmd",
            "alias": "template",
            "runtime": "template.js",
            "minify": false,
            "cache": false,
            output: 'src/main/webapp/asset/sea/out/tpl/vi'
        }))
})


gulp.task('clean_lib', function () {
    if (!cleanOff) {
        return gulp.src(['src/main/webapp/asset/sea/dist/js/lib.js'], {read: false})
            .pipe(clean({force: true}))
    }
});


gulp.task('make_lib', function () {
    return gulp.src([
            'src/main/webapp/asset/sea/javascript/00-lib/jquery/jquery.js',
            'src/main/webapp/asset/sea/javascript/00-lib/art/template-native.js',
            'src/main/webapp/asset/sea/javascript/00-lib/seajs/sea.js',
            'src/main/webapp/asset/sea/javascript/00-lib/jquery-ui/position.js'
        ])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest('src/main/webapp/asset/sea/out/js'))
        .pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/js'))
});

gulp.task('plugin_js', function () {
    return gulp.src([
            'src/main/webapp/asset/sea/javascript/00-lib/jscrollpane/jquery.mousewheel.js',
            'src/main/webapp/asset/sea/javascript/08-plugin/jscrollpane/jquery.jscrollpane.js'
        ])
        .pipe(concat("plugin.js"))
        .pipe(gulp.dest('src/main/webapp/asset/sea/out/js'))
        .pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/js'))
});


gulp.task('plugin_css', function () {
    return gulp.src(['src/main/webapp/asset/sea/stylesheet/plugin/jscrollpane/jquery.jscrollpane.css'])
        .pipe(minifycss())   //执行压缩
        .pipe(rename({suffix: '.min', basename: "plugin"}))
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/css'))
});


gulp.task('clean_core', function () {
    if (!cleanOff) {
        return gulp.src(['src/main/webapp/asset/sea/dist/js/core.js'], {read: false})
            .pipe(clean({force: true}))
    }
});


var coreFile = [
    'src/main/webapp/asset/sea/javascript/01-core/00-imethod.js',
    'src/main/webapp/asset/sea/javascript/01-core/01-console.js',
    'src/main/webapp/asset/sea/javascript/01-core/02-json.js',
    'src/main/webapp/asset/sea/javascript/01-core/03-http.js',
    'src/main/webapp/asset/sea/javascript/01-core/04-dialog.js',
    'src/main/webapp/asset/sea/javascript/01-core/05-util.js',
    'src/main/webapp/asset/sea/javascript/01-core/06-heart.js',
    'src/main/webapp/asset/sea/javascript/01-core/07-user.js',
    'src/main/webapp/asset/sea/javascript/01-core/08-hash.js',
    'src/main/webapp/asset/sea/javascript/01-core/09-script.js',
    'src/main/webapp/asset/sea/javascript/01-core/10-resize.js',
    'src/main/webapp/asset/sea/javascript/01-core/11-scroll.js',
    'src/main/webapp/asset/sea/javascript/01-core/99-debug.js'
];

gulp.task('make_core', function () {
    return gulp.src(coreFile)
        .pipe(concat("core.js"))
        .pipe(gulp.dest('src/main/webapp/asset/sea/out/js'))
        .pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/js'))
});


gulp.task('clean_ui', function () {
    if (!cleanOff) {
        return gulp.src(['src/main/webapp/asset/sea/dist/js/ui.js'], {read: false})
            .pipe(clean({force: true}))
    }
});


gulp.task('make_ui', function () {
    return gulp.src([
            'src/main/webapp/asset/sea/javascript/04-template/help.js',
            'src/main/webapp/asset/sea/out/tpl/ui/.cache/*.js',
            'src/main/webapp/asset/sea/javascript/05-ui/01-dialog.impl.js',
            'src/main/webapp/asset/sea/javascript/05-ui/02-pagination.js',
            'src/main/webapp/asset/sea/javascript/05-ui/03-nav.js',
            'src/main/webapp/asset/sea/javascript/05-ui/03-http.js',
            'src/main/webapp/asset/sea/javascript/05-ui/04-select.js',
            'src/main/webapp/asset/sea/javascript/05-ui/05-page.js',
            'src/main/webapp/asset/sea/javascript/05-ui/06-tab.js',
            'src/main/webapp/asset/sea/javascript/05-ui/06-pagination.js',
            'src/main/webapp/asset/sea/javascript/05-ui/07-tree.js',
            'src/main/webapp/asset/sea/javascript/05-ui/08-btn.js',
            'src/main/webapp/asset/sea/javascript/05-ui/09-table.js',
            'src/main/webapp/asset/sea/javascript/05-ui/10-checkbox.js',
            'src/main/webapp/asset/sea/javascript/05-ui/11-radio.js'
        ])
        .pipe(concat("ui.js"))
        .pipe(gulp.dest('src/main/webapp/asset/sea/out/js'))
        .pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/js'))
});

gulp.task('module_less', function () {
    return gulp.src(['src/main/webapp/asset/sea/stylesheet/imethod.less'])
        .pipe(less())
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/css'))
});

var serviceFile = 'src/main/webapp/asset/sea/javascript/02-service/**/*.js';
gulp.task('build_service', function () {
    return gulp.src(serviceFile)
        .pipe(gulp.dest('src/main/webapp/asset/sea/out/js/service'))
        //.pipe(uglify())
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/js/service'))
});

gulp.task('build_view', function () {
    return gulp.src(['src/main/webapp/asset/sea/out/tpl/vi/**/*.js'])
        .pipe(gulp.dest('src/main/webapp/asset/sea/out/js'))
        //.pipe(uglify())
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/js'))
});


var controllerFile = 'src/main/webapp/asset/sea/javascript/06-controller/**/*.js'

gulp.task('build_controller', function () {
    return gulp.src(controllerFile)
        .pipe(gulp.dest('src/main/webapp/asset/sea/out/js/controller'))
        //.pipe(uglify())
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/js/controller'))
});


gulp.task('config', function () {
    return gulp.src('src/main/webapp/asset/sea/javascript/07-config/*.js')
        .pipe(concat('config.js'))
        .pipe(gulp.dest('src/main/webapp/asset/sea/out/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/js'))
});

var playerFile = [
    "src/main/webapp/asset/sea/javascript/00-lib/jwplayer-7.1.4/**/*.js",
    "src/main/webapp/asset/sea/javascript/00-lib/jwplayer-7.1.4/**/*.swf",
    "src/main/webapp/asset/sea/javascript/00-lib/jwplayer-7.1.4/**/*.css"
];
gulp.task("player", function () {
    return gulp.src(playerFile)
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/js/jwplayer'))
});


var uEditFile = [
    "src/main/webapp/asset/sea/javascript/00-lib/uedit/utf8-jsp/**"
];

gulp.task("uEdit", function () {
    return gulp.src(uEditFile)
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/js/uedit'))
});

gulp.task('bootstrap', gulpSequence('clean_bootstrap', 'less_bootstrap'));
gulp.task('ui', gulpSequence('clean_ui', 'ui_template_pre', 'ui_template_compile', 'make_ui'));
gulp.task('view', gulpSequence('view_template_pre', 'view_template_compile', 'build_view'));
gulp.task('lib', gulpSequence('clean_lib', 'make_lib'));
gulp.task('plugin', gulpSequence('plugin_js', 'plugin_css'));
gulp.task('core', gulpSequence('clean_core', 'make_core'));
var outDir = [
    'src/main/webapp/asset/sea/out/js',
    'src/main/webapp/asset/sea/out/tpl',
    'src/main/webapp/asset/sea/out/ui',
    'src/main/webapp/asset/sea/out/vi'
];
var distDir = [
    'src/main/webapp/asset/sea/dist/css',
    'src/main/webapp/asset/sea/dist/fonts',
    'src/main/webapp/asset/sea/dist/image',
    'src/main/webapp/asset/sea/dist/js'
];
gulp.task("clean", function () {
    if (!cleanOff) {
        gulp.src(distDir, {read: false})
            .pipe(clean({force: true}));
        gulp.src(outDir, {read: false})
            .pipe(clean({force: true}))
        for (var k in outDir) {
            mkdirp(outDir[k])
        }
        for (var k in outDir) {
            mkdirp(distDir[k])
        }
    }
});
gulp.task("clean_out", function () {
    if (!cleanOff) {
        gulp.src(outDir, {read: false})
            .pipe(clean({force: true}))
    }

});

gulp.task("other", function () {
    gulp.src("src/main/webapp/asset/sea/javascript/08-other/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest('src/main/webapp/asset/sea/dist/js/other'))
});
gulp.task('default', gulpSequence(
    'clean',
    'bootstrap',
    'lib',
    'plugin',
    'player',
    'uEdit',
    'core',
    'ui',
    'view',
    'build_service',
    'build_controller',
    'config',
    'module_less',
    'copy_font',
    'copy_image',
    "clean_out",
    "other"
));








