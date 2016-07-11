var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');

var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');

var livereload = require('gulp-livereload');

var modules = './node_modules/';

gulp.task('materialize-css', function(){

    gulp
        .src('./resources/assets/sass/materialize.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename('materialize.min.css'))
        .pipe(gulp.dest('./public/css/main'));

});

gulp.task('roboto-fonts', function(){

    gulp
        .src(modules + 'materialize-css/fonts/roboto/*')
        .pipe(babel())
        .pipe(gulp.dest('./public/fonts/roboto'))

});

gulp.task('material-icons', function(){
    gulp
        .src([
            modules + 'material-design-icons/iconfont/MaterialIcons-Regular.eot',
            modules + 'material-design-icons/iconfont/MaterialIcons-Regular.woff2',
            modules + 'material-design-icons/iconfont/MaterialIcons-Regular.woff',
            modules + 'material-design-icons/iconfont/MaterialIcons-Regular.ttf'
        ])
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('materialize-scripts', function(){
    gulp
        .src([
            //modules + 'react/dist/react.min.js',
            modules + 'angular/angular.min.js',
            modules + 'jquery/dist/jquery.min.js',
            modules + 'materialize-css/dist/js/materialize.min.js'])
        .pipe(concat('materialize.min.js'))
        .pipe(gulp.dest('public/js/libs'))
});


gulp.task('script', function(){

    console.log(new Date());
    
    gulp.src([
        'resources/assets/js/index.js',
        'resources/assets/js/src/*.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(babel({"presets": ["es2015"]}))
        .pipe(gulp.dest('public/js/main'));

    
});

gulp.task('watch-materialize', function(){
    gulp.watch([
        'resources/assets/sass/materialize.scss',
        'resources/assets/js/**/*.js'
    ], ['materialize-css']);
});

gulp.task('watch-script', function(){
    livereload.listen();

    gulp.watch(['resources/assets/js/**/*.js', 'resources/**/*.blade.php', 'public/partials/*.html'],
        ['script', livereload.reload]);
});

gulp.task('default', ['materialize-css', 'roboto-fonts', 
                      'material-icons', 'materialize-scripts', 'script']);


