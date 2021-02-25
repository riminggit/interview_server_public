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

class userAddTopicService extends Service {

    // 用户新增题目
    async userAddTopic(data) {
        const { ctx, app } = this;
        const res = {};
        let userInfoData = JSON.parse(await ctx.service.utilsService.getLoginUserInfo(ctx));
        if (!data.title) {
            res.code = 500
            res.msg = "请输入题目标题"
        } else {
            if (!data.analysis) {
                res.code = 500
                res.msg = "请输入题目总结或题解"
            } else {
                try {
                    res.code = 200
                    res.msg = "添加成功"
                    let params = {
                        is_use: 1,
                        user_id: userInfoData.id,
                        create_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                    }
                    data.title ? params.title = data.title : null;
                    data.analysis ? params.analysis = data.analysis : null;
                    data.degree ? params.degree = data.degree : null;
                    data.is_important_topic ? params.is_important_topic = data.is_important_topic : params.is_important_topic = 0;
                    res.data = await ctx.model.UserAddTopicModal.create(params);
                } catch (err) {
                    ctx.logger.error(err);
                    res.code = 500;
                    res.data = err;
                    res.msg = "添加失败"
                }
            }
        }
        return res;
    }



    // 查询用户新增题目
    async queryUserAddTopic(data) {
        const { ctx, app } = this;
        const res = {};
        let userInfoData = JSON.parse(await ctx.service.utilsService.getLoginUserInfo(ctx));

        let params = {
            is_use: 1,
            user_id: userInfoData.id,
        }
        data.id ? params.id = data.id : null;
        data.title ? params.title = { [Op.like]: `%${data.title}%` } : null;
        data.analysis ? params.analysis = { [Op.like]: `%${data.analysis}%` } : null;
        data.degree ? params.degree = data.degree : null;
        (data.create_at && data.create_at.length !== 0) ? params['create_at'] = { [Op.between]: data.create_at } : null;       //期望时间
        data.is_important_topic ? params.is_important_topic = data.is_important_topic : null;

        let theOffset = data.pageNum ? (Number(data.pageNum) - 1) * (data.pageSize ? Number(data.pageSize) : 20) : 0
        let theLimit = data.pageSize ? Number(data.pageSize) : 100000

        res.data = await ctx.model.UserAddTopicModal.findAndCountAll({
            where: params,
            offset: theOffset,
            limit: theLimit,
            distinct: true,  //去重
        });

        return res;
    }


    // 删除用户自己添加的数据
    async delUserAddTopic(data) {
        const { ctx, app } = this;
        const res = {};
        let userInfoData = JSON.parse(await ctx.service.utilsService.getLoginUserInfo(ctx));
        if (!data.id) {
            res.code = 500
            res.msg = "请选择需要删除的题目"
        } else {
            let params = {
                id: data.id,
                user_id: userInfoData.id,
            }
            let result = await ctx.model.UserAddTopicModal.update(
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

module.exports = userAddTopicService;
