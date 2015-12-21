var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;

var src = {
    scss: 'app/scss/*.scss',
    css:  'app/css',
    html: 'app/*.html,app/page/*html'
};
// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: './app',
        //点击，滚动和表单在任何设备上输入将被镜像到所有设备里（当然你必须正确使用了Url）
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
        },
        //记录连接
        logConnections: true

    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function () {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);