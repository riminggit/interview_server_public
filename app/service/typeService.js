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

class typeService extends Service {


    // 查询题目分类下的类型
    async queryType(data) {
        const { ctx, app } = this;
        const res = {};

        let params = {
            is_use: 1,
        }
        data.id ? params.id = data.id : null;
        data.name ? params.name = { [Op.like]: `%${data.name}%` } : null;
        data.classify_id ? params.classify_id = data.classify_id : null;

        let includeList = [
            { // include关键字表示关联查询
                model: ctx.model.ClassifyModal, // 指定关联的model
                // as: 'tagName',
                // attributes: ['name'],
                required: false
            },
        ]

        res.data = await ctx.model.TypeModal.findAndCountAll({
            where: params,
            include: includeList,
            distinct: true,  //去重
        });
        return res;


    }

    // 新增题目分类下的类型
    async addType(data) {
        const { ctx, app } = this;
        const res = {};

        let params = {
            is_use: 1,
        }
        data.name ? params.name = data.name : null;
        data.classify_id ? params.classify_id = data.classify_id : null;
        res.data = await ctx.model.TypeModal.create(params);

        return res;
    }

}

module.exports = typeService;
