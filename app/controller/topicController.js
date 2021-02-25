'use strict';

const Controller = require('egg').Controller;

class topicController extends Controller {

  // 用户已读当前题目
  async userReadThisTopic() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.topicService.userReadThisTopic(data);
    ctx.body = result;
  }

  // 新增题目
  async addTopic() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.topicService.addTopic(data);
    ctx.body = result;
  }


   // 查询题目
   async queryTopic() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.topicService.queryTopic(data);
    ctx.body = result;
  }

  
   // 删除题目
   async delTopic() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.topicService.delTopic(data);
    ctx.body = result;
  }


   // 修改题目
   async updateTopic() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.topicService.updateTopic(data);
    ctx.body = result;
  }




}

module.exports = topicController;
