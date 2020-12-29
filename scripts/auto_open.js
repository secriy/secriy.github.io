var exec = require("child_process").exec;
hexo.on("new", function (data) {
  exec('start  "typora" ' + data.path);
});
