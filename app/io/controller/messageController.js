const Controller = require('egg').Controller;

class messageController extends Controller {

  //Controller 对客户端发送的 event 进行处理；由于其继承于 egg.Contoller
  async getPersonalInfo() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    console.log("sss")
    // this.ctx.socket.emit('res', "sss");
    // await ctx.socket.emit('res', `Hi! I've got your message: ${message}`);

    // const { ctx, app } = this;
    // console.log("jinru")
    // const nsp = app.io.of('/');
    // const message = ctx.args[0] || {};
    // const socket = ctx.socket;
    // const client = socket.id;

    // console.log('s',nsp,message,client,process.pid)
    // // const say = await this.ctx.service.queryAdminConf.queryLoanFlag();
    // this.ctx.socket.emit('res', say);
  }
}

module.exports = messageController;
