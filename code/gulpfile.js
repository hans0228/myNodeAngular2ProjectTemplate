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

var getCopyFilesPipe = (sourcePatten, targetPath) => {

    return gulp.src(sourcePatten)
        .pipe(gulp.dest(targetPath));

};

//=================================== Tasks ===================================

gulp.task("clean", (cb) => {

    rimraf("./_temp", () => {
        rimraf("./test", () => {
            rimraf("./dist", cb);
        });
    });

});

gulp.task("copyAssetsToDist", () => {

    var m = merge();

    var webAsset = gulp.src([
        "./src/web/**/*.html",
        "./src/web/**/*.css",
    ]).pipe(gulp.dest("./dist/node/web/"));
    m.add(webAsset);

    var clientAsset = gulp.src([
        "./src/client/**/*.html",
        "./src/client/**/*.css",
    ]).pipe(gulp.dest("./dist/system/script/client/"));
    m.add(clientAsset);

    var angular2 = gulp.src([
        "./node_modules/angular2/**/*.js",
        "./node_modules/angular2/**/*.js.map"
    ]).pipe(gulp.dest("./dist/system/scripts/node_modules/angular2/"));
    m.add(angular2);

    var system = gulp.src("./node_modules/systemjs/dist/**/*.*")
        .pipe(gulp.dest("./dist/system/scripts/node_modules/systemjs/dist/"));
    m.add(system);

    var rxjs = gulp.src("./node_modules/rxjs/**/*.js")
        .pipe(gulp.dest("./dist/system/scripts/node_modules/rxjs/"));
    m.add(rxjs);

    var es6Shim = gulp.src("./node_modules/es6-shim/**/*.js")
        .pipe(gulp.dest("./dist/system/scripts/node_modules/es6-shim/"));
    m.add(es6Shim);

    return m;

});

gulp.task("copyTestToDist", () => {

    var m = merge();

    var all = gulp.src([
        "./test/**/*",
        "!./test/node/core.test{,/**/*}",
        "!./test/node/web.test{,/**/*}",
        "!./test/system/scripts/client.test{,/**/*}",
    ]).pipe(gulp.dest("./dist"));
    m.add(all);

    return m;

});

gulp.task('ts_compile', () => {

    var m = merge();

    var tsWeb = tsCompiler(
        [
            "./src/web/**/*.ts",
        ],
        "tsconfig_node.json",
        "src/web",
        "./test/node/web",
        false
    );
    m.add(tsWeb);

    var tsCore = tsCompiler(
        [
            "./src/core/**/*.ts",
        ],
        "tsconfig_node.json",
        "src/core",
        "./test/node/core",
        false
    );
    m.add(tsCore);

    var tsCoreTest = tsCompiler(
        [
            "./src/core.test/**/*.ts",
        ],
        "tsconfig_node.json",
        "src/core.test",
        "./test/node/core.test",
        false
    );
    m.add(tsCoreTest);

    var tsClient = tsCompiler(
        [
            "./src/client/**/*.ts",
        ],
        "tsconfig_node.json",
        "src/client",
        "./test/system/scripts/client",
        false
    );
    m.add(tsClient);

    var tsClientTest = tsCompiler(
        [
            "./src/client.test/**/*.ts",
        ],
        "tsconfig_node.json",
        "src/client.test",
        "./test/system/scripts/client.test",
        false
    );
    m.add(tsClientTest);

    var tsClientCore = tsCompiler(
        [
            "./src/core/**/*.ts",
        ],
        "tsconfig_node.json",
        "src/core",
        "./test/system/scripts/core",
        false
    );
    m.add(tsClientCore);

    return m;

});

gulp.task('ts_compileForAngular2', () => {

    var m = merge();

    var tsClientAngular2 = tsCompiler(
        [
            "./src/client/**/*.ts",
        ],
        "tsconfig_angular2.json",
        "src/client",
        "./dist/system/scripts/client",
        false
    );
    m.add(tsClientAngular2);

    var tsCoreAngular = tsCompiler(
        [
            "./src/core/**/*.ts",
        ],
        "tsconfig_angular2.json",
        "src/client",
        "./dist/system/scripts/core",
        false
    );
    m.add(tsCoreAngular);

    return m;

});

gulp.task("test_node", function() {

    return gulp.src(
        [
            "./test/**/*.spec.js"
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
            "ts_compile",
        ],
        [
            "test_node",
        ],
        [
            "copyAssetsToDist",
            "copyTestToDist",
            "ts_compileForAngular2",
        ],
        cb
    );
});

gulp.task("server", () => {

    var serverfilePath = "./dist/node/web/server.js";

    nodemon({
        script: serverfilePath,
        ext: "html js",
        env: {
            "NODE_ENV": 'development',
            "port": 1236
        }
        //ignore: ["ignored.js"],
        //tasks: ["lint"] ,
    }).on("restart", () => {
        console.log("restarted!")
    });

});


