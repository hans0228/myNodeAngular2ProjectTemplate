var gulp = require("gulp");
var shell = require("gulp-shell");
var merge = require("merge-stream")();
var rimraf = require("rimraf");
var runSequence = require("run-sequence");

var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var path = require('path');

//=================================== Global Variable ===================================

//var webrootPath = "../Web/wwwroot";
var webrootPath = "./test/web";
var webrootPathCopy = webrootPath + "/b";
var tempPath = "_temp";

//=================================== Method ===================================

var tsCompiler = function(
    pathArr,
    tsconfigPath,
    sroucemapPostfix,
    targetPath,
    isUglify) {

    return gulp.src(pathArr)
        .pipe(sourcemaps.init())
        .pipe(ts(ts.createProject(tsconfigPath)))
        .js
        //.pipe(uglify())
        .pipe(sourcemaps.write("./", {
            includeContent: false,
            sourceRoot: function(file) {
                var arr = file.relative.split("/");
                var prefix = "";
                for (var i = 0; i < arr.length; i++) {
                    prefix += "../";
                }
                return prefix + sroucemapPostfix;
            }
        }))
        .pipe(gulp.dest(targetPath));
};

var deletePathAsync = (str) => {
    var p = new Promise((resolve, reject) => {
        rimraf(str, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
    return p;
};

var getCopyFilesPipe = (sourcePatten, targetPath) => {

    return gulp.src(sourcePatten)
        .pipe(gulp.dest(targetPath));

};

//=================================== Tasks ===================================



gulp.task('default', function() {

    return tsCompiler(
        [
            './src/web/**/*.ts',
        ],
        'tsconfig_node.json',
        "src/web",
        "./dist/web",
        false
    );

});
