//文章表
/* indent size: 2 */
module.exports = app => {
    const DataTypes = app.Sequelize;

    const ArticleModel = app.model.define('blog_article_category', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        categoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ""
        },
        originalUrl: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ""
        },
        title: {
            type: Sequelize.STRING,
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
        tableName: 'blog_article', timestamps: false ,version: true
    });

    ArticleModel.associate = function() {

    }

    return ArticleModel;
};