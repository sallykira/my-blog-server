const Controller = require('egg').Controller;
// const _ = require('lodash');

module.exports = app => class TagController extends Controller {

    constructor(ctx) {
        super(ctx);
        this.request = ctx.request;
        this.TagService = ctx.service.tagService;
    }

    //获取标签列表
    async listTag() {
        const response = await this.TagService.listTag();
        this.ctx.body = response;
    }

    //新增标签
    async addTag(){
        const response = await this.TagService.addTag(this.request.body);
        this.ctx.body = response;
    }

    //更新标签
    async updateTag(){
        const response = await this.TagService.updateTag(this.request.body);
        this.ctx.body = response;
    }

    //删除标签
    async deleteTag(){
        const response = await this.TagService.deleteTag(this.request.query);
        this.ctx.body = response;
    }
}