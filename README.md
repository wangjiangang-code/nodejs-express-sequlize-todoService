## 需求 API 说明
1. 根据客户端传递过来的不同参数（状态/页面） 查询任务的列表
2. 实现 新增一个任务的功能（名称/截至日期/内容）
3. 实现一个编辑的功能: 根据客户端传递的任务对象（已经存在的数据），进行编辑（名称/截至日期/内容/ID）
4. 删除一个任务（ID）
5. 修改任务的状态（ID/状态--代办/完成）

## 数据库的初始化
1. 创建一个数据库
2. 使用`sequelize cli` 初始化项目的数据库配置信息
    ` npx sequelize-cli init `
3. 生成模型文件

    config, 包含配置文件,它告诉CLI如何连接数据库
    models,包含你的项目的所有模型
    migrations, 包含所有迁移文件
    seeders, 包含所有种子文件
   3.1 migrate 数据迁移文件
   3.2 model 数据模型文件
      创建数据模型： `npx sequelize-cli model:generate --name Todo --attributes name:string,deadline:date,content:string`
4. 持久化，模型对应的[数据库表]
    同步数据模型到数据库: `npx sequelize-cli db:migrate`
5. 如何在数据模型中增加字段
    例： 在已生成的todo模型中，增加 status 字段，
    todo.js 增加： status: DataTypes.INTEGER，
    对应迁移文件也需增加： 
    status: {
        type: Sequelize.INTEGER
      }
    增加后需删除对应的表，清空sequelizemeta 表

## API如何具体使用ORM 中数据模型


## express 传参的三种方式
1. query 
    http://localhost:3000/getList?name=zhansan&des=gsafety
    let { name,des } = req.query;
2. params
    http://localhost:3000/getList/zhansan/gsafety
    let { name,des } = req.params;
3. body
    http://localhost:3000/getList
    let { name,des } = req.body;
    以json传递参数：
    {
        “name”:"zhansan",
        "des":"express"
    }

## 项目的发布与运维

pm2(是node应用的进程管理器)

全局安装pm2: npm install pm2 -g
在项目中初始化pm2: pm2 init

启动命令/运维命令/运维文档
1. pm2 start ecosystem.config.js
2. pm2 log
3. pm2 restart ecosystem.config.js
