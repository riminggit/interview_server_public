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

class userInterviewService extends Service {

    // 添加用户面试
    async addUserInterview(data) {
        const { ctx, app } = this;
        const res = {};
        let userInfoData = JSON.parse(await ctx.service.utilsService.getLoginUserInfo(ctx));

        if (!data.compony_name) {
            res.code = 500
            res.msg = "请选择输入面试公司名"
        } else {
            if (!data.interview_time) {
                res.code = 500
                res.msg = "请选择面试时间"
            } else {
                try {
                    res.code = 200
                    res.msg = "添加面试记录成功"
                    let params = {
                        is_use: 1,
                        user_id: userInfoData.id,
                        create_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                    }
                    data.compony_name ? params.compony_name = data.compony_name : null;
                    data.interview_time ? params.interview_time = data.interview_time : null;
                    data.interview_schedule ? params.interview_schedule = data.interview_schedule : null;
                    data.interview_status ? params.interview_status = data.interview_status : null;
                    data.interview_result ? params.interview_result = data.interview_result : null;
                    res.data = await ctx.model.UserInterviewModal.create(params);
                } catch (err) {
                    ctx.logger.error(err);
                    res.code = 500;
                    res.data = err;
                    res.msg = "添加面试记录失败"
                }
            }
        }
        return res;
    }



    // 查询用户面试记录
    async queryUserInterview(data) {
        const { ctx, app } = this;
        const res = {};
        let userInfoData = JSON.parse(await ctx.service.utilsService.getLoginUserInfo(ctx));

        let params = {
            is_use: 1,
        }
        userInfoData.id ? params.user_id = userInfoData.id : null;
        (data.interview_time && data.interview_time.length !== 0) ? params['interview_time'] = { [Op.between]: data.interview_time } : null;
        data.interview_schedule ? params.interview_schedule = data.interview_schedule : null;
        data.interview_status ? params.interview_status = data.interview_status : null;
        data.interview_result ? params.interview_result = data.interview_result : null;
        (data.create_at && data.create_at.length !== 0) ? params['create_at'] = { [Op.between]: data.create_at } : null;

        let theOffset = data.pageNum ? (Number(data.pageNum) - 1) * (data.pageSize ? Number(data.pageSize) : 20) : 0
        let theLimit = data.pageSize ? Number(data.pageSize) : 100000

        res.data = await ctx.model.UserInterviewModal.findAndCountAll({
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
            // distinct: true,  //去重
        });
        return res;
    }


    // 删除面试记录
    async delUserInterview(data) {
        const { ctx, app } = this;
        const res = {};
        if (!data.id) {
            res.code = 500
            res.msg = "请选择需要删除的面试记录"
        } else {
            let params = {
                id: data.id,
            }
            let result = await ctx.model.UserInterviewModal.update(
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


    // 修改面试记录
    async updateUserInterview(data) {
        const { ctx, app } = this;
        const res = {};
        if (!data.id) {
            res.code = 500
            res.msg = "请选择需要修改的面试记录"
        } else {
            let params = {};
            data.compony_name ? params.compony_name = data.compony_name : null;
            data.interview_time ? params.interview_time = data.interview_time : null;
            data.interview_schedule ? params.interview_schedule = data.interview_schedule : null;
            data.interview_status ? params.interview_status = data.interview_status : null;
            data.interview_result ? params.interview_result = data.interview_result : null;
            let result = await ctx.model.UserInterviewModal.update(
                params,
                {
                    where: {
                        id: data.id,
                    }
                });
            if (result[0] === 1) {
                res.code = 200;
                res.msg = "修改成功"
            } else {
                res.code = 500;
                res.msg = "修改失败"
            }
        }
        return res;
    }

}

module.exports = userInterviewService;
