'use strict';

const Controller = require('egg').Controller;

class userController extends Controller {


  // 登录
  async login() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.userService.login(data);
    ctx.body = result;
  }


  // 电脑端
  async pcLogin() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.userService.pcLogin(data);
    ctx.body = result;
  }


   // 电脑端假数据
   async currentUser() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.userService.currentUser(data);
    ctx.body = result;
  }


   // 查询用户数据
   async queryUser() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.userService.queryUser(data);
    ctx.body = result;
  }


}

module.exports = userController;
