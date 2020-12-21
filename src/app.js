const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// 引用 api 文件
const login = require('./loginApi/login.router');
const tasks = require('./taskApi/task.router');

app.use(express.json())
// 处理不同请求头
/** for parsing application/xwww-form-urlencoded */
app.use(express.urlencoded())
/** for parsing application/xwww-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

app.use(login);
app.use("/task", tasks);
// 自定义错误处理中间件
function error_handle_middleware(err, req, res, next) {
  if (err) {
    let { message } = err;
    res.status(500).json({
      message: `${message} || 服务器异常`
    })
  } else {

  }
};
// 使用错误处理中间件
app.use(error_handle_middleware);
// 自定义处理404 错误中间件（express 框架默认不认为404 是error）
function not_find_handle_middleware(err, req, res, next) {
  res.status(404).json({
    message: 'api 不存在'
  })
};
// 使用处理404 错误的中间件
app.use(not_find_handle_middleware);


// 服务监听
app.listen(3000, () => {
  console.log('服务已启动')
  console.log('开始监听，监听端口为2000')
});