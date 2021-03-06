// ================================================================================
// (c) 2020 Hiratake
// gulpfile.js
// ================================================================================

const gulp              = require( "gulp" );
const browsersync       = require( "browser-sync" );
const imagemin          = require( "gulp-imagemin" );
const minifyjpeg        = require( "imagemin-mozjpeg" );
const minifypng         = require( "imagemin-pngquant");
const webpack           = require( "webpack" );
const webpackstream     = require( "webpack-stream" );

const webpackconfig     = {
  prod: require( "./webpack.config.prod" ),
  dev:  require( "./webpack.config.dev" )
};

const paths = {
  html: {
    src: "./src/html/**/*.html",
    dest: "./build"
  },
  css: {
    src: "./src/sass/**/*.scss"
  },
  js: {
    src: "./src/js/**/*.js",
    dest: "./build/js"
  },
  image: {
    src: "./src/img/**/*.{jpg,png,gif,svg}",
    dest: "./build/img"
  },
  vue: {
    src: "./src/vue/**/*.vue"
  },
  assets: {
    src: "./src/assets/**/*",
    dest: "./build/assets"
  }
}

// Start Browser Sync
const startSync = ( done ) => {
  browsersync({
    server: {
      baseDir: paths.html.dest,
      index: "index.html"
    },
    ui: false,
    open: false,
    notify: false
  });
  done();
};

// Reload Browser
const reloadBrowser = ( done ) => {
  browsersync.reload();
  done();
};

// Copy HTML Files
const copyHTML = () => {
  return gulp
  .src(
    paths.html.src
  )
  .pipe(
    gulp.dest(
      paths.html.dest
    )
  );
};
// Copy Assets Files
const copyAssets = () => {
  return gulp
  .src(
    paths.assets.src,
    {
      sinse: gulp.lastRun( copyAssets )
    }
  )
  .pipe(
    gulp.dest(
      paths.assets.dest
    )
  )
};
// Bundle JavaScript Files
const bundleJS = {
  prod: () => {
    return gulp
    .src(
      paths.js.src
    )
    .pipe(
      webpackstream(
        webpackconfig.prod,
        webpack
      )
    )
    .pipe(
      gulp.dest(
        paths.js.dest
      )
    );
  },
  dev: () => {
    return gulp
    .src(
      paths.js.src
    )
    .pipe(
      webpackstream(
        webpackconfig.dev,
        webpack
      )
    )
    .pipe(
      gulp.dest(
        paths.js.dest
      )
    );
  }
};
// Minify Image Files
const minifyImage = () => {
  return gulp
  .src(
    paths.image.src,
    {
      since: gulp.lastRun( minifyImage )
    }
  )
  .pipe(
    imagemin([
      minifyjpeg({
        quality: 80
      }),
      minifypng({
        quality: [.7, .85],
        speed: 1
      }),
      imagemin.svgo(),
      imagemin.gifsicle()
    ])
  )
  .pipe(
    gulp.dest(
      paths.image.dest
    )
  )
};

// Watch HTML Files
const watchHTML = ( done ) => {
  gulp
  .watch(
    paths.html.src,
    gulp.series(
      copyHTML,
      reloadBrowser
    )
  );
  done();
};
// Watch Assets Files
const watchAssets = ( done ) => {
  gulp
  .watch(
    paths.assets.src,
    gulp.series(
      copyAssets,
      reloadBrowser
    )
  );
  done();
};
// Watch Sass Files
const watchSass = ( done ) => {
  gulp
  .watch(
    paths.css.src,
    gulp.series(
      bundleJS.dev,
      reloadBrowser
    )
  );
  done();
};
// Watch JavaScript Files
const watchJS = ( done ) => {
  gulp
  .watch(
    paths.js.src,
    gulp.series(
      bundleJS.dev,
      reloadBrowser
    )
  );
  done();
};
// Watch Vue Files
const watchVue = ( done ) => {
  gulp
  .watch(
    paths.vue.src,
    gulp.series(
      bundleJS.dev,
      reloadBrowser
    )
  );
  done();
};
// Watch Image Files
const watchImage = ( done ) => {
  gulp
  .watch(
    paths.image.src,
    gulp.series(
      minifyImage,
      reloadBrowser
    )
  );
  done();
};

exports.dev = gulp.series(
  gulp.parallel(
    copyHTML,
    bundleJS.dev,
    minifyImage,
    copyAssets
  ),
  startSync,
  gulp.parallel(
    watchSass,
    watchHTML,
    watchJS,
    watchVue,
    watchImage,
    watchAssets
  )
);
exports.build = gulp.parallel(
  copyHTML,
  bundleJS.prod,
  minifyImage,
  copyAssets
);
exports.server = startSync;
