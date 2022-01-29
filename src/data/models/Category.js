module.exports = (sequelize, dataTypes) => {
    const alias = "Category";
    const cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        }
    }

    const config = {
        tableName: 'categories',
        timestaps: false
    }

    const Category = sequelize.define(alias, cols, config)

    Category.associate = (models) => {
        Category.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'productsId'
        })
    }
    return Category
}