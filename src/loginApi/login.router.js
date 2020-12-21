const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('用户模块路由', Date.now());
  next();
});
// 中间件验证用户名、密码
function validate_User_Login(req, res, next) {
  let { username, pwd } = req.query
  if (!username || !pwd) {
    res.json({
      msg: '用户名或密码错误'
    })
  } else {
    req.formdata = {
      username,
      pwd
    };
    next();
  }
};
router.get('/login', [validate_User_Login/**中间件函数*/], (req, res) => {
  let { formdata } = req
  res.json({
    formdata,
    msg: '通过中间件验证'
  })
});



module.exports = router;