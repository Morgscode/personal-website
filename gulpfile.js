const gulp = require("gulp"),
  plugins = require("gulp-load-plugins")(),
  cleanCSS = require("gulp-clean-css"),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  concat = require("gulp-concat"),
  babel = require("gulp-babel"),
  uglify = require("gulp-uglify"),
  projectPath = "./",
  srcPath = `${projectPath}src/`,
  distPath = `${projectPath}dist/`,
  projectName = "portfolio";

// To enable source makes see this work around https://github.com/dlmanning/gulp-sass/issues/28#issuecomment-43951089
// Not using because it fails silently when there are errors in the scss

/**
 * gulp sass
 *
 * Process Sass, prefix and combine media queries for production.
 */
gulp.task(`${projectName}_styles`, () => {
  return (
    gulp
      .src(`${srcPath}scss/main.scss`, { allowEmpty: true })

      .pipe(sourcemaps.init())

      // Process Sass
      .pipe(
        plugins.sass({
          errLogToConsole: true,
        })
      )

      // Minify css
      .pipe(cleanCSS())

      // Rename the file
      .pipe(
        plugins.rename({
          basename: `${projectName}_styles`,
          suffix: ".min",
        })
      )

      // Autoprefix
      .pipe(
        autoprefixer({
          browsersList: ["last 2 versions"],
          cascade: false,
        })
      )

      .pipe(
        plugins.sourcemaps.write(".", {
          includeContent: false,
          sourceRoot: "./",
        })
      )

      // Move it into the css folder
      .pipe(gulp.dest(`${distPath}css`))
  );
});

/**
 * gulp js
 *
 * Process JS and minify.
 */
gulp.task(`${projectName}_scripts`, () => {
  return (
    gulp
      .src(
        [
          `${srcPath}js/particleAnimation.js`,
          `${srcPath}js/sliders.js`,
          `${srcPath}js/lazyLoad.js`,
          `${srcPath}js/cvAnimations.js`,
          `${srcPath}js/nav.js`,
          `${srcPath}js/projectAnimations.js`,
          `${srcPath}js/matchHeight.js`,
          `${srcPath}js/emails.js`,
        ],
        {
          allowEmpty: true,
        }
      )
      .pipe(sourcemaps.init())
      .pipe(concat(`${projectName}_scripts.min.js`))
      .pipe(babel({ presets: ["@babel/preset-env"] }))
      .pipe(uglify())
      // Move it into the js folder
      .pipe(gulp.dest(`${distPath}js`))
  );
});

/**
 * gulp serve
 *
 */
gulp.task(`${projectName}_serve`, () => {
  // Watch SCSS
  gulp.watch(`${srcPath}scss/**/**`, gulp.series(`${projectName}_styles`));
  // Watch JS
  gulp.watch(`${srcPath}js/**/*.js`, gulp.series(`${projectName}_scripts`));
});

gulp.task(
  `${projectName}_build`,
  gulp.series(`${projectName}_styles`, `${projectName}_scripts`)
);

/**
 * Define composite tasks
 */
// Serve tasks
gulp.task("serve", gulp.parallel(`${projectName}_serve`));
// Production build tasks
gulp.task("build", gulp.series(`${projectName}_build`));
