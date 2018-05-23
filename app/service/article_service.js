const Service = require('egg').Service;
const HashMap = require('hashmap');
const _ = require('lodash');

const ArticleQueryType = require('../common/article_query_type')
const ValidCode = require('../common/valid_code')
const ResponseCode = require('../common/response_code');

module.exports = app => class ArticleService extends Service {
    constructor(ctx) {
        super(ctx);
        this.ArticleModel = ctx.model.ArticleModel;
        this.CategoryModel = ctx.model.CategoryModel;
        this.TagModel = ctx.model.TagModel;
        this.TagArticleModel = ctx.model.TagArticleModel;
        this.BizResponse = ctx.response.BizResponse;
        this.TagService = ctx.service.tagService;
        this.helper = ctx.helper;
        this.Op = app.Sequelize.Op;
    }

    /**
     * 添加文章
     * @returns {Promise<*>}
     */
    async addArticle() {

    }

    /**
     * 更新文章
     * @param id
     * @returns {Promise<*>}
     */
    async updateArticle({id}) {

    }

    /**
     * 删除文章
     * @param id
     * @returns {Promise<*>}
     */
    async deleteArticle({id}) {

    }

    /**
     * 获取文章列表
     * @returns {Promise<*>}
     */
    async listArticle({queryType = 0, categoryId = 0, tagId = 0, pageNo = 1, pageSize = 10}) {
        //按照标签查询
        let articleIdArr = [];
        if (ArticleQueryType.TAG == queryType) {
            let arIdArr = await this.TagArticleModel.findAll({
                where: {
                    tagId: tagId,
                    status: ValidCode.VALID
                },
                attributes: ['articleId'],
                limit: Number(pageSize | 0),
                offset: this.helper.getOffset(pageNo, pageSize),
                order: [['id', 'DESC']]
            }).then(rows => rows && _.map(rows, 'articleId'));
            articleIdArr = arIdArr;
            //空值返回
            if (!articleIdArr || articleIdArr.length == 0) {
                return this.BizResponse.isSuccess({
                    articleList: null,
                    total: 0
                });
            }
        }
        const {articleList, total} = await this.listArticleByCondition(categoryId, articleIdArr, pageNo, pageSize);
        return this.BizResponse.isSuccess({
            articleList: articleList,
            total: total
        });
    }

    /**
     * 获取文章列表内部通用接口
     * @param categoryId
     * @param articleIdArr
     * @param pageNo
     * @param pageSize
     * @returns {Promise<*>}
     */
    async listArticleByCondition(categoryId, articleIdArr, pageNo = 1, pageSize = 10) {
        let categoryIdArr = [];
        let where = {status: ValidCode.VALID};
        //按照分类
        if (!!categoryId && categoryId != 0) {
            where.categoryId = categoryId;
        }
        //按照标签
        if (articleIdArr.length > 0) {
            where.id = {
                [this.Op.in]: articleIdArr
            }
        }
        //默认按照首页查询
        let articleRows = await this.ArticleModel.findAndCount({
            where: where,
            attributes: ['id', 'categoryId', 'content', 'originalUrl', 'title', 'createdAt'],
            limit: Number(pageSize | 0),
            offset: this.helper.getOffset(pageNo, pageSize),
            order: [['id', 'DESC']]
        }).then(result => {
            result.rows && result.rows.map(r => {
                categoryIdArr.push(r.categoryId)
            })
            return result;
        });
        //空值直接返回
        if (articleRows.count == 0) {
            return this.BizResponse.isSuccess({
                articleList: null,
                total: 0
            });
        }
        //分类id去重
        categoryIdArr = _.uniq(categoryIdArr);
        //分类map
        const categoryMap = await this.CategoryModel.findAll({
            where: {
                id: {
                    [this.Op.in]: categoryIdArr
                }
            }
        }).then(rows => {
            const map = new HashMap();
            rows && rows.forEach(r => {
                map.set(r.id, r.name);
            })
            return map;
        })
        //结果集格式化
        const articleList = await Promise.all(articleRows.rows.map(async r => {
            r = r.toJSON()
            r.createdAt = this.helper.formatDefaultDateTime(r.createdAt)
            r.categoryName = categoryMap.get(r.categoryId)
            r.tags = await this.TagService.listTagByArticleId(r.id);
            return r;
        }))
        return {
            articleList: articleList,
            total: articleRows.count
        }
    }

    /**
     * 获取文章详情
     * @param id
     * @returns {Promise<void>}
     */
    async getArticleDetail({id}) {
        if (!id) return this.BizResponse.isError(ResponseCode.ILLEGAL_ARGUMENT, '参数错误');
        //文章
        let article = await this.ArticleModel.findById(id).then(row => row && row.toJSON());
        if (!article) return this.BizResponse.isError(ResponseCode.INSTANCE_NOT_EXIST, '文章分类不存在');
        //文章类别
        const category = await this.CategoryModel.findById(article.categoryId);
        article.categoryName = category.name;
        article.createdAt = this.helper.formatDefaultDateTime(article.createdAt)
        article.author = '黄志鹏'
        //文章标签
        article.tags = await this.TagService.listTagByArticleId(article.id);
        //文章评论
        return this.BizResponse.isSuccess(article);
    }
}