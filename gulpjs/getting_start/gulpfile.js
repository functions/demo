/**
 * 
 */

var // 引入依赖的插件
      gulp        = require('gulp')
    , browserify  = require('gulp-browserify')
    , uglify      = require('gulp-uglify')
    , rename      = require('gulp-rename')
    , sourcemaps  = require('gulp-sourcemaps')
    , concat      = require('gulp-concat')
    , clean       = require('gulp-clean')
    , minifycss   = require('gulp-minify-css')

    // 配置路径信息
    , scriptsDir  = 'src/scripts/'
    , stylesDir   = 'src/styles/'
    , scriptFiles = scriptsDir + '**/*.js'
    , styleFiles  = stylesDir + '**/*.css'
    , destDir     = 'dist/'
    , destJs      = destDir + 'scripts'
    , destCss     = destDir + 'styles'
    ;

// 定义打包 js 的任务
gulp.task('packjs', function() {
    gulp.src(scriptsDir)
        .pipe(browserify())
        .pipe(rename('index.js'))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulp.dest(destJs))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destJs))
    ;
});

// 定义打包 css 的任务
gulp.task('packcss', function() {
    gulp.src(styleFiles)
        .pipe(concat('index.css'))
        .pipe(gulp.dest(destCss))
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(destCss))
    ;
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(destDir, {read: false})
        .pipe(clean({force: true}));
});
gulp.task('cleanjs', function() {
    gulp.src(destJs, {read: false})
        .pipe(clean({force: true}));
});
gulp.task('cleancss', function() {
    gulp.src(destCss, {read: false})
        .pipe(clean({force: true}));
});

// 定义监听任务
gulp.task('watch', function() {
    gulp.watch([ scriptFiles ], [ 'cleanjs', 'packjs' ]);
    gulp.watch([ styleFiles ], [ 'cleancss', 'packcss' ])
});

// 打包 css 和 js 
gulp.task('pack', ['clean', 'packjs', 'packcss']);

// 开发时任务
gulp.task('dev', ['clean', 'packjs', 'packcss', 'watch']);

// 执行默认任务
gulp.task('default', []);