module.exports = () => {

  return async function (ctx, next) {
    // 拿到传会数据的header 中的token值
    const token = ctx.request.header.authorization;
    const newToken = token ? token.replace("Bearer ", "") : token;   //得把token中的Bearer去掉，不然会报错
    const method = ctx.method.toLowerCase();
    const prefix = 'api'
    if (!token) {
      if (ctx.path === `/` || ctx.path === `/${prefix}/login` || ctx.path === `/${prefix}/pcLogin`) {
        await next();
      } else {
        console.log(ctx.path, "ctx.path")
        ctx.throw(401, '未登录， 请先登录');
      }
    } else { // 当前token值存在
      if (ctx.path === `/` || ctx.path === `/${prefix}/login` || ctx.path === `/${prefix}/pcLogin`) {
        await next();
      } else {
        try {
          let redisData = await ctx.app.redis.get(newToken)
          console.log(redisData, "redisData")
          if (!redisData) {
            ctx.body = { msg: 'Token已过期，请重新登陆' }
            ctx.response.status = 401
            ctx.throw(401, 'Token已过期，请重新登陆');
          } else {
            await next();
          }
        } catch (e) {
        }
      }
    }


    await next();

  };





};
