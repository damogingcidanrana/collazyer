var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    sprites = require('gulp.spritesmith'),
    rename = require("gulp-rename"),
    compass = require('gulp-compass');

var path = {
    build: {
        html: 'html/',
        js: 'html/js/',
        css: 'html/css/',
        img_template: 'html/img/template',
        img_bs64:'html/img/template/base64',
        img_content: 'html/img/',
        fonts: 'html/fonts/'
    },
    src: {
        html: 'src/*.pug',
        js: 'src/js/scripts.js',
        style: 'src/sass/*.sass',
        img: 'src/img/**/*.*',
        img_template: 'src/img/template/*.*',
        img_bs64: 'src/img/base64/*.*',
        img_sprite: 'src/img/sprites/*.*',
        img_content: 'src/img/content/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.pug',
        js: 'src/js/**/*.js',
        style: 'src/sass/**/*.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
};

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(compass({
            project_path: __dirname + '/..',
            css: path.build.css,
            sass: 'src/sass',
            image: 'src/img/template',
            sourcemap: true,
            relative: false
        }))
        .pipe(prefixer({browsers:["chrome 37","firefox 30","ie 9", "opera 25", "safari 6"]}))
        .pipe(gulp.dest(path.build.css))
        .pipe(cssmin())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img_content) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img_content));
    gulp.src(path.src.img_template) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img_template));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', [ 'build', 'watch']);
