/* indent size: 2 */

module.exports = app => {
    const DataTypes = app.Sequelize;

    const CategoryModel = app.model.define('blog_article_category', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ''
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
        tableName: 'blog_article_category', timestamps: false, version: true
    });

    CategoryModel.associate = function () {

    }

    return CategoryModel;
};
