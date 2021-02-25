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


    // 查询公司数据
    async queryCompany(data) {
        const { ctx, app } = this;
        const res = {};

        let params = {
            is_use: 1,
        }
        data.id ? params.id = data.id : null;
        data.company_name ? params.company_name = data.company_name : null;
        let companyData = await ctx.model.CompanyModal.findAndCountAll({
            where: params,
        });

        res.data = companyData
        return res;
    }


    // 新增公司数据
    async addCompany(data) {
        const { ctx, app } = this;
        const res = {};

        if (data.company_name) {
            let params = {
                is_use: 1,
            }
            data.company_name ? params.company_name = data.company_name : null;
            data.img_url ? params.img_url = data.img_url : null;
            data.img_svg ? params.img_svg = data.img_svg : null;
            try {
                res.code = 200;
                res.data = await ctx.model.CompanyModal.create(params);
                res.msg = "添加公司成功"
            } catch (err) {
                ctx.logger.error(err);
                res.code = 500;
                res.data = err;
                res.msg = "添加公司失败"
            }
        } else {
            res.code = 200;
            res.msg = '请添加公司名'
        }
        return res;
    }



}

module.exports = classifyService;
