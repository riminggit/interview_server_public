'use strict';

const Controller = require('egg').Controller;

class tagController extends Controller {

  // 查询知识点
  async queryTag() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.tagService.queryTag(data);
    ctx.body = result;
  }


  // 新增知识点数据
  async addTag() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.tagService.addTag(data);
    ctx.body = result;
  }




}

module.exports = tagController;
