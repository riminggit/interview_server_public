'use strict';
const Service = require("egg").Service;
const utility = require("utility") //密码加密
const path = require("path");
const sd = require('silly-datetime');
const mkdirp = require('mkdirp');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const moment = require('moment');
const fs = require('fs');
const pump = require('mz-modules/pump');

class tagService extends Service {


    // 查询标签
    async queryTag(data) {
        const { ctx, app } = this;
        const res = {};

        let params = {
            is_use: 1,
        }
        data.id ? params.id = data.id : null;
        data.name ? params.name = {
            [Op.like]: `%${data.name}%`
        } : null;

        try {
            res.code = 200;
            res.data = await ctx.model.TagModal.findAndCountAll({
                where: params,
                order: [['id', 'DESC']],
            });
        } catch (err) {
            ctx.logger.error(err);
            res.code = 500;
            res.data = err;
        }


        return res;
    }


    // 新增标签
    async addTag(data) {
        const { ctx, app } = this;
        const res = {};
        if (!data.name) {
            res.code = 200;
            res.msg = '请添加标签名'
        } else {
            let params = {
                is_use: 1,
            }
            data.name ? params.name = data.name : null;
            try {
                res.code = 200;
                res.data = await ctx.model.TagModal.create(params);
                res.msg = "添加标签名成功"
            } catch (err) {
                ctx.logger.error(err);
                res.code = 500;
                res.data = err;
                res.msg = "添加标签名失败"
            }
        }
        return res;
    }



}

module.exports = tagService;