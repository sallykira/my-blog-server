const Controller = require('egg').Controller;

module.exports = app => class ArticleController extends Controller {

    constructor(ctx){
        super(ctx);
        this.request = ctx.request;
        this.ArticleService = ctx.service.articleService;
    }

    //获取文章详情
    async getArticleDetail(){
        const response = await this.ArticleService.getArticleDetail(this.request.query)
        this.ctx.body = response;
    }

    //获取文章列表
    async listArticle() {
        const response = await this.ArticleService.listArticle(this.request.body);
        this.ctx.body = response;
    }

    //新增文章
    async addArticle(){
        const response = await this.ArticleService.addArticle(this.request.body);
        this.ctx.body = response;
    }

    //更新文章
    async updateArticle(){
        const response = await this.ArticleService.updateArticle(this.request.body);
        this.ctx.body = response;
    }

    //删除文章
    async deleteArticle(){
        const response = await this.ArticleService.deleteArticle(this.request.query);
        this.ctx.body = response;
    }


}