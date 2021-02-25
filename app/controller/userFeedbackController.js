'use strict';

const Controller = require('egg').Controller;

class userFeedbackController extends Controller {


    // 新增用户反馈
    async addUserFeedback() {
        const { ctx, app } = this;
        const data = ctx.request.body;
        // 从service文件中拿到返回结果
        const result = await ctx.service.userFeedbackService.addUserFeedback(data);
        ctx.body = result;
    }

    // 查询用户反馈
    async queryUserFeedback() {
        const { ctx, app } = this;
        const data = ctx.request.body;
        // 从service文件中拿到返回结果
        const result = await ctx.service.userFeedbackService.queryUserFeedback(data);
        ctx.body = result;
    }


    // 删除用户反馈
    async delUserFeedback() {
        const { ctx, app } = this;
        const data = ctx.request.body;
        // 从service文件中拿到返回结果
        const result = await ctx.service.userFeedbackService.delUserFeedback(data);
        ctx.body = result;
    }





}

module.exports = userFeedbackController;
