const { FOREIGNKEYS } = require("sequelize/dist/lib/query-types");

module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER(100).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        color: {
            type: dataTypes.STRING(30)
        },
        size: {
            type: dataTypes.INTEGER(2)
        },
        description: {
            type: dataTypes.STRING(800),
        },
        price: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        trade_mark: {
            type: dataTypes.STRING(30)
        }
    }
    let config = {
        tableName: "products",
        timestamps: true
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = models => {
        Product.belongsToMany(models.Products_size), {
            as: "size",
            foreignkeys: "sizeId"
        },
            Product.hasMany(models.Categories), {
            as: "categories",
            foreignkeys: "nameId"
        },
            Product.hasMany(models.Products_cart), {
            as: "products",
            foreignkeys: "productsCart"
        },
            Product.hasMany(models.Products_trade_mark), {
            as: "products",
            foreignkeys: "productId"
        },
            Product.belongsToMany(models.Products_color), {
            as: "products",
            foreignkeys: "productId"
        }
    }

    return Product;
}
