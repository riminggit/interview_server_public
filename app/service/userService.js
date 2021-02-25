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

class userService extends Service {


  // 登录,考虑一下把token和用户信息存进redis，方便注销 ，有时候返回的是空，检查拆分一下
  async login(data) {
    const { ctx, app } = this;
    const res = {};
    if (!data) {
      res.code = 500;
      res.msg = '登陆失败，请检查账号和密码';
      res.data = {};
      res.status = 'failed';
    } else {
      let userInfo = await getUserInfo() //后面对接微信获取用户信息
      if (userInfo) {
        await ctx.model.UserModel.findCreateFind({
          defaults:
          {
            id: userInfo.id,
            name: userInfo.name,

          },
          where: {
            name: userInfo.name,
          }
        });

        //获取当前用户ID信息
        let user = await ctx.model.UserModel.findOne(
          {
            where: {
              name: userInfo.name,
            },
            raw: true,
          }
        );

        const token = app.jwt.sign({
          code: data,
        }, app.config.jwt.secret,
          // { expiresIn: 60 * 60 }  //一个小时过期
          { expiresIn: 1000 * 1000 }
        );

        await this.app.redis.set(token, JSON.stringify(user), 'EX', (60 * 60 * 24))
        res.token = token
        res.code = 200;
        res.msg = "操作成功"
      } else {
        res.code = 500;
        res.msg = "用户信息不存在或已被禁用"
        res.data = []
      }
    }
    return res;
  }



  // 电脑端登录
  async pcLogin(data) {
    const { ctx, app } = this;
    const res = {};
    if (!data) {
      res.code = 500;
      res.msg = '登陆失败，请检查账号和密码';
      res.data = {};
      res.status = 'failed';
    } else {

      let password = [
        {
          account: "admin",
          password: "huang123456",
        },
        {
          account: "myaccount",
          password: "huang123456789",
        },
      ]

      let isOk;
      await Promise.all(password.map(async (item, index) => {
        return (async () => {
          if (data.account === item.account) {
            if (data.password === item.password) {
              isOk = item
            }
          }
          return item;
        })()
      }))

      if (isOk) {
        const token = app.jwt.sign({
          code: data,
        }, app.config.jwt.secret,
          { expiresIn: 60 * 60 }  //一个小时过期
          // { expiresIn: 1000 * 1000 }
        );
        await this.app.redis.set(token, JSON.stringify(isOk), 'EX', (60 * 60 * 24))
        res.token = token
        res.code = 200;
        res.msg = "操作成功"
        res.status = 'ok'
        res.currentAuthority = 'admin'
        res.type = "account"
      } else {
        res.code = 500;
        res.msg = "用户信息不存在或已被禁用"
        res.data = []
      }
    }
    return res;
  }



  // 假的用户信息
  async currentUser(data) {
    const { ctx, app } = this;
    const res = {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁集团－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    }
    return res;
  }

  // 查询用户数据
  async queryUser(data) {
    const { ctx, app } = this;
    const res = {};
    let params = {}
    data.id ? params.id = data.id : null;
    data.nick_name ? params.nick_name = { [Op.like]: `%${data.nick_name}%` } : null;
    data.gender ? params.gender = data.gender : null;
    data.city ? params.city = data.city : null;
    data.province ? params.province = data.province : null;
    data.country ? params.country = data.country : null;
    data.language ? params.language = data.language : null;
    let theOffset = data.pageNum ? (Number(data.pageNum) - 1) * (data.pageSize ? Number(data.pageSize) : 20) : 0
    let theLimit = data.pageSize ? Number(data.pageSize) : 100000
    res.data = await ctx.model.UserModal.findAndCountAll({
      where: params,
      offset: theOffset,
      limit: theLimit,
      order: [['id', 'DESC']],
    });
    return res;
  }



}

module.exports = userService;
