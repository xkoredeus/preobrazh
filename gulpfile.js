var gulp       = require('gulp'), // Подключаем Gulp
  sass         = require('gulp-sass'), //Подключаем Sass пакет,
  browserSync  = require('browser-sync'), // Подключаем Browser Sync
  concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
  uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
  cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
  rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
  del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
  imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
  pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
  cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
  autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск Sass
  return gulp.src('app/sass/**/*.sass') // Берем источник
    .pipe(sass({outputStyle: 'expanded'})) // Преобразуем Sass в CSS посредством gulp-sass
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false })) // Создаем префиксы
    .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
    .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
  browserSync({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: 'app' // Директория для сервера - app
    },
    notify: false // Отключаем уведомления
  });
});

gulp.task('scripts', function() {
  return gulp.src([ // Берем все необходимые библиотеки
    'app/libs/jquery/jquery.min.js',
    'app/libs/fancybox/jquery.fancybox.min.js',
    'app/libs/owl.carousel/owl.carousel.min.js',
    'app/libs/slick/slick.min.js'
    ])
    .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
    // .pipe(uglify()) // Сжимаем JS файл
    .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('css-libs', function() {
  return gulp.src([
    'app/libs/bootstrap/bootstrap.min.css',
    'app/libs/fancybox/jquery.fancybox.min.css',
    'app/libs/owl.carousel/owl.carousel.min.css',
    'app/libs/slick/slick.css'
    ]) // Выбираем файлы для минификации
    .pipe(concat('libs.min.css'))
    .pipe(cssnano()) // Сжимаем
    .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('clean', function() {
  return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
  return gulp.src('app/img/**/*') // Берем все изображения из app
    .pipe(cache(imagemin({ // С кешированием
    // .pipe(imagemin({ // Сжимаем изображения без кеширования
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))/**/)
    .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

  var buildCss = gulp.src([ // Переносим библиотеки в продакшен
    'app/css/main.css',
    'app/css/libs.min.css'
    ])
  .pipe(gulp.dest('dist/css'))

  var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
  .pipe(gulp.dest('dist/fonts'))

  var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
  .pipe(gulp.dest('dist/js'))

  var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
  .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
  return cache.clearAll();
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
  gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch(['app/js/scripts.js', 'app/libs/**/*.js'], browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('default', ['watch']);