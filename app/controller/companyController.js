'use strict';

const Controller = require('egg').Controller;

class companyController extends Controller {

  // 查询公司数据
  async queryCompany() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.companyService.queryCompany(data);
    ctx.body = result;
  }


  // 新增公司数据
  async addCompany() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 从service文件中拿到返回结果
    const result = await ctx.service.companyService.addCompany(data);
    ctx.body = result;
  }





}

module.exports = companyController;
