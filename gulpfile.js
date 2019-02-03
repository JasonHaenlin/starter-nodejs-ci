require('dotenv').config();
const gulp = require('gulp');
// const istanbul = require('gulp-istanbul');
// const mocha = require('gulp-mocha');
const sonarqubeScanner = require('sonarqube-scanner');

gulp.task('sonar', (callback) => {
  sonarqubeScanner({
    serverUrl: process.env.SONAR_HOST_URL,
    token: process.env.SONAR_AUTH_TOKEN,
    options: {
      'sonar.projectKey': 'ps6-otake-back',
      'sonar.sources': 'app',
      'sonar.tests': 'tests',
      'sonar.test.inclusions': '**/*.spec.js',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info'
    }
  }, callback);
});
