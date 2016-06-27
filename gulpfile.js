var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');

var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babel = require('babelify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');

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
            modules + 'vue/dist/vue.min.js',
            modules + 'jquery/dist/jquery.min.js',
            modules + 'materialize-css/dist/js/materialize.min.js'])
        .pipe(concat('materialize.min.js'))
        .pipe(gulp.dest('public/js/libs'))
});

var bundleScript = function(watch) {

    var bundle = browserify('resources/assets/js/main/index.js', {debug: true});

    if (watch) {
        bundle = watchify(bundle);
        bundle.on('update', function(){
            console.log(new Date() + ' --> Bundling');
            rebundle();
        })
    }

    function rebundle() {
        bundle
            .transform(babel)
            .bundle()
            .on('error', function(err) {console.log(err); this.emit('end')})
            .pipe(source('index.js'))
            /*.pipe(buffer())
            .pipe(uglify())*/
            .pipe(rename('app.min.js'))
            .pipe(gulp.dest('public/js/main'))
    }

    rebundle();
};

gulp.task('bundle-script', function(){
    return bundleScript();
});

gulp.task('watch-materialize', function(){
    gulp.watch([
        'resources/assets/sass/materialize.scss',
        'resources/assets/js/**/*.js'
    ], ['materialize-css']);
});

gulp.task('watch-script', function(){ return bundleScript(true)});

gulp.task('default', ['materialize-css', 'roboto-fonts', 
                      'material-icons', 'materialize-scripts', 'bundle-script']);


