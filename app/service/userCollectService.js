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

    // 用户添加收藏
    async userAddCollect(data) {
        const { ctx, app } = this;
        const res = {};
        let userInfoData = JSON.parse(await ctx.service.utilsService.getLoginUserInfo(ctx));
        if (!data.topic_id) {
            res.code = 500
            res.msg = "请选择题目"
        } else {
            try {
                res.code = 200
                res.msg = "添加收藏成功"
                let params = {
                    is_use: 1,
                    user_id: userInfoData.id,
                    create_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                }
                data.topic_id ? params.topic_id = data.topic_id : null;
                res.data = await ctx.model.UserCollectTopicModal.create(params);
            } catch (err) {
                ctx.logger.error(err);
                res.code = 500;
                res.data = err;
                res.msg = "添加收藏失败"
            }
        }
        return res;
    }



    // 查询用户收藏题目
    async queryUserCollect(data) {
        const { ctx, app } = this;
        const res = {};
        let userInfoData = JSON.parse(await ctx.service.utilsService.getLoginUserInfo(ctx));

        let params = {
            is_use: 1,
            user_id: userInfoData.id,
        }
        data.id ? params.id = data.id : null;
        data.topic_id ? params.topic_id = data.topic_id : null;
        (data.create_at && data.create_at.length !== 0) ? params['create_at'] = { [Op.between]: data.create_at } : null;

        // data.title ? params.title = { [Op.like]: `%${data.title}%` } : null;
        let includeList = [
            { // include关键字表示关联查询
                model: ctx.model.TopicModal, // 指定关联的model
                include: [
                    {
                        model: ctx.model.TopicClassifyModal,
                        where: {
                            is_use: 1
                        },
                        include: [{
                            model: ctx.model.ClassifyModal,
                            where: {
                                is_use: 1
                            },
                        }],
                        required: false
                    },
                    {
                        model: ctx.model.TopicCompanyModal,
                        where: {
                            is_use: 1
                        },
                        include: [{
                            model: ctx.model.CompanyModal,
                            where: {
                                is_use: 1
                            },
                        }],
                        required: false
                    },
                    {
                        model: ctx.model.TopicKnowledgeModal,
                        where: {
                            is_use: 1
                        },
                        include: [{
                            model: ctx.model.KnowledgeModal,
                            where: {
                                is_use: 1
                            },
                        }],
                        required: false
                    },
                    {
                        model: ctx.model.TopicTagModal,
                        where: {
                            is_use: 1
                        },
                        include: [{
                            model: ctx.model.TagModal,
                            where: {
                                is_use: 1
                            },
                        }],
                        required: false
                    },
                    {
                        model: ctx.model.TopicTypeModal,
                        where: {
                            is_use: 1
                        },
                        include: [{
                            model: ctx.model.TypeModal,
                            where: {
                                is_use: 1
                            },
                        }],
                        required: false
                    }
                ]
            },
        ]

        let theOffset = data.pageNum ? (Number(data.pageNum) - 1) * (data.pageSize ? Number(data.pageSize) : 20) : 0
        let theLimit = data.pageSize ? Number(data.pageSize) : 100000

        res.data = await ctx.model.UserCollectTopicModal.findAndCountAll({
            where: params,
            offset: theOffset,
            limit: theLimit,
            include: includeList,
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


    // 删除用户自己添加的数据
    async delUserCollect(data) {
        const { ctx, app } = this;
        const res = {};
        let userInfoData = JSON.parse(await ctx.service.utilsService.getLoginUserInfo(ctx));
        if (!data.id) {
            res.code = 500
            res.msg = "请选择需要删除的题目"
        } else {
            let params = {
                // id: data.id,
                user_id: userInfoData.id,
                topic_id:data.id,
            }
            let result = await ctx.model.UserCollectTopicModal.update(
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
