const Controller = require('egg').Controller;
// const _ = require('lodash');

module.exports = app => class CategoryController extends Controller {

    constructor(ctx) {
        super(ctx);
        this.request = ctx.request;
        this.CategoryService = ctx.service.categoryService;
    }

    //获取文章类别列表
    async listCategory() {
        const response = await this.CategoryService.listCategory();
        this.ctx.body = response;
    }

    //新增文章类别
    async addCategory(){
        const response = await this.CategoryService.addCategory(this.request.body);
        this.ctx.body = response;
    }

    //更新文章类别
    async updateCategory(){
        const response = await this.CategoryService.updateCategory(this.request.body);
        this.ctx.body = response;
    }

    //删除文章类别
    async deleteCategory(){
        const response = await this.CategoryService.deleteCategory(this.request.query);
        this.ctx.body = response;
    }
}