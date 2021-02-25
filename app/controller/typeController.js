'use strict';

const Controller = require('egg').Controller;

class typeController extends Controller {

  // 查询题目分类下的类型
  async queryType() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.typeService.queryType(data);
    ctx.body = result;
  }

  // 新增题目分类下的类型
  async addType() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.typeService.addType(data);
    ctx.body = result;
  }



}

module.exports = typeController;
