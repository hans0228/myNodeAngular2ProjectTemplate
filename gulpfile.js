var gulp = require("gulp");
var shell = require("gulp-shell");
var merge = require("merge-stream");
var rimraf = require("rimraf");
var runSequence = require("run-sequence");
var mocha = require("gulp-mocha");

var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var path = require('path');

var nodemon = require("gulp-nodemon");

//=================================== Global Variable ===================================

// var webrootPath = "../Web/wwwroot";
// var webrootPath = "./dist/web";
// var webrootPathCopy = webrootPath + "/b";
// var tempPath = "_temp";

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

gulp.task("clean", (cb) => {

    deletePathAsync("./test")
        .then(() => {
            deletePathAsync("./dist");
        })
        .catch(() => { })
        .then(() => {
            cb();
        });

});

gulp.task("copyAssetsToTest", () => {

    var m = merge();
    
    var asset = gulp.src([
        "./src/**/*.html",
        "./src/**/*.css",
    ]).pipe(gulp.dest("./test"));
    m.add(asset);

    return m;

});

gulp.task("copyTestToDist", () => {

    var m = merge();    

    var all = gulp.src([
        "./test/**/*",
        "!./test/client.test{,/**/*}",
        "!./test/core.test{,/**/*}",
        "!./test/web.test{,/**/*}",
    ]).pipe(gulp.dest("./dist"));
    m.add(all);

    return m;

});

gulp.task('ts_web', () => {

    return tsCompiler(
        [
            './src/web/**/*.ts',
        ],
        'tsconfig_node.json',
        "src/web",
        "./test/web",
        false
    );

});

gulp.task("test_node", function() {

    return gulp.src([
        "./test/core.client/**/*.js",
        "./test/core.test/**/*.js",
        "./test/web.test/**/*.js"
    ], {
            read: false
        })
        .pipe(mocha({
            reporter: "spec"
        }));

});

gulp.task("default", (cb) => {
    runSequence(
        "clean",
        [
            "ts_web",
            "copyAssetsToTest",
        ],
        "copyTestToDist",
        "test_node",
        cb
    );
});

gulp.task("server", () => {

    var serverfilePath = "./dist/web/server.js";

    nodemon({
        script: serverfilePath,
        ext: "html js",
        env: { 'NODE_ENV': 'development' }
        //ignore: ["ignored.js"],
        //tasks: ["lint"] ,
    }).on("restart", () => {
        console.log("restarted!")
    });

});


