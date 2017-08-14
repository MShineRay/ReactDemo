//var browserify = require('browserify');
var gulp = require('gulp');
var del = require('del');
var gulpChanged = require('gulp-changed');//仅仅传递更改过的文件
var gulpFileInclude = require('gulp-file-include');//合并html;HTML 代码复用
var gulpSequence = require('gulp-sequence');// gulp顺序执行任务
var gulpUglify = require('gulp-uglify');//压缩js文件
var gulpCleanCss = require('gulp-clean-css');//压缩css文件
var gulpWatch = require('gulp-watch');
//var gulpMinifyCss = require('gulp-minify-css');//压缩css文件
//var gulpBabel = require('gulp-babel');
//var gulpLess = require('gulp-less');
//var gulpNotify = require('gulp-notify');
//var gulpPlumber = require('gulp-plumber');
//var gulpConcat = require('gulp-concat');
// var gulpRevAppend = require('gulp-rev-append');
//var vinylBuffer = require('vinyl-buffer');
//var vinylSourceStream = require('vinyl-source-stream');

var Ver = new Date().getTime();
var outDir = './out';//默认：输出目录

var FLAG_MIN_JS = true;//开关：是否压缩JS
var FLAG_MIN_CSS = true;//开关：是否压缩CSS
var files = {
  css: {
    src: ['./src/css/**/*.css', './src/css/**/*.less'],
    dest: outDir + '/css'
  },
  images: {
    src: ['./src/images/**'],
    dest: outDir + '/images'
  },
  lib: {
    src: ['./src/lib/**'],
    dest: outDir + '/lib'
  },
  js: {
    src: ['./src/js/**.js'],
    dest: outDir + '/js'
  },
  requireJS: {
    src: ['./src/*.js'],
    dest: outDir
  },
  '_layout': {
    src: ['./src/_layout/*.html']
    //dest:outDir// 布局文件无需copy
  },
  indexHtml: {
    src: ['./src/index.html'],
    dest: outDir
  },
  'business_html': {
    src: ['./src/html/**/*.html'],
    dest: outDir
  },
  'business_js': {
    src: ['./src/html/**/*.js', '!./src/html/**/*.html'],
    dest: outDir
  }
};

/**
 * 清空 out目录下文件
 */
gulp.task('clean_all', function (cb) {
  return del([
    outDir + '/**/*'
    // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
    //'dist/mobile/**/*',
    // 我们不希望删掉这个文件，所以我们取反这个匹配模式
    //'!dist/mobile/deploy.json'
  ], cb);
});

/**
 * 清空 out目录下文件
 */
gulp.task('clean_all', function (cb) {
  return del([
    outDir + '/**/*'
  ], cb);
});

gulp.task('clean_css', function (cb) {
  return del(files.css.dest, cb);
});

gulp.task('clean_js', function (cb) {
  return del(files.js.dest, cb);
});

gulp.task('clean_images', function (cb) {
  return del(files.images.dest, cb);
});

gulp.task('copy_lib', function () {
  return gulp.src(files.lib.src)
    // `changed` 任务需要提前知道目标目录位置
    // 才能找出哪些文件是被修改过的
    .pipe(gulpChanged(files.lib.dest))
    // 只有被更改过的文件才会通过这里
    .pipe(gulp.dest(files.lib.dest));
});

gulp.task('copy_images', ['clean_images'], function () {
  return gulp.src(files.images.src)
    .pipe(gulpChanged(files.images.dest))
    .pipe(gulp.dest(files.images.dest));
});

gulp.task('copy_css', ['clean_css'], function () {
  if(FLAG_MIN_CSS){
    return gulp.src(files.css.src)
      .pipe(gulpCleanCss({compatibility: 'ie7'}))
      .pipe(gulp.dest(files.css.dest));
  }else{
    return gulp.src(files.css.src)
      .pipe(gulp.dest(files.css.dest));
  }
});

gulp.task('copy_js', ['clean_js'], function () {
  if(FLAG_MIN_JS){
    return gulp.src(files.js.src)
      .pipe(gulpChanged(files.js.dest))
      .pipe(gulpUglify())
      .pipe(gulp.dest(files.js.dest));
  }else{
    return gulp.src(files.js.src)
      .pipe(gulpChanged(files.js.dest))
      .pipe(gulp.dest(files.js.dest));
  }
});

//require.js 目录
gulp.task('copy_requireJS', function () {
  return gulp.src(files.requireJS.src)
    .pipe(gulpChanged(files.requireJS.dest))
    .pipe(gulp.dest(files.requireJS.dest));
});

//index.html主页面
gulp.task('copy_indexHtml', function () {
  return gulp.src(files.indexHtml.src)
    .pipe(gulpChanged(files.indexHtml.dest))
    .pipe(gulp.dest(files.indexHtml.dest));
});

gulp.task('concat_html_business_css', function () {
  return gulp.src(files.business_html.src)
    .pipe(gulpFileInclude({
      prefix: '@@',
      basepath: './src/_layout',
      context: {
        Title: "---",
        CdnPrefix: ".",
        BodyCss: "",
        Text: "",
        Link: "",
        CSSVer: Ver
      }
    }))
    .pipe(gulp.dest(files.business_html.dest));
});

gulp.task('concat_html_business_js', function () {
  return gulp.src(files.business_html.src)
    .pipe(gulpFileInclude({
      prefix: '@@',
      basepath: './src/_layout',
      context: {
        Title: "",
        CdnPrefix: ".",
        BodyCss: "",
        Text: "",
        Link: "",
        JSVer: Ver
      }
    }))
    .pipe(gulp.dest(files.business_html.dest));
});

gulp.task('concat_html_business', function () {
  return gulp.src(files.business_html.src)
    .pipe(gulpFileInclude({
      prefix: '@@',
      basepath: './src/_layout',
      context: {
        Title: "---",
        CdnPrefix: ".",
        BodyCss: "",
        Text: "",
        Link: "",
        Ver: Ver
      }
    }))
    .pipe(gulp.dest(files.business_html.dest));
});

gulp.task('copy_js_business', function () {
  if(FLAG_MIN_JS){
    return gulp.src(files.business_js.src)
      .pipe(gulpUglify())
      .pipe(gulp.dest(files.business_js.dest));
  }else{
    return gulp.src(files.business_js.src)
      .pipe(gulp.dest(files.business_js.dest));
  }
});

gulp.task('watch_js_business', function () {
  return gulpWatch(files.business_js.src, function () {
    gulp.run('copy_js_business');
  });
});

gulp.task('watch_css', function () {
  // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
  return gulpWatch(files.css.src, function () {
    gulp.run('copy_css');
  });
});

gulp.task('watch_images', function () {
  return gulpWatch(files.images.src, function () {
    gulp.run('copy_images');
  });
});

gulp.task('watch_lib', function () {
  return gulpWatch(files.lib.src, function () {
    gulp.run('copy_lib');
  });
});

gulp.task('watch_js', function () {
  return gulpWatch(files.js.src, function () {
    gulp.run('copy_js');
  });
});

gulp.task('watch_requireJS', function () {
  return gulpWatch(files.requireJS.src, function () {
    gulp.run('copy_requireJS');
  });
});

gulp.task('watch_indexHtml', function () {
  return gulpWatch(files.indexHtml.src, function () {
    gulp.run('copy_indexHtml');
  });
});

gulp.task('watch_html', function () {
  var watchHtmlSrc = files.business_html.src.concat(files._layout.src);
  return gulpWatch(watchHtmlSrc, function () {
    gulp.run('concat_html_business');
  });
});

//gulp.task('watch', function () {
//  gulp.watch(files.css.src, ['copy_css']);
//  gulp.watch(files.images.src, ['copy_images']);
//  gulp.watch(files.lib.src, ['copy_lib']);
//  gulp.watch(files.js.src, ['copy_js']);
//  gulp.watch(files.requireJS.src, ['copy_requireJS']);
//  gulp.watch(files.indexHtml.src, ['copy_indexHtml']);
//  gulp.watch(files.business_html.src, ['concat_html_business']);
//  gulp.watch(files._layout.src, ['concat_html_business']);
//});

gulp.task('default', gulpSequence(
  'clean_all',
  [
    'copy_css',
    'copy_images',
    'copy_lib',
    'copy_js',
    'copy_requireJS',
    'copy_indexHtml',
    'concat_html_business',
    'copy_js_business'
  ],
  //'watch'
  [
    'watch_css',
    'watch_images',
    'watch_lib',
    'watch_js',
    'watch_requireJS',
    'watch_indexHtml',
    'watch_html',
    'watch_js_business'
  ]
  )
);