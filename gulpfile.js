'use strict';

// html
const ejs = require('gulp-ejs');
const htmlMin = require('gulp-htmlmin');
const htmlWebp = require('gulp-webp-html');
const replace = require('gulp-replace');

// style
const scss = require('gulp-sass');
const styleMin = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const styleMediaGroup = require('gulp-group-css-media-queries');
const unuseStyle = require('gulp-uncss');
const styleWebp = require('gulp-webpcss');
const styleLint = require('gulp-stylelint');

// js
const scriptLint = require('gulp-eslint');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

// images
const imagemin = require('gulp-image');
const webp = require('gulp-cwebp');
const favicons = require('gulp-favicons');

// fonts

// other tools
const browserSync = require('browser-sync').create();
const { watch, parallel, dest, src, series } = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const sourceMap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const yargs = require('yargs');
const changed = require('gulp-changed');

// Imports finish

// Main settings
const argv = yargs.argv;
const production = !!argv.production;
const sourceFolder = 'src';
const projectFolder = 'dist';
webpackConfig.mode = production ? 'production' : 'development';
webpackConfig.devtool = production ? false : 'source-map';

// Path settings
const path = {
    build: {
        html: `${ projectFolder }/`,
        style: `${ projectFolder }/style/`,
        script: `${ projectFolder }/js/`,
        img: `${ projectFolder }/images/`,
        icons: `${ projectFolder }/images/icons/`,
        favicons: `${ projectFolder }/images/favicons/`,
        fonts: `${ projectFolder }/fonts/`
    },
    src: {
        html: `${ sourceFolder }/*.ejs`,
        style: `${ sourceFolder }/style/*.scss`,
        script: `${ sourceFolder }/js/index.js`,
        img: `${ sourceFolder }/images/**/*.{jpeg,png,gif,svg,webp}`,
        icons: `${ sourceFolder }/images/icons/*.svg`,
        favicons: `${ sourceFolder }/favicon.png`,
        fonts: `${ sourceFolder }/fonts/**/*.*`
    },
    watch: {
        html: `${ sourceFolder }/*.ejs`,
        blocks: `${ sourceFolder }/blocks/**/*.*`,
        style: `${ sourceFolder }/style/**/*.scss`,
        script: `${ sourceFolder }/js/**/*.js`,
        img: `${ sourceFolder }/images/**/*.{jpeg,png,gif,svg,webp}`
    },
    clean: [`./${ projectFolder }/`, './site.zip']
};

function clean() {
    return del(path.clean);
}

function browserSyncDevelopment() {
    browserSync.init({
        server: {
            baseDir: `./${ projectFolder }/`
        },
        port: 4000,
        notify: false
    });
}

function watchDevelopment() {
    watch([path.watch.html], htmlDevelopment);
    watch([path.watch.blocks], series(styleDevelopment, htmlDevelopment, scriptDevelopment));
    watch([path.watch.style], styleDevelopment);
    watch([path.watch.script], scriptDevelopment);
    watch([path.watch.img], imagesDevelopment);
}

function styleLinter() {
    return src(path.src.style)
        .pipe(plumber())
        .pipe(styleLint({
            reporters: [
                {
                    formatter: 'string',
                    console: true
                }
            ]
        }));
}

function scriptLinter() {
    return src(path.src.script)
        .pipe(scriptLint())
        .pipe(scriptLint.format());
}

function htmlDevelopment() {
    return src(path.src.html)
        .pipe(plumber())
        .pipe(changed(path.build.html, { extension: '.ejs' }))
        .pipe(replace(/>\s<\/head>/i, '><%- include("../.wfLayout/linkicon.ejs") %></head>'))
        .pipe(ejs())
        .pipe(rename({ extname: '.html' }))
        .pipe(replace(/\.(scss|sass)/g, '.css'))
        .pipe(replace(/(\.\.\/)+/g, ''))
        .pipe(htmlWebp())
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream());
}

function htmlProduction() {
    return src(path.src.html)
        .pipe(replace(/>\s<\/head>/i, '><%- include("../.wfLayout/linkicon.ejs") %></head>'))
        .pipe(ejs())
        .pipe(rename({ extname: '.html' }))
        .pipe(replace(/\.(scss|sass)/g, '.css'))
        .pipe(replace(/(\.\.\/)+/g, ''))
        .pipe(htmlWebp())
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(replace('.css', '.min.css'))
        .pipe(replace('.js', '.min.js'))
        .pipe(dest(path.build.html));
}

function styleDevelopment() {
    return src(path.src.style)
        .pipe(plumber())
        .pipe(changed(path.build.style, { extension: '.scss' }))
        .pipe(sourceMap.init())
        .pipe(scss({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            cascade: false,
            grid: true
        }))
        .pipe(replace(/(\.\.\/)+/g, '../'))
        .pipe(dest(path.build.style))
        .pipe(sourceMap.write('.'))
        .pipe(browserSync.stream());
}

function styleProduction() {
    return src(path.src.style)
        .pipe(scss({
            outputStyle: 'expanded'
        }))
        .pipe(replace(/(\.\.\/)+/g, '../'))
        .pipe(styleMediaGroup())
        .pipe(autoprefixer({
            cascade: false,
            grid: true
        }))
        .pipe(styleMin())
        .pipe(unuseStyle({
            html: ['./dist/*.html'],
            ignore: [/.show/, /.hidden/, /.visible/, /.finished/, /.close/, /.active/, /.open/]
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(styleWebp({}))
        .pipe(dest(path.build.style));
}

function scriptDevelopment() {
    return src(path.src.script)
        .pipe(plumber())
        .pipe(sourceMap.init())
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(sourceMap.write('.'))
        .pipe(dest(path.build.script))
        .pipe(browserSync.stream());
}

function scriptProduction() {
    return src(path.src.script)
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest(path.build.script));
}

function imagesDevelopment() {
    return src(path.src.img)
        .pipe(changed(path.build.img, { extension: '.{jpg|png|jpeg|gif|svg}' }))
        .pipe(webp())
        .pipe(src(path.src.img))
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream());
}

function imagesProduction() { // run not on linux
    return src(path.src.img)
        .pipe(changed(path.build.img, { extension: '.{jpg|png|jpeg|gif|svg}' }))
        .pipe(webp())
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true // defaults to false
        }))
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream());
}

function fontsDevelopment() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts));
}

function fontsProduction() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts));
}

function faviconsDevelopment() {
    return src(path.src.favicons, { allowEmpty: true })
        .pipe(favicons({
            icons: {
                appleIcon: true,
                favicons: true,
                online: false,
                appleStartup: false,
                android: false,
                firefox: false,
                yandex: false,
                windows: false,
                coast: false
            }
        }))
        .pipe(dest(path.build.favicons));
}

function faviconsProduction() {
    return src(path.src.favicons, { allowEmpty: true })
        .pipe(favicons({
            icons: {
                appleIcon: true,
                favicons: true,
                online: false,
                appleStartup: false,
                android: false,
                firefox: false,
                yandex: false,
                windows: false,
                coast: false
            }
        }))
        .pipe(dest(path.build.favicons));
}

if (!production) {
    const build = series(
        clean,
        htmlDevelopment,
        styleDevelopment, styleLinter,
        scriptDevelopment, scriptLinter,
        scriptDevelopment,
        imagesDevelopment,
        fontsDevelopment,
        faviconsDevelopment
    );
    const watcher = parallel(watchDevelopment, browserSyncDevelopment, build);
    
    exports.lint = series(styleLinter, scriptLinter);
    exports.build = build;
    exports.watch = watcher;
} else {
    const build = series(
        clean,
        htmlProduction,
        styleProduction,
        scriptProduction,
        imagesProduction,
        fontsProduction,
        faviconsProduction
    );
    
    exports.lint = series(styleLinter, scriptLinter);
    exports.build = build;
}
