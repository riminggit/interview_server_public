'use strict';
module.exports = app => {
  return async (ctx, next) => {

    // console.log(ctx.socket.handshake.query.token,"ctx.socket.handshake.query.token")
    let userInfoData = JSON.parse(await app.redis.get(ctx.socket.handshake.query.token));
    const MAX_TTL = 24 * 60 * 60;// 最大过期时长，兜底用
    // console.log(ctx.socket.id,"ctx.socket.id")
    // console.log(userInfoData,"userInfoData")
    ctx.socket?await app.redis.set(userInfoData?userInfoData.id:null, ctx.socket.id, 'EX', MAX_TTL):null;
    // console.log(userInfoData,"==")
    await next();
    console.log('disconnection!');
  };
};
