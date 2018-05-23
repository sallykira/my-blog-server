
module.exports = app => {
    const DataTypes = app.Sequelize;

    const TagModel = app.model.define('blog_article_tag', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
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
        tableName: 'blog_article_tag', timestamps: false ,version: true
    });

    TagModel.associate = function() {

    }

    return TagModel;

}


