const { dest, src, task, series, parallel, watch } = require('gulp');
const browsersync = require("browser-sync").create();
const exec = require('child_process').exec;

// Utilities
const del = require("del");
const notify = require("gulp-notify");
const rename = require('gulp-rename');

// JS
const webpack = require('webpack');
const webpack_dev = require('./webpack.dev');
const webpack_prod = require('./webpack.prod');

// CSS
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const postcssPresetEnv = require("postcss-preset-env");
const autoprefixer = require('autoprefixer');
const lessLists = require('less-plugin-lists');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

// Image
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const svgSprite = require('gulp-svg-sprite');

const paths = {
  src: {
    css: "./_src/less/styles.less",
    js: "./_src/js/scripts.js",
    images: "./_src/images/**/*",
    svg: "./_src/svg/*.svg",
    html: [
      'public/**/*.html',
      '!public/js/**/*',
      '!public/css/**/*',
      '!public/files/**/*',
      '!public/fonts/**/*',
      '!public/images/**/*',
      '!public/svg/**/*'
    ]
  },
  dest: {
    css: "./public/",
    js: "./public/js/",
    html: "./public/",
    images: "./public/images/",
    svg: "./public/svg/"
  },
  del: {
    css: "./public/*.css",
    js: "./public/js/",
    images: "./public/images/",
    svg: "./public/svg/",
    html: "public",
  },
  watch: {
    css: "./_src/less/**/*",
    js: "./_src/js/**/*",
    images: "./_src/images/**/*",
    svg: "./_src/svg/*",
    html: [
      "./layouts/**/*",
      "./content/**/*"
    ]
  }
};

//Task: Server
function browserSync(cb) {
  browsersync.init({
    server: {
      baseDir: "./public/"
    },
    port: 3000
  });
  cb();
}

// Task: Reload Page
function reloadPage(cb) {
  browsersync.reload();
  cb();
}

// Task: Clean
function clean() {
  return del([
    paths.del.css,
    paths.del.js,
    paths.del.images,
    paths.del.html,
    paths.del.svg
  ]);
}
function cleanSVG() {
  return del([
    paths.del.svg
  ]);
}

// Task: CSS
function css() {
  return src(paths.src.css)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(less({
      plugins: [(new lessLists)]
    }))
    .pipe(postcss(postcssSettings))
    .pipe(dest(paths.dest.css))
}

// Task: Inject CSS
function injectCSS() {
  return src('./public/styles.css')
    .pipe(browsersync.stream());
}

// Task: JS Deveopment
function jsDev(cb) {
  webpack(webpack_dev, (err, stats) => {
    if(err) {
      console.log(err.toString());
    }
    console.log(stats.toString());
    cb(); // So gulp can be certain webpack completed
  });
}

// Task: JS Production
function jsProd(cb) {
  webpack(webpack_prod, (err, stats) => {
    cb();
  });
}

// Task: HTML
function html() {
  return src(paths.src.html)
    .pipe(dest(paths.dest.html))
    .pipe(browsersync.stream());
}

// Task: Hugo
function hugo(cb) {
  exec('hugo', function (err, stdout, stderr) {
    console.log('\n-------- Hugo output--------\n');
    console.log(stdout);
    console.log('----------------------------\n');
    html();
    cb(err);
  });
}

// Task: Images
function images() {
  return src(paths.src.images)
    .pipe(newer(paths.dest.images))
    // .pipe(imagemin())
    .pipe(dest(paths.dest.images));
}

// Task: SVG
function svg() {
  return src(paths.src.svg)
  .pipe(svgSprite(svgSettings))
  .pipe(dest(paths.dest.svg));
}

function svgCopyCSS() {
  return src('./public/svg/css/*.css')
  .pipe(rename('sprite.less'))
  .pipe(dest('./_src/less/generated/'));
}

// Task: Watch
function taskWatch(cb) {
  watch(paths.watch.css, series(css, injectCSS));
  watch(paths.watch.js, series(jsDev, reloadPage));
  watch(paths.watch.images, series(images, reloadPage));
  watch(paths.watch.svg, series(cleanSVG, svg, svgCopyCSS, css));
  watch(paths.watch.html, series(hugo, reloadPage));
  cb();
}

// Public Tasks
// =====================================

// exports.svg = svg;
// exports.svgCopyCSS = svgCopyCSS;
exports.clean = clean;

// Task: Build
exports.build = series(
  clean,
  parallel(series(svg, svgCopyCSS, css), jsProd, hugo, images),
);

// Task: Watch
exports.watch = series(
  clean,
  parallel(series(svg, svgCopyCSS, css), jsDev, hugo, images, svg),
  parallel(taskWatch, browserSync)
);

// =============================================================================
// Helpers Function & Package Settings
// =============================================================================  

// Post CSS settings
const postcssSettings = [
  autoprefixer({
    enabled: true,
    options: {
      remove: false,
      browsers: [browsersYearsBack(8), "not dead"]
    }
  }),
  postcssPresetEnv()
]

// Autoprifexer, returns string for browser support
function browsersYearsBack(years) {
  return (
    "since " + (new Date().getFullYear() - years || "2010")
  );
}

// SVG Settings
svgSettings = {
  mode: {
    css: {
      sprite: 'svg/sprite.svg', // renamed to remove .css from filename
      dimensions: "--ratio",
      render: {
        css: {
          template: './gulp/templates/sprite.css',
        }
      }
    }
  }
};