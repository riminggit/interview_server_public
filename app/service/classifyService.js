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

class classifyService extends Service {


    // 查询题目分类
    async queryClassify(data) {
        const { ctx, app } = this;
        const res = {};

        let params = {
            is_use: 1,
        }
        data.id ? params.id = data.id : null;
        data.name ? params.name = data.name : null;
        let classifyData = await ctx.model.ClassifyModal.findAndCountAll({
            where: params,
        });

        res.data = classifyData
        return res;

    }



}

module.exports = classifyService;
