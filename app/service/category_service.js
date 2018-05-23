const Service = require('egg').Service;
const ResponseCode = require('../common/response_code');


module.exports = app => class CategoryService extends Service {
    constructor(ctx) {
        super(ctx);
        this.CategoryModel = ctx.model.CategoryModel;
        this.BizResponse = ctx.response.BizResponse;
        this.Helper = ctx.helper;
    }

    /**
     * 添加文章分类
     * @param name
     * @returns {Promise<*>}
     */
    async addCategory({name}){
        if (!name.trim()) return this.BizResponse.isError(ResponseCode.ILLEGAL_ARGUMENT,'参数错误');
        const category = await this.CategoryModel.create({ name });
        if (!category) return this.BizResponse.isError(-1,'添加文章分类失败');
        return this.BizResponse.isSuccess();
    }

    /**
     * 更新文章分类
     * @param id
     * @param name
     * @returns {Promise<*>}
     */
    async updateCategory({id,name}){
        if (!id || !name.trim()) return this.BizResponse.isError(-1,'参数错误');
        const category = await this.CategoryModel.findById(id);
        if (!category) return this.BizResponse.isError(-1,'文章分类不存在');
        const update = await category.update({ name: name });
        if (!update) return this.BizResponse.isError(-1,'更新文章分类失败');
        return this.BizResponse.isSuccess();
    }

    /**
     * 删除文章分类
     * @param id
     * @returns {Promise<*>}
     */
    async deleteCategory({id}){
        if (!id) return this.BizResponse.isError(-1,'参数错误');
        const category = await this.CategoryModel.findById(id);
        if (!category) return this.BizResponse.isError(-1,'文章分类不存在');
        const update = await category.update({ status: -1 },{ where: { id: id }});
        if (!update) return this.BizResponse.isError(-1,'删除文章分类失败');
        return this.BizResponse.isSuccess();
    }


    /**
     * 获取文章类别列表
     * @returns {Promise<*>}
     */
    async listCategory(){
        const { count, rows} = await this.CategoryModel.findAndCount({
            attributes: ['id', 'name'],
            where : { status : 1}
        }).then(result => result.rows && result.rows.map(r => r.toJSON()));
        return this.BizResponse.isSuccess({
            categoryList: rows,
            total: count
        })
    }

}