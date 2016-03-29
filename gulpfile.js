var gulp = require("gulp");
var shell = require("gulp-shell");
var merge = require("merge-stream")();
var rimraf = require("rimraf");
var runSequence = require("run-sequence");

//=================================== Method ===================================

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

gulp.task("copy", () => {

    merge.add(getCopyFilesPipe(
        "./src/Web/appsettings.json*",
        "./src/Web.Test"
    ));

    return merge;

});

gulp.task("delete", (cb) => {

    deletePathAsync("./src/Core/appsettings.json")
        .then(() => {
            deletePathAsync("./src/Core/Migrations");
        })
        .catch(() => {
            console.log("error")
        })
        .then(() => {
            cb();
        });

});

//=================================== Tasks ===================================

//restore
gulp.task("restore", shell.task([

    "cd src/Core && dnu restore",
    "cd src/Core.Test && dnu restore",
    "cd src/Web && dnu restore",
    "cd src/Web.Test && dnu restore"

]));

//run test
gulp.task("test", function(cb) {
    runSequence(
        "copySettingFileToWebTest",
        "testWebTestAndCoreTest",
        "cleanWebTestSettingFile",
        cb
    );
});
