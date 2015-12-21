var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    base64 = require('gulp-base64'),
    compass = require('gulp-compass'),
    cache = require('gulp-cache'),
    reload = browserSync.reload;

var src = {
    scss: 'app/sass/*.scss',
    css: 'app/css',
    images: 'app/images/*',
    html: 'app/page/*html',
    js: 'app.js'
};
// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function () {

    /*browserSync.init({
        server: './app',
        //点击，滚动和表单在任何设备上输入将被镜像到所有设备里（当然你必须正确使用了Url）
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
        },
        //记录连接
        logConnections: true

    });*/

    //启动一个服务器
    browserSync({
        notify: false,//是否通知
        port: 9000,//端口号
        server: {//服务器配置
            baseDir: [ 'app'],//设置静态文件目录
            routes: {//路由
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch([
        src.css,
        src.js,
        src.html
    ]).on('change', reload);//当这些文件变化时自动重启服务器
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function () {
    return gulp.src(src.scss)
        .pipe(sass())
        //添加前缀
        .pipe(autoprefixer())

        .pipe(gulp.dest(src.css))
        //提醒任务完成
        .pipe(notify({message: 'Sass task complete'}))
        .pipe(reload({stream: true}));
});
// Images
gulp.task('images', function () {
    return gulp.src(src.images)
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest('app/dest/images'))
        .pipe(notify({message: 'Images task complete'}));
});
gulp.task('default', ['serve']);