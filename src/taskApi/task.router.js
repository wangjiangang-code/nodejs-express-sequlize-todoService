const express = require('express');
const models = require('../../db/models');
const router = express.Router();

/** 查询任务列表 
 * 1. 状态  1：表示待办，2：完成， 3：删除，-1：全部
 * 2. 分页的处理
*/
router.get('/list/:status/:page', async (req, res, next) => {
  let { status, page } = req.params;
  let limit = 10;
  let offset = (page - 1) * limit;
  let where = {};
  if (status != -1) {
    where.status = status;
  }
  let list = await models.Todo.findAndCountAll({
    where,
    offset,
    limit
  });
  try {
    res.json({
      list
    })
  } catch (error) {
    next(error)
  }
});

/** 创建一个任务 */
router.post('/create', async (req, res, next) => {
  try {
    let { name, deadline, content } = req.body;
    let todoTask = await models.Todo.create({
      name,
      deadline,
      content
    });
    res.json({
      todoTask
    })
  } catch (error) {
    next(error)
  }
});

/** 更新一个任务 */
router.post('/update', async (req, res) => {
  try {
    let { name, deadline, content, id } = req.body;
    let todoTask = await models.Todo.findOne({
      id
    });
    if (todoTask) {
      // 执行更新功能
      todoTask = await todoTask.update({
        name,
        deadline,
        content
      });
    };
    res.json({
      todoTask
    });
  } catch (error) {
    next(error)
  }
});

/** 更新一个任务 /删除*/
router.post('/update_status', async (req, res) => {
  try {
    let { id, status } = req.body;
    let todoTask = await models.Todo.findOne({
      id
    });
    if (todoTask && status != todoTask.status) {
      todoTask = await todoTask.update({
        status
      })
    }
    res.json({
      todoTask
    })
  } catch (error) {
    next(error)
  }
});

module.exports = router;