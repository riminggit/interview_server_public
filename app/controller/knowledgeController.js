'use strict';

const Controller = require('egg').Controller;

class knowledgeController extends Controller {

  // 查询知识点
  async queryKnowledge() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.knowledgeService.queryKnowledge(data);
    ctx.body = result;
  }


  // 新增知识点数据
  async addKnowledge() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.knowledgeService.addKnowledge(data);
    ctx.body = result;
  }



}

module.exports = knowledgeController;
