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
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        }
    }

    const config = {
        tableName: 'categories',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }

    const Category = sequelize.define(alias, cols, config)
    
    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'name'
        })
    }
    return Category
}