'use strict';

const Controller = require('egg').Controller;

class classifyController extends Controller {

  // 查询题目分类
  async queryClassify() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.classifyService.queryClassify(data);
    ctx.body = result;
  }




}

module.exports = classifyController;
