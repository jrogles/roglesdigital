var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode : {
    css : {
      variables: {
        replaceSVGwPNG: function () {
          return function(sprite, render){
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

gulp.task('beginClean', function () {
  return del(['./app/temp/sprite', './app/assets/img/sprites']);
});

gulp.task('createSprites', ['beginClean'], function () {
  return gulp.src('./app/assets/img/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('createPngCopy',['createSprites'], function() {
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'))
})

gulp.task('copySpriteGraphic',['createPngCopy'], function () {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/img/sprites'));
});

gulp.task('copySpriteCSS', ['createSprites'], function () {
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/components'));
});

gulp.task('endClean', ['copySpriteGraphic','copySpriteCSS'], function () {
  return del(['./app/temp/sprite']);
});

gulp.task('icons', ['beginClean','createSprites','createPngCopy','copySpriteGraphic', 'copySpriteCSS', 'endClean']);
