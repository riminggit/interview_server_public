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

class utilsService extends Service {


    //获取登陆用户的信息
    async getLoginUserInfo(ctx) {
        const token = ctx.request.header.authorization.replace("Bearer ", "");
        let userData = await ctx.app.redis.get(token)
        // console.log(userData, "进入获取")
        if (userData) {
            return userData
        } else {
            return false;
        }
    }

}

module.exports = utilsService;
