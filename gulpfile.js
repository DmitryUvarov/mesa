const gulp = require('gulp');
const del = require('del');
const browsersync = require("browser-sync").create();
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require("gulp-file-include");
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const scss = require('gulp-sass')(require('sass'));
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const groupMedia = require('gulp-group-css-media-queries');
const webp = require('gulp-webp');
const webphtml = require('gulp-webp-html');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');


let path = {
    build: {
        html: "build/",
        css: "build/css/",
        js: "build/js/",
        img: "build/img/",
        fonts: "build/fonts/",
        json: "build/json/",
    },
    source: {
        html: ["source/*.html", "!source/_*.html"],
        css: "source/scss/style.scss",
        js: "source/js/script.js",
        img: "source/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: "source/fonts/*.ttf",
        json: "source/json/*.*",
    },
    watch: {
        html: "source/**/*.html",
        css: "source/scss/**/*.scss",
        js: "source/js/**/*.js",
        img: "source/img/**/*.{jpg,png,svg,gif,ico,webp}",
        json: "source/json/*.*",
    },
    clean: "./build/"
}


function html() {
    return gulp.src(path.source.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(gulp.dest(path.build.html))
};


function css() {
    return gulp.src(path.source.css)
        .pipe(sourcemaps.init())
        .pipe(scss().on('error', scss.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(groupMedia())
        //.pipe(webpcss())
        .pipe(gulp.dest(path.build.css))
        .pipe(cleanCss())
        .pipe(rename("style.min.css"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css))
        .pipe(browsersync.stream())
};


function js() {
    return gulp.src(path.source.js)
        .pipe(sourcemaps.init())
        .pipe(fileinclude())
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(rename("script.min.js"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.js))
        .pipe(browsersync.stream())
};


function images() {
    return gulp.src(path.source.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 2 // 0 to 7
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(webp(webp({ quality: 80 })))
        .pipe(gulp.dest(path.build.img))
};


function sprite() {
    return gulp.src('source/iconsprite/*.svg')
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest(path.build.img));
};


function fonts() {
    gulp.src(path.source.fonts)
        .pipe(ttf2woff())
        .pipe(gulp.dest(path.build.fonts));
    return gulp.src(path.source.fonts)
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.build.fonts));
};

function otf2ttf() {
    return gulp.src('source/fonts/*.otf')
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(gulp.dest('source/fonts/'));
};



function server() {
    browsersync.init({
        server: { baseDir: "build/" },
        port: 3000,
        notify: false
    })

    gulp.watch(path.watch.css, gulp.series(css));
    gulp.watch(path.watch.js, gulp.series(js));
    gulp.watch(path.watch.html, gulp.series(html, reloadpage));
    gulp.watch(path.watch.img, gulp.series(images));
};
function reloadpage(done) {
    browsersync.reload();
    done();
};

const clean = () => del(path.clean);
const build = gulp.series(clean, css, js, html, images, sprite, otf2ttf, fonts);
const start = gulp.series(server);

exports.build = build;
exports.default = build;
exports.start = start;