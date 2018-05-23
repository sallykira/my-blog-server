//文章表
/* indent size: 2 */
module.exports = app => {
    const DataTypes = app.Sequelize;

    const ArticleModel = app.model.define('blog_article', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        categoryId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        originalUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        status: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            defaultValue: '1'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        version: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        }
    }, {
        tableName: 'blog_article', timestamps: false, version: true
    });

    ArticleModel.associate = function () {
        ArticleModel.belongsTo(app.model.CategoryModel, {foreignKey: 'categoryId'});
    }

    return ArticleModel;
};