# Technologies

## Development Environment

- Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine.  
- Gulp - Used to automate the build process (https://github.com/gulpjs/gulp)
- Browserify - Used to bundle all JavaScript files into a single bundle.js file (http://browserify.org/)
- Babel - A JavaScript compiler used to compile the latest ECMAScript 2015(ES2015) JavaScript code into ECMAScript 6 more widely supported by modern web browsers (https://babeljs.io/). 
- Eslint - A linting utility for JavaScript and JSX (http://eslint.org/)
- Jest - A unit testing framework created by Facebook for React (https://facebook.github.io/jest/)

## Website
- React - The React JavaScript library v0.14.7 (https://facebook.github.io/react/)
- React Router - A routing library that works with React (https://github.com/reactjs/react-router)
- Flux - One of several possible application architectures used for building React applications (https://facebook.github.io/flux/)
- Material UI - A UI framework built on top of React and Google's Material Design project (http://www.material-ui.com/)
- Bootstrap - A popular HTML, CSS and JS framework for building responsive web applications (http://getbootstrap.com/)
- JSData - Framework for communicating with backend (i.e. RESTful services)

# Getting Started

## Install Node.js

Download and install Node.js (https://nodejs.org/en/)

## Install Global Dependencies

Open a Node.js command prompt and run the following commands

````
npm install -g gulp
````

## Install Project Dependencies

Open a Node.js command prompt and run the following commands

````
cd <path>\react-starter
npm install
````

## Build and Launch Development Web Server

````
cd <path>\react-starter
gulp
````


# Unit Tests

## Run all unit tests and gather code coverage
````
npm run test
  or
jest --coverage
````

## Run all unit tests, gather code coverage, and re-run when changes occur
````
npm run test-watch
  or
jest --watch --coverage
````

## Run all unit tests and output results in JSON format for Continuous Integration Server
````
npm run test-ci
  or
jest --json
````

# Build Environment / Gulp

Gulp (https://github.com/gulpjs/gulp) is one of many available tools to automate the build process.  Other alternatives include Grunt, Brunch, and Webpack.  

The gulpfile.js is used to configure the tasks that automate the build process.  Below are some example commands that you can run:

## Gulp Configuration

The gulpfile.js file contains a 'config' section where you can modify high level configurations for the  build process.  You may also need to customize various gulp tasks in the gulpfile.js for your project. Gulp has good documentation available at http://gulpjs.com/ and https://github.com/gulpjs/gulp.  


## Build and Launch Development Web Server
Perform build of JavaScript, HTML and CSS. Also launches a development web server at http://localhost:8080 and uses gulp-watch to automatically refresh the page whenever a changes is made to .js, .html or .scss files. 
````
gulp
````

## Perform a build of JavaScript, HTML and CSS
````
gulp build
````

## Performs a build of JavaScript, HTML and CSS for production environment.
````
gulp build-prod
````


# Files / Directory Structure

## <root>

- package.json - package file used to describe the project and list Node dependencies.
- .babelrc - configuration file used by Babel
- gulpfile.js - configuration file used by Gulp

## <root>/src
The src directory contains all the files used by the website (HTML, JavaScript, CSS/SCSS and images). 

- index.html - The root index.html for the application
- js/client.js - The entry point for the application.
- js/config.js - A place to add configuration entries for the application
- js/routes.js - Builds the routes used by the application
- js/api/* - Files used to connect to various RESTful Web APIs
- js/components/* - UI components built on top of React
- js/core/* - Various helper classes
- js/dispatcher/* - Default Dispatcher used by Flux
- scss/* - SCSS files that are compiled into CSS during the build process

## <root>/node_modules
The node_modules directory contains project dependencies installed by running 'npm install'.  The dependencies configured can befound in the package.json file.  