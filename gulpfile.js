var gulp = require('gulp');
var minify = require('gulp-minifier');
var webserver = require('gulp-webserver');
var scss = require('gulp-sass');
var concat = require('gulp-concat');
var gulpSequence = require('gulp-sequence');
// gulp task for SASS compliation
gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(scss().on('error', scss.logError))
    .pipe(gulp.dest('./css'));
});


// gulp task for web server
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

// gulp task to minify css
gulp.task('mincss', function() {
  return gulp.src('./css/**/*').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('temp/css'));
});

// gulp task to minify css
gulp.task('minjs', function() {
  return gulp.src('./js/**/*').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('temp/js'));
});



gulp.task('style', function() {
  return gulp.src('./temp/css/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/prod/css/'));
}); 
gulp.task('scripts', function() {
  return gulp.src('./temp/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/prod/js/'));
});
gulp.task('sw',function(){
  gulp.watch('./sass/**/*.scss',['sass']);
});

// gulp.task('build', gulpSequence('mincss', 'minjs', 'style', 'scripts'));

// gulp.task('default',  function() {
//   gulp.watch(['./sass/**/*.sass','./js/**/*.js','./index.html'],['build']);
// });

// gulp.watch(['sass/*.sass','index.html','./js/**/*.js' ],)