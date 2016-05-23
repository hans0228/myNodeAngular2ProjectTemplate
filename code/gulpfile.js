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

var tsCompiler = function (
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
            sourceRoot: function (file) {
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

var getCopyFilesPipe = (sourcePatten, targetPath) => {

    return gulp.src(sourcePatten)
        .pipe(gulp.dest(targetPath));

};

//=================================== Tasks ===================================

gulp.task("clean", (cb) => {

    rimraf("./features", () => {
        rimraf("./dist", cb);
    });

});

gulp.task("copyAssetsToFeatures", () => {

    var m = merge();

    var features = gulp.src([
        "./src/**/*.feature",
    ]).pipe(gulp.dest("./features/"));
    m.add(features);

    return m;

});

gulp.task("copyAssetsToDist", () => {

    var m = merge();

    var webAsset = gulp.src([
        "./src/nodejs/web/**/*.html",
        "./src/nodejs/web/**/*.css",
    ]).pipe(gulp.dest("./dist/nodejs/web/"));
    m.add(webAsset);

    var clientAsset = gulp.src([
        "./src/systemjs/client/**/*.html",
        "./src/systemjs/client/**/*.css",
        "./src/systemjs/client/**/*.js",
    ]).pipe(gulp.dest("./dist/systemjs/scripts/systemjs/client/"));
    m.add(clientAsset);

    var angular2 = gulp.src([
        "./node_modules/@angular/**/*.js",
        "./node_modules/@angular/**/*.js.map"
    ]).pipe(gulp.dest("./dist/systemjs/scripts/node_modules/@angular/"));
    m.add(angular2);

    var system = gulp.src("./node_modules/systemjs/dist/**/*.*")
        .pipe(gulp.dest("./dist/systemjs/scripts/node_modules/systemjs/dist/"));
    m.add(system);

    var rxjs = gulp.src("./node_modules/rxjs/**/*.js")
        .pipe(gulp.dest("./dist/systemjs/scripts/node_modules/rxjs/"));
    m.add(rxjs);

    var es6Shim = gulp.src("./node_modules/es6-shim/**/*.js")
        .pipe(gulp.dest("./dist/systemjs/scripts/node_modules/es6-shim/"));
    m.add(es6Shim);

    var zonejs = gulp.src("./node_modules/zone.js/**/*.js")
        .pipe(gulp.dest("./dist/systemjs/scripts/node_modules/zone.js/"));
    m.add(zonejs);

    var zonejs = gulp.src("./node_modules/zone.js/**/*.js")
        .pipe(gulp.dest("./dist/systemjs/scripts/node_modules/zone.js/"));
    m.add(zonejs);

    var reflectMetadata = gulp.src("./node_modules/reflect-metadata/**/*.js")
        .pipe(gulp.dest("./dist/systemjs/scripts/node_modules/reflect-metadata/"));
    m.add(reflectMetadata);

    return m;

});

gulp.task('ts_compile_es6_features', () => {

    var m = merge();

    var tsNodejs = tsCompiler(
        [
            "./src/nodejs/**/*.ts",
        ],
        "tsconfig_es6_commonjs.json",
        "src/nodejs",
        "./features/nodejs",
        false
    );
    m.add(tsNodejs);

    var tsNodejsTest = tsCompiler(
        [
            "./src/nodejs.test/**/*.ts",
        ],
        "tsconfig_es6_commonjs.json",
        "src/nodejs.test",
        "./features/nodejs.test",
        false
    );
    m.add(tsNodejsTest);

    var tsShareware = tsCompiler(
        [
            "./src/shareware/**/*.ts",
        ],
        "tsconfig_es6_commonjs.json",
        "src/shareware",
        "./features/shareware",
        false
    );
    m.add(tsShareware);

    var tsSharewareTest = tsCompiler(
        [
            "./src/shareware.test/**/*.ts",
        ],
        "tsconfig_es6_commonjs.json",
        "src/shareware.test",
        "./features/shareware.test",
        false
    );
    m.add(tsSharewareTest);

    var tsSystemjs = tsCompiler(
        [
            "./src/systemjs/**/*.ts",
        ],
        "tsconfig_es6_commonjs.json",
        "src/systemjs",
        "./features/systemjs",
        false
    );
    m.add(tsSystemjs);

    var tsSystemjsTest = tsCompiler(
        [
            "./src/systemjs.test/**/*.ts",
        ],
        "tsconfig_es6_commonjs.json",
        "src/systemjs.test",
        "./features/systemjs.test",
        false
    );
    m.add(tsSystemjsTest);

    return m;

});

gulp.task('ts_compile_es6_dist', () => {

    var m = merge();

    var tsNodejs = tsCompiler(
        [
            "./src/nodejs/**/*.ts",
        ],
        "tsconfig_es6_commonjs.json",
        "src/nodejs",
        "./dist/nodejs",
        false
    );
    m.add(tsNodejs);

    var tsShareware = tsCompiler(
        [
            "./src/shareware/**/*.ts",
        ],
        "tsconfig_es6_commonjs.json",
        "src/shareware",
        "./dist/shareware",
        false
    );
    m.add(tsShareware);

    var tsClient = tsCompiler(
        [
            "./src/systemjs/**/*.ts",
        ],
        "tsconfig_es6_systemjs.json",
        "src/systemjs",
        "./dist/systemjs/scripts/systemjs",
        false
    );
    m.add(tsClient);

    var tsClientShareware = tsCompiler(
        [
            "./src/shareware/**/*.ts",
        ],
        "tsconfig_es6_systemjs.json",
        "src/shareware",
        "./dist/systemjs/scripts/shareware",
        false
    );
    m.add(tsClientShareware);

    return m;

});

gulp.task("test_node", shell.task([
    'cucumber.js'
]));

gulp.task("default", (cb) => {
    runSequence(
        "clean",
        [
            "ts_compile_es6_features",
            "ts_compile_es6_dist",
            "copyAssetsToDist",
            "copyAssetsToFeatures",
        ],
        [
            "test_node",
        ],
        cb
    );
});

gulp.task("server", () => {

    var serverfilePath = "./dist/nodejs/web/server.js";

    nodemon({
        script: serverfilePath,
        ext: "html js",
        env: {
            "NODE_ENV": 'development',
            "port": 1237
        }
        //ignore: ["ignored.js"],
        //tasks: ["lint"] ,
    }).on("restart", () => {
        console.log("restarted!")
    });

});


