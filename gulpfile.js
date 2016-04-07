var gulp = require("gulp");
var shell = require("gulp-shell");
var merge = require("merge-stream");
var rimraf = require("rimraf");
var runSequence = require("run-sequence");
var mocha = require("gulp-mocha");

var ts = require("gulp-typescript");
var babel = require('gulp-babel');
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
        .then(()=>{
            deletePathAsync("./_temp");            
        })
        .catch(() => { })
        .then(() => {
            cb();
        });

});

gulp.task("copyAssetsToTest", () => {

    var m = merge();

    var srcAsset = gulp.src([
        "./src/**/*.html",
        "./src/**/*.css",
    ]).pipe(gulp.dest("./test"));
    m.add(srcAsset);

    var angular2 = gulp.src([
        "./node_modules/angular2/**/*.js",
        "./node_modules/angular2/**/*.js.map"
    ]).pipe(gulp.dest("./test/client/scripts/node_modules/angular2/"));
    m.add(angular2);

    var system = gulp.src("./node_modules/systemjs/dist/**/*.*")
        .pipe(gulp.dest("./test/client/scripts/node_modules/systemjs/dist/"));
    m.add(system);

    var rxjs = gulp.src("./node_modules/rxjs/**/*.js")
        .pipe(gulp.dest("./test/client/scripts/node_modules/rxjs/"));
    m.add(rxjs);

    var es6Shim = gulp.src("./node_modules/es6-shim/**/*.js")
        .pipe(gulp.dest("./test/client/scripts/node_modules/es6-shim/"));
    m.add(es6Shim);

    var babelPolyfill = gulp.src("./node_modules/babel-polyfill/dist/**/*.js")
        .pipe(gulp.dest("./test/client/scripts/node_modules/babel-polyfill/dist/"));
    m.add(babelPolyfill);

    return m;

});

gulp.task("copyTestToDist", () => {

    var m = merge();

    var all = gulp.src([
        "./test/**/*",
        "!./test/core.test{,/**/*}",
        "!./test/web.test{,/**/*}",
        "!./test/client.test{,/**/*}",
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
        "./test/web",
        false
    );
    m.add(tsWeb);

    var tsCore = tsCompiler(
        [
            "./src/core/**/*.ts",
        ],
        "tsconfig_node.json",
        "src/core",
        "./test/core",
        false
    );
    m.add(tsCore);

    var tsCoreTest = tsCompiler(
        [
            "./src/core.test/**/*.ts",
        ],
        "tsconfig_node.json",
        "src/core.test",
        "./test/core.test",
        false
    );
    m.add(tsCoreTest);

    var tsClient = tsCompiler(
        [
            "./src/client/**/*.ts",
        ],
        "tsconfig_node.json",
        "src/client",
        "./test/client",
        false
    );
    m.add(tsClient);

    var tsClientTest = tsCompiler(
        [
            "./src/client.test/**/*.ts",
        ],
        "tsconfig_node.json",
        "src/client.test",
        "./test/client.test",
        false
    );
    m.add(tsClientTest);

    return m;

});

gulp.task('ts_compileForAngular2', () => {

    var m = merge();

    var tsClient = tsCompiler(
        [
            "./src/client/**/*.ts",
        ],
        "tsconfig_angular2.json",
        "src/client",
        "./_temp/client",
        false
    );
    m.add(tsClient);

    return m;

});

gulp.task('ts_compileForAngular2Babel', () => {

    var pathArr = [
        "_temp/**/*.js"
    ];
    return gulp.src(pathArr)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest("dist"));

});

gulp.task("test_node", function() {

    return gulp.src(
        [
            "./test/core.test/**/*.spec.js",
            "./test/web.test/**/*.spec.js",
            "./test/client.test/**/*.spec.js",
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
            "copyAssetsToTest",
        ],
        [
            "copyTestToDist",
            "test_node",
        ],
        [
            "ts_compileForAngular2",
        ],
        [
            "ts_compileForAngular2Babel",
        ],
        cb
    );
});

gulp.task("server", () => {

    var serverfilePath = "./dist/web/server.js";

    nodemon({
        script: serverfilePath,
        ext: "html js",
        env: {
            "NODE_ENV": 'development',
            "port": 1235
        }
        //ignore: ["ignored.js"],
        //tasks: ["lint"] ,
    }).on("restart", () => {
        console.log("restarted!")
    });

});


