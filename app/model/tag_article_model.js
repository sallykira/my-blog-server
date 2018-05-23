module.exports = app => {
    const DataTypes = app.Sequelize;

    const TagArticleModel = app.model.define('blog_tag_article', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tagId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        articleId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataTypes.TINYINT(4),
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
        tableName: 'blog_tag_article', timestamps: false ,version: true
    });

    TagArticleModel.associate = function() {

    }

    return TagArticleModel;

}


