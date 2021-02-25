'use strict';

const Controller = require('egg').Controller;

class userInterviewController extends Controller {


    // 新增用户面试
    async addUserInterview() {
        const { ctx, app } = this;
        const data = ctx.request.body;
        // 从service文件中拿到返回结果
        const result = await ctx.service.userInterviewService.addUserInterview(data);
        ctx.body = result;
    }

    // 查询用户面试
    async queryUserInterview() {
        const { ctx, app } = this;
        const data = ctx.request.body;
        // 从service文件中拿到返回结果
        const result = await ctx.service.userInterviewService.queryUserInterview(data);
        ctx.body = result;
    }


    // 删除用户面试
    async delUserInterview() {
        const { ctx, app } = this;
        const data = ctx.request.body;
        // 从service文件中拿到返回结果
        const result = await ctx.service.userInterviewService.delUserInterview(data);
        ctx.body = result;
    }


    // 修改用户面试
    async updateUserInterview() {
        const { ctx, app } = this;
        const data = ctx.request.body;
        // 从service文件中拿到返回结果
        const result = await ctx.service.userInterviewService.updateUserInterview(data);
        ctx.body = result;
    }



}

module.exports = userInterviewController;
