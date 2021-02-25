'use strict';

const Controller = require('egg').Controller;

class userAddTopicController extends Controller {


  // 添加用户题目
  async userAddTopic() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    const result = await ctx.service.userAddTopicService.userAddTopic(data);
    ctx.body = result;
  }

   // 查询用户自己添加的题目
   async queryUserAddTopic() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    const result = await ctx.service.userAddTopicService.queryUserAddTopic(data);
    ctx.body = result;
  }

   // 删除用户自己添加的题目
   async delUserAddTopic() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    const result = await ctx.service.userAddTopicService.delUserAddTopic(data);
    ctx.body = result;
  }


}

module.exports = userAddTopicController;
