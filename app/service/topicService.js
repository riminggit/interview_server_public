'use strict';
const Service = require("egg").Service;
const utility = require("utility")//密码加密
const path = require("path");
const sd = require('silly-datetime');
const mkdirp = require('mkdirp');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const moment = require('moment');
const fs = require('fs');
const pump = require('mz-modules/pump');

class topicService extends Service {

    // 用户已读当前题目
    async userReadThisTopic(data) {
        const { ctx, app } = this;
        const res = {};
        let userInfoData = JSON.parse(await ctx.service.utilsService.getLoginUserInfo(ctx));

        let params = {
            is_use: 1,
            is_read: 1,
            create_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        }
        userInfoData.id ? params.user_id = userInfoData.id : null;
        data.topic_id ? params.topic_id = data.topic_id : null;

        res.data = await ctx.model.UserTopicReadModal.findCreateFind({
            defaults: params,
            where: {
                user_id: userInfoData.id,
                topic_id: data.topic_id,
            }
        });
        return res;
    }

    // 新增题目
    async addTopic(data) {
        const { ctx, app } = this;
        const res = {};
        // const t = await this.app.model.transaction();
        try {
            let params = {
                is_use: 1,
                create_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            }
            data.title ? params.title = data.title : null;
            data.analysis ? params.analysis = data.analysis : null;
            data.degree ? params.degree = data.degree : params.degree = 0;
            data.level ? params.level = data.level : params.level = 1;
            data.is_base_topic ? params.is_base_topic = data.is_base_topic : params.is_base_topic = 1;
            data.is_important_topic ? params.is_important_topic = data.is_important_topic : params.is_important_topic = 0;

            res.data = await ctx.model.TopicModal.create(params);

            if (data.classify_id && data.classify_id.length !== 0) {
                await Promise.all(data.classify_id.map(async (item, index) => {
                    return (async () => {
                        let topicClassifyParams = {
                            is_use: 1,
                            topic_id: res.data.dataValues.id,
                            classify_id: item,
                        }
                        await ctx.model.TopicClassifyModal.create(topicClassifyParams);
                        return item;
                    })()
                }))
            }

            if (data.company_id && data.company_id.length !== 0) {
                await Promise.all(data.company_id.map(async (item, index) => {
                    return (async () => {
                        let topicCompanyParams = {
                            is_use: 1,
                            topic_id: res.data.dataValues.id,
                            company_id: item,
                        }
                        await ctx.model.TopicCompanyModal.create(topicCompanyParams);
                        return item;
                    })()
                }))

            }


            if (data.knowledge_id && data.knowledge_id.length !== 0) {
                await Promise.all(data.knowledge_id.map(async (item, index) => {
                    return (async () => {
                        let topicKnowledgeParams = {
                            is_use: 1,
                            topic_id: res.data.dataValues.id,
                            knowledge_id: item,
                        }
                        // data.tag_id ? params.tag_id = data.tag_id : null;
                        await ctx.model.TopicKnowledgeModal.create(topicKnowledgeParams);
                        return item;
                    })()
                }))
            }


            if (data.tag_id && data.tag_id.length !== 0) {
                await Promise.all(data.tag_id.map(async (item, index) => {
                    return (async () => {
                        let topicTagParams = {
                            is_use: 1,
                            topic_id: res.data.dataValues.id,
                            tag_id: item,
                        }
                        await ctx.model.TopicTagModal.create(topicTagParams);
                        return item;
                    })()
                }))
            }

            if (data.type_id && data.type_id.length !== 0) {
                await Promise.all(data.type_id.map(async (item, index) => {
                    return (async () => {
                        let topicTypeParams = {
                            is_use: 1,
                            topic_id: res.data.dataValues.id,
                            type_id: item,
                        }
                        await ctx.model.TopicTypeModal.create(topicTypeParams);
                        return item;
                    })()
                }))
            }
            res.code = 200
            res.msg = "新增成功"
            //    await t.commit();
        } catch (err) {
            // await t.rollback();
            ctx.logger.error(err);
            res.code = 500;
            res.data = err;
            res.msg = "新增出错";
        }
        return res;
    }

    // 删除题目
    async delTopic(data) {
        const { ctx, app } = this;
        const res = {};
        let params = {
            id: data.topic_id,
        }
        let result = await ctx.model.TopicModal.update(
            {
                is_use: 0,
            },
            {
                where: params
            });

        await ctx.model.TopicClassifyModal.update(
            {
                is_use: 0,
            },
            {
                where: {
                    topic_id: data.topic_id,
                }
            });

        await ctx.model.TopicCompanyModal.update(
            {
                is_use: 0,
            },
            {
                where: {
                    topic_id: data.topic_id,
                }
            });

        await ctx.model.TopicKnowledgeModal.update(
            {
                is_use: 0,
            },
            {
                where: {
                    topic_id: data.topic_id,
                }
            });

        await ctx.model.TopicTagModal.update(
            {
                is_use: 0,
            },
            {
                where: {
                    topic_id: data.topic_id,
                }
            });

        await ctx.model.TopicTypeModal.update(
            {
                is_use: 0,
            },
            {
                where: {
                    topic_id: data.topic_id,
                }
            });

        if (result[0] === 1) {
            res.code = 200;
            res.msg = "删除成功"
        } else {
            res.code = 500;
            res.msg = "删除失败"
        }

        return res;
    }

    // 修改题目
    async updateTopic(data) {
        const { ctx, app } = this;
        const res = {};
        try {
            let params = {
                is_use: 1,
                create_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            }
            data.title ? params.title = data.title : null;
            data.analysis ? params.analysis = data.analysis : null;
            data.degree ? params.degree = data.degree : params.degree = 0;
            data.is_base_topic ? params.is_base_topic = data.is_base_topic : params.is_base_topic = 1;
            data.is_important_topic ? params.is_important_topic = data.is_important_topic : params.is_important_topic = 0;
            await ctx.model.TopicModal.update(params, {
                where: {
                    id: data.topic_id,
                }
            });

            if (data.classify_id && data.classify_id.length !== 0) {
                await ctx.model.TopicClassifyModal.update(
                    {
                        is_use: 0,
                    },
                    {
                        where: {
                            topic_id: data.topic_id,
                        }
                    });
                await Promise.all(data.classify_id.map(async (item, index) => {
                    return (async () => {
                        let topicClassifyParams = {
                            is_use: 1,
                            topic_id: res.data.dataValues.id,
                            classify_id: item,
                        }
                        await ctx.model.TopicClassifyModal.create(topicClassifyParams);
                        return item;
                    })()
                }))
            }

            if (data.companyinfo && data.companyinfo.length !== 0) {
                await ctx.model.TopicCompanyModal.update(
                    {
                        is_use: 0,
                    },
                    {
                        where: {
                            topic_id: data.topic_id,
                        }
                    });
                await Promise.all(data.companyinfo.map(async (item, index) => {
                    return (async () => {
                        let topicCompanyParams = {
                            is_use: 1,
                            topic_id: res.data.dataValues.id,
                            company_id: item.company_id,
                        }
                        item.topic_time ? params.topic_time = item.topic_time : null;
                        await ctx.model.TopicCompanyModal.create(topicCompanyParams);
                        return item;
                    })()
                }))

            }


            if (data.knowledge_id && data.knowledge_id.length !== 0) {
                await ctx.model.TopicKnowledgeModal.update(
                    {
                        is_use: 0,
                    },
                    {
                        where: {
                            topic_id: data.topic_id,
                        }
                    });
                await Promise.all(data.knowledge_id.map(async (item, index) => {
                    return (async () => {
                        let topicKnowledgeParams = {
                            is_use: 1,
                            topic_id: res.data.dataValues.id,
                            knowledge_id: item,
                        }
                        await ctx.model.TopicKnowledgeModal.create(topicKnowledgeParams);
                        return item;
                    })()
                }))
            }


            if (data.tag_id && data.tag_id.length !== 0) {
                await ctx.model.TopicTagModal.update(
                    {
                        is_use: 0,
                    },
                    {
                        where: {
                            topic_id: data.topic_id,
                        }
                    });
                await Promise.all(data.tag_id.map(async (item, index) => {
                    return (async () => {
                        let topicTagParams = {
                            is_use: 1,
                            topic_id: res.data.dataValues.id,
                            tag_id: item,
                        }
                        await ctx.model.TopicTagModal.create(topicTagParams);
                        return item;
                    })()
                }))
            }

            if (data.type_id && data.type_id.length !== 0) {
                await ctx.model.TopicTypeModal.update(
                    {
                        is_use: 0,
                    },
                    {
                        where: {
                            topic_id: data.topic_id,
                        }
                    });
                await Promise.all(data.type_id.map(async (item, index) => {
                    return (async () => {
                        let topicTypeParams = {
                            is_use: 1,
                            topic_id: res.data.dataValues.id,
                            type_id: item,
                        }
                        await ctx.model.TopicTypeModal.create(topicTypeParams);
                        return item;
                    })()
                }))
            }
            res.code = 200
            res.msg = "修改成功"
        } catch (err) {
            ctx.logger.error(err);
            res.code = 500;
            res.data = err;
            res.msg = "修改出错";
        }
        return res;
    }

    // 查询题目
    async queryTopic(data) {
        const { ctx, app } = this;
        let res = {};

        if (!data.condition) {
            res.code = 500
            res.msg = "请选择查询类型"
        } else if (data.condition === 'common') {
            res.data = await this.commonQueryTopic(data)
            res.code = 200
        } else if (data.condition === "condition") {
            res = await this.conditionQueryTopic(data)
        }

        return res;
    }

    //普通查询题目数据
    async commonQueryTopic(data) {
        const { ctx, app } = this;
        let params = {
            is_use: 1,
        }
        data.id ? params.id = data.id : null;
        data.title ? params.title = { [Op.like]: `%${data.title}%` } : null;
        data.analysis ? params.analysis = { [Op.like]: `%${data.analysis}%` } : null;
        data.degree ? params.degree = data.degree : null;
        data.level ? params.level = data.level : null;
        data.is_base_topic ? params.is_base_topic = data.is_base_topic : null;
        data.is_important_topic ? params.is_important_topic = data.is_important_topic : null;
        (data.create_at && data.create_at.length !== 0) ? params['create_at'] = { [Op.between]: data.create_at } : null;
        let includeList = [
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
                    required: false
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
                    required: false
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
                    required: false
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
                    required: false
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
                    required: false
                }],
                required: false
            }
        ]
        let theOffset = data.pageNum ? (Number(data.pageNum) - 1) * (data.pageSize ? Number(data.pageSize) : 20) : 0
        let theLimit = data.pageSize ? Number(data.pageSize) : 100000
        let topicData = await ctx.model.TopicModal.findAndCountAll({
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

        return topicData;
    }

    //子表查询题目数据
    async conditionQueryTopic(data) {
        const { ctx, app } = this;
        let params = {
            is_use: 1,
        }
        data.id ? params.id = data.id : null;
        data.title ? params.title = { [Op.like]: `%${data.title}%` } : null;
        data.analysis ? params.analysis = { [Op.like]: `%${data.analysis}%` } : null;
        data.degree ? params.degree = data.degree : null;
        data.level ? params.level = data.level : null;
        data.is_base_topic ? params.is_base_topic = data.is_base_topic : null;
        data.is_important_topic ? params.is_important_topic = data.is_important_topic : null;
        (data.create_at && data.create_at.length !== 0) ? params['create_at'] = { [Op.between]: data.create_at } : null;

        let theOffset = data.pageNum ? (Number(data.pageNum) - 1) * (data.pageSize ? Number(data.pageSize) : 20) : 0
        let theLimit = data.pageSize ? Number(data.pageSize) : 100000

        let includeList = [
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

        let classifyData
        let companyData
        let knowledgeData
        let tagData
        let typeData

        if (data.classify_id && data.classify_id.length !== 0) {
            classifyData = await ctx.model.TopicClassifyModal.findAndCountAll({
                where: {
                    classify_id: {
                        [Op.in]: data.classify_id,
                    }
                },
                offset: theOffset,
                limit: theLimit,
                include: [{
                    model: ctx.model.TopicModal,
                    include: includeList,
                    where: params,

                },],
                distinct: true,  //去重
            });
        }

        if (data.company_id && data.company_id.length !== 0) {
            companyData = await ctx.model.TopicCompanyModal.findAndCountAll({
                where: {
                    company_id: {
                        [Op.in]: data.company_id,
                    }
                },
                offset: theOffset,
                limit: theLimit,
                include: [{
                    model: ctx.model.TopicModal,
                    include: includeList,
                    where: params,
                },],
                distinct: true,  //去重
            });
        }

        if (data.knowledge_id && data.knowledge_id.length !== 0) {
            knowledgeData = await ctx.model.TopicKnowledgeModal.findAndCountAll({
                where: {
                    knowledge_id: {
                        [Op.in]: data.knowledge_id,
                    }
                },
                offset: theOffset,
                limit: theLimit,
                include: [{
                    model: ctx.model.TopicModal,
                    include: includeList,
                    where: params,
                },],
                distinct: true,  //去重
            });
        }

        if (data.tag_id && data.tag_id.length !== 0) {
            tagData = await ctx.model.TopicTagModal.findAndCountAll({
                where: {
                    tag_id: {
                        [Op.in]: data.tag_id,
                    }
                },
                offset: theOffset,
                limit: theLimit,
                include: [{
                    model: ctx.model.TopicModal,
                    include: includeList,
                    where: params,
                },],
                distinct: true,  //去重
            });
        }

        if (data.type_id && data.type_id.length !== 0) {
            typeData = await ctx.model.TopicTypeModal.findAndCountAll({
                where: {
                    type_id: {
                        [Op.in]: data.type_id,
                    }
                },
                offset: theOffset,
                limit: theLimit,
                include: [{
                    model: ctx.model.TopicModal,
                    include: includeList,
                    where: params,
                },],
                distinct: true,  //去重
            });
        }


        let help = []
        classifyData ? help.push(classifyData.rows) : null;
        companyData ? help.push(companyData.rows) : null;
        knowledgeData ? help.push(knowledgeData.rows) : null;
        tagData ? help.push(tagData.rows) : null;
        typeData ? help.push(typeData.rows) : null;
        let newArr = help.reduce(function (prev, cur) {
            prev = prev.filter(function (v) {
                let flag = cur.some((item) => {
                    return item.dataValues.topic.dataValues.id = v.dataValues.topic.dataValues.id
                })
                if (flag) {
                    return v
                }
            })   //交集
            return prev;
        });
        let res = {}
        res.code = 200
        res.count = newArr.length
        res.data = newArr
        return res;
    }
}

module.exports = topicService;
