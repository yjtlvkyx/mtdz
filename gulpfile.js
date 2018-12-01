const gulp = require("gulp"),
    sass = require("gulp-sass"),
    server = require("gulp-webserver"),
    fs = require("fs"),
    path = require("path"),
    url = require("url");


//转义sass文件
gulp.task("devSass", () => {
    return gulp.src("./src/scss/*.scss").pipe(sass()).pipe(gulp.dest("./src/css"));
})

//启动服务
gulp.task("devServer", () => {
    return gulp.src("./src").pipe(server({
        port: 8024,
        open: true,
        livereload: true,
        middleware: function(req, res, next) {
            console.log(req.url);
            if (req.url == "/favicon.ico") {
                res.end("这里是标题图标")
                return;
            }
            let pathname = url.parse(req.url).pathname;
            pathname = pathname == "/" ? "index.html" : pathname;
            console.log(path.join(__dirname, "src", pathname), "路径")
            let pathFile = fs.readFileSync(path.join(__dirname, "src", pathname));
            res.end(pathFile)
        }
    }))
})

//开启监听
gulp.task("watch", () => {
    return gulp.watch("./src/scss/*.scss", gulp.series("devSass", "devServer"))
})

//整合的运行监听事件
gulp.task("dev", gulp.series("devSass", "devServer", "watch"));