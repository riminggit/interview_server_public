'use strict';

const Controller = require('egg').Controller;

class userCollectController extends Controller {

  // 添加用户题目
  async userAddCollect() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    const result = await ctx.service.userCollectService.userAddCollect(data);
    ctx.body = result;
  }

   // 查询用户自己添加的题目
   async queryUserCollect() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    const result = await ctx.service.userCollectService.queryUserCollect(data);
    ctx.body = result;
  }

   // 删除用户自己添加的题目
   async delUserCollect() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    const result = await ctx.service.userCollectService.delUserCollect(data);
    ctx.body = result;
  }


}

module.exports = userCollectController;
