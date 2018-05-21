const Service = require('egg').Service;

module.exports = app => class ArticleService extends Service {
    constructor(ctx) {
        super(ctx);
        this.ArticleModel = ctx.model.ArticleModel;
        this.BizResponse = ctx.response.BizResponse;
        this.ResponseCode = ctx.response.ResponseCode;
    }

    /**
     * 添加文章
     * @param name
     * @returns {Promise<*>}
     */
    async addArticle({name}){

    }

    /**
     * 更新文章
     * @param id
     * @param name
     * @returns {Promise<*>}
     */
    async updateArticle({id,name}){

    }

    /**
     * 删除文章
     * @param id
     * @returns {Promise<*>}
     */
    async deleteArticle({id}){

    }


    /**
     * 获取文章列表
     * @returns {Promise<*>}
     */
    async listArticle({}){

    }

    /**
     * 获取文章详情
     * @param id
     * @returns {Promise<void>}
     */
    async getArticleDetail({id}){
        if (!id) return this.BizResponse.isError(-1,'参数错误');
        const article = await this.ArticleModel.findById(id);
        if (!article) return this.BizResponse.isError(-1,'文章分类不存在');
        


        return this.BizResponse.isSuccess();
    }
}