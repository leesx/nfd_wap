var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');



gulp.task('sass', function () {
    return sass('sass/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('dist'));
});
gulp.task('watch',function(){
    gulp.watch('sass/*.scss',['sass']);
});

gulp.task('server',function(){
    connect.server({
        root:'./',//服务器的根目录
        port:8080, //服务器的地址，没有此配置项默认也是 8080
        livereload:true//启用实时刷新的功能
    });
});
//运行此任务的时候会在8080上启动服务器，
gulp.task('default',['server','watch']);