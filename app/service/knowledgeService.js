
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

class knowledgeService extends Service {


    // 查询知识点
    async queryKnowledge(data) {
        const { ctx, app } = this;
        const res = {};

        let params = {
            is_use: 1,
        }
        data.id ? params.id = data.id : null;
        data.title ? params.title = data.title : null;
        data.content ? params.content = { [Op.like]: `%${data.content}%` } : null;
        data.tag_id ? params.tag_id = data.tag_id : null;

        let includeList = [
            { // include关键字表示关联查询
                model: ctx.model.TagModal, // 指定关联的model
                // as: 'tagName',
                attributes: ['name'],
                required: false
            },
        ]

        let theOffset = data.pageNum ? (Number(data.pageNum) - 1) * (data.pageSize ? Number(data.pageSize) : 20) : 0
        let theLimit = data.pageSize ? Number(data.pageSize) : 100000

        //需要关联查询tag表
        let knowledge = await ctx.model.KnowledgeModal.findAndCountAll({
            where: params,
            offset: theOffset,
            limit: theLimit,
            include: includeList,
            distinct: true,  //去重
            attributes: {
                exclude: ['create_at',],
                include: [
                    [Sequelize.fn('date_format', Sequelize.col('create_at'), '%Y-%m-%d %H:%i:%s'), 'create_at'],
                ]
            },
        });

        res.data = knowledge
        return res;
    }


    // 新增知识点
    async addKnowledge(data) {
        const { ctx, app } = this;
        const res = {};

        if (!data.title) {
            res.code = 200;
            res.msg = '请添加知识点标题'
        } else {
            if (!data.content) {
                res.code = 200;
                res.msg = '请添加知识点内容'
            } else {
                let params = {
                    is_use: 1,
                    create_at:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                }
                data.title ? params.title = data.title : null;
                data.content ? params.content = data.content : null;
                data.tag_id ? params.tag_id = data.tag_id : null;
                try {
                    res.code = 200;
                    res.data = await ctx.model.KnowledgeModal.create(params);
                    res.msg = "添加知识点成功"
                } catch (err) {
                    ctx.logger.error(err);
                    res.code = 500;
                    res.data = err;
                    res.msg = "添加知识点失败"
                }
            }
        }
        return res;
    }





}

module.exports = knowledgeService;
