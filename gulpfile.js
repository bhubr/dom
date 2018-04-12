/**
 * Sources:
 * https://www.alsacreations.com/tuto/lire/1686-introduction-a-gulp.html
 * https://www.npmjs.com/package/gulp-pandoc
 * https://gist.github.com/sturobson/8343865
 */
var gulp = require('gulp');
var pandoc = require('gulp-pandoc');

gulp.task('docs', function() {
  gulp.src('src/*.md')
    .pipe(pandoc({
      from: 'markdown',
      to: 'html5',
      ext: '.html',
      args: ['--smart']
    }))
    .pipe(gulp.dest(__dirname));
});

// Tâche "watch" = je surveille src/*.md
gulp.task('watch', function () {
  gulp.watch(__dirname + '/src/*.md', ['docs']);
});

gulp.task("default", ["docs", "watch"])
