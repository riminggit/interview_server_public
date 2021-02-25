'use strict';
const Service = require("egg").Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const utility = require("utility")//密码加密
const fs = require('fs')
const archiver = require('archiver') //压缩
const moment = require('moment');
const mkdirp = require('mkdirp');
const path = require("path");
// 密码加密模块

class userFeedbackService extends Service {

    // 用户反馈
    async addUserFeedback(data) {
        const { ctx, app } = this;
        const res = {};
        let userInfoData = JSON.parse(await ctx.service.utilsService.getLoginUserInfo(ctx));

        if (!data.content) {
            res.code = 500
            res.msg = "请选择输入用户反馈"
        } else {
            try {
                res.code = 200
                res.msg = "反馈成功"
                let params = {
                    is_use: 1,
                    content: data.content,
                    user_id: userInfoData.id,
                    create_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                }
                data.grade ? params.grade = data.grade : null;
                res.data = await ctx.model.UserFeedbackModal.create(params);
            } catch (err) {
                ctx.logger.error(err);
                res.code = 500;
                res.data = err;
                res.msg = "反馈失败"
            }
        }
        return res;
    }



    // 查询用户反馈
    async queryUserFeedback(data) {
        const { ctx, app } = this;
        const res = {};

        let params = {
            is_use: 1,
        }
        data.user_id ? params.user_id = data.user_id : null;
        data.id ? params.id = data.id : null;
        data.content ? params.content = { [Op.like]: `%${data.content}%` } : null;
        data.grade ? params.grade =  data.grade : null;
        (data.create_at && data.create_at.length !== 0) ? params['create_at'] = { [Op.between]: data.create_at } : null;       

        let theOffset = data.pageNum ? (Number(data.pageNum) - 1) * (data.pageSize ? Number(data.pageSize) : 20) : 0
        let theLimit = data.pageSize ? Number(data.pageSize) : 100000

        res.data = await ctx.model.UserFeedbackModal.findAndCountAll({
            where: params,
            offset: theOffset,
            limit: theLimit,
            order: [['id', 'DESC']],
            attributes: {
                exclude: ['create_at',],
                include: [
                    [Sequelize.fn('date_format', Sequelize.col('create_at'), '%Y-%m-%d %H:%i:%s'), 'create_at'],
                ]
            },
            distinct: true,  //去重
        });

        return res;
    }


    // 删除用户反馈
    async delUserFeedback(data) {
        const { ctx, app } = this;
        const res = {};
        if (!data.id) {
            res.code = 500
            res.msg = "请选择需要删除的用户反馈"
        } else {
            let params = {
                id: data.id,
            }
            let result = await ctx.model.UserFeedbackModal.update(
                {
                    is_use: 0,
                },
                {
                    where: params
                });
            if (result[0] === 1) {
                res.code = 200;
                res.msg = "删除成功"
            } else {
                res.code = 500;
                res.msg = "删除失败"
            }
        }
        return res;
    }


}

module.exports = userFeedbackService;
