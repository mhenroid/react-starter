"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Run local dev server
var open = require('gulp-open'); // Open a url in a browser
var browserify = require('browserify'); // Bundles JS
var babelify = require('babelify'); // Perform babel transpilation from ES6 to ES5
var source = require('vinyl-source-stream'); // Uses conventional text streams with gulp
var concat = require('gulp-concat'); // Concatenates files
var eslint = require('gulp-eslint'); // Lint JS files, including JSX
var env = require('gulp-env'); // Used to set environment variables
var uglify = require('gulp-uglify'); // Used for minification and uglification
var streamify = require('gulp-streamify'); // Used as part of uglification
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var config = {
    // Set to true to force uglification to take place in production
    // You can build for production by running 'gulp build-prod'
    uglifyInProduction: true,
    
    // The port to use when running the website on your localhost
    devPort: 8090,
    
    // The base url when running on your localhost
    devBaseUrl: 'http://localhost',
    
    // Various paths used by the build process
    paths: {
        src: {
            // The root JavaScript file used by browserify to build the bundle.js 
            clientJs: './src/js/client.js',
            
            // Path to html files
            html: './src/*.html',
            
            // Path to JavaScript files
            js: './src/js/**/*.js',
            
            // Path to image files
            images: './src/images/*',
            
            // Path to CSS files
            css: {
                // css files used to build the bundle-base.css
                base: [
                    'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
                ],
                // css / scss files used to build the app.css
                app: './src/scss/**/*.scss'
            },
        },
        // Output paths for the build
        dist: {
            // Root path where html files are written
            root: './dist',
            
            // Path where bundle.js is written
            js: './dist/js',
            
            // Path where bundle-base.css and app.css are written
            css: './dist/css',
            
            // Path where images are written
            images: './dist/images'
        }
    }
};

//-----------------------------
// Compile JavaScript code
//-----------------------------
gulp.task('js', function() {
    var isProduction = process.env.NODE_ENV === 'production';
    
    // Create the bundle.js into a stream
    var bundle = 
        browserify({
            entries: config.paths.src.clientJs,
            debug: !isProduction
        })
        .transform(babelify) // Transform sourcecode from jsx to javaScript
        .bundle() // Bundle files and their dependencies into a single .js file
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js')); // Pipe code to bundle.js
    
    // Perform uglification if enabled  
    if(config.uglifyInProduction && isProduction) {
        bundle = bundle.pipe(streamify(uglify()));
    }
    
    // Write file to dist directory
    bundle
        .pipe(gulp.dest(config.paths.dist.js))
        .pipe(connect.reload());
});

//-----------------------------
// Performing linting of JavaScript files
//-----------------------------
gulp.task('lint', function() {
    return gulp.src(config.paths.src.js)
    .pipe(eslint({config: '.eslintrc'}))
    .pipe(eslint.format());
});

//-----------------------------
// Copy static html files
//-----------------------------
gulp.task('html', function() {
    gulp.src(config.paths.src.html)
        .pipe(gulp.dest(config.paths.dist.root))
        .pipe(connect.reload());
});

//-----------------------------
// Compile CSS and SCSS
//-----------------------------
gulp.task('css', function() {
    
    // Create base.css from 3rd party libraries
    gulp.src(config.paths.src.css.base)
        .pipe(concat('base.css'))
        .pipe(gulp.dest(config.paths.dist.css));
    
    // Create app.css from scss specific to this application
    gulp.src(config.paths.src.css.app)
        .pipe(sourcemaps.init())
        .pipe(
            sass({outputStyle: 'compressed'})
            .on('error', console.error.bind(console))
        )
        .pipe(sourcemaps.write())
        .pipe(concat('app.css')) // Concatenate into bundle.css
        .pipe(gulp.dest(config.paths.dist.css)) // Save to css folder
        .pipe(connect.reload());
});

//-----------------------------
// Copy images
//-----------------------------
gulp.task('images', function() {
    gulp.src(config.paths.src.images)
    .pipe(gulp.dest(config.paths.dist.images))
    .pipe(connect.reload());
    
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist.root));
});

//-----------------------------
// Start local development server
//-----------------------------
gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.devPort,
        base: config.devBaseUrl,
        livereload: true
    });
    
});

//-----------------------------
// Open index.html in browser
//-----------------------------
gulp.task('open', ['connect'], function() {
    
    gulp.src(config.paths.dist.root + '/index.html') 
        .pipe(open({
            uri: config.devBaseUrl + ":" + config.devPort
        }));
});


//-----------------------------
// Automatically watch html / js files for changes
//-----------------------------
gulp.task('watch', function() {
    gulp.watch(config.paths.src.html, ['html']);
    gulp.watch(config.paths.src.js, ['js', 'lint']);
    gulp.watch(config.paths.src.css.app, ['css']);
});

//-----------------------------
// Set environment variables for production environment
//-----------------------------
gulp.task('set-env-prod', function() {
    env({
        "vars": { 
            "NODE_ENV": "production"    
        }
    });
    console.log(process.env.NODE_ENV);
});

//-----------------------------
// Tasks to be run from command line
//-----------------------------
gulp.task('build', ['lint', 'js', 'html', 'css', 'images']);
gulp.task('build-prod', ['set-env-prod', 'build']);
gulp.task('default', ['build', 'open', 'watch']);