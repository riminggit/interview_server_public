/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    multipart: {
      fileSize: '200mb',//文件上传的大小限制
      fileExtensions: ['.rar'] // 增加对 rar 扩展名的文件支持
    },

  };

  //监听端口
  config.cluster = {
    listen: {
      path: '',
      port: 8008,
      hostname: '0.0.0.0',
    },
  };

  //解决CSRF报错问题，但是不推荐，因为有安全问题，后期更改
  config.security = {
    csrf: {
      enable: false
      // ignoreJSON: true
    },
    domainWhiteList: ["*"]
  };

  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1591954455118_9587';


  //不需要验证token的路由
  config.routerAuth = [`/api/login`, `/api/prelogin`]

  // add your middleware config here
  config.middleware = ['jwtAuth'];//中间件执行顺序则是按照数组中的顺序执行

  //eggjs的参数校验模块egg-validate
  config.validate = {

  };

  config.jwt = {
    secret: '1591529517561267',
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };



  //sequelize 连数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: '',
    port: 3306,
    database: '',
    username: '',   //数据库用户名
    password: '',   //数据库密码
    timezone: '+08:00'
  };


  config.redis = {
    client: {
      port: 6379,          // Redis port
      host:'',   // Redis host
      password: "",
      db: 0,
    },
  }

  return {
    ...config,
    ...userConfig,
  };
};
