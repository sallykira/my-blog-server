const Service = require('egg').Service;
const HashMap = require('hashmap');
const _ = require('lodash');

const ValidCode = require('../common/valid_code')
const ResponseCode = require('../common/response_code');


module.exports = app => class TagService extends Service {
    constructor(ctx) {
        super(ctx);
        this.TagModel = ctx.model.TagModel;
        this.TagArticleModel = ctx.model.TagArticleModel;
        this.BizResponse = ctx.response.BizResponse;
        this.ResponseCode = ctx.response.ResponseCode;
        this.helper = ctx.helper;
        this.Op = app.Sequelize.Op;
    }

    /**
     * 添加标签
     * @returns {Promise<*>}
     */
    async addTag({name}) {
        if (!name.trim()) return this.BizResponse.isError(ResponseCode.ILLEGAL_ARGUMENT, '参数错误');
        const tag = await this.TagModel.create({name});
        if (!tag) return this.BizResponse.isError(ResponseCode.ERROR, '添加标签失败');
        return this.BizResponse.isSuccess();
    }

    /**
     * 更新标签
     * @param id
     * @returns {Promise<*>}
     */
    async updateTag({id,name}) {
        if (!id || !name.trim()) return this.BizResponse.isError(ResponseCode.ILLEGAL_ARGUMENT, '参数错误');
        const tag = await this.TagModel.findById(id);
        if (!tag) return this.BizResponse.isError(ResponseCode.INSTANCE_NOT_EXIST, '标签不存在');
        const update = await tag.update({name: name});
        if (!update) return this.BizResponse.isError(ResponseCode.ERROR, '更新标签失败');
        return this.BizResponse.isSuccess();
    }

    /**
     * 删除标签
     * @param id
     * @returns {Promise<*>}
     */
    async deleteTag({id}) {
        if (!id) return this.BizResponse.isError(ResponseCode.ILLEGAL_ARGUMENT, '参数错误');
        const tag = await this.TagModel.findById(id);
        if (!tag) return this.BizResponse.isError(ResponseCode.INSTANCE_NOT_EXIST, '标签不存在');
        const update = await tag.update({status: ValidCode.VALID}, {where: {id: id}});
        if (!update) return this.BizResponse.isError(ResponseCode.ERROR, '删除标签失败');
        return this.BizResponse.isSuccess();
    }


    /**
     * 获取标签列表
     * @returns {Promise<*>}
     */
    async listTag() {
        let tagMap = new HashMap();
        //标签集合
        const tagRows = await this.TagModel.findAndCount({
            attributes: ['id', 'name'],
            where: {status: 1}
        }).then(result => {
            if (result.rows) {
                result.rows.map(r => {
                    tagMap.set(r.id, r.name)
                })
            }
            return result;
        });
        //为空直接返回
        if (tagRows.count == 0){
            return this.BizResponse.isSuccess({
                tagList: null,
                total: 0
            })
        }
        //每个标签的文章数量
        const tagArticleMap = await this.TagArticleModel.findAll({
            where: {
                tagId: {
                    [this.Op.in]: tagMap.keys()
                },
                status : ValidCode.VALID
            },
            attributes: ['tagId', [app.Sequelize.fn('COUNT', app.Sequelize.col('tagId')), 'count']],
            group: 'tagId',
            raw: true
        }).then(rows => {
            const map = new HashMap();
            rows && rows.forEach(r => {
                map.set(r.tagId,r.count);
            })
            return map;
        })
        //结果集
        const tagList = tagRows.rows.map(r => {
            r = r.toJSON();
            r.count = tagArticleMap.get(r.id);
            return r;
        });
        return this.BizResponse.isSuccess({
            tagList: tagList,
            total: tagRows.count
        })
    }

    /**
     * 获取标签详情
     * @param id
     * @returns {Promise<void>}
     */
    async getTagDetail({id}) {
        if (!id) return this.BizResponse.isError(-1, '参数错误');
        //标签
        let tag = await this.TagModel.findOne({
            attributes: ['id', 'name'],
        }).then(row => row && row.toJSON());
        if (!tag) return this.BizResponse.isError(-1, '标签分类不存在');
        // todo 文章数量？
        return this.BizResponse.isSuccess(tag);
    }
}