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
        Product.hasMany(models.Product_size), {
            as: "sizes",
            foreignKey: "product_id"
        }
            Product.hasMany(models.Category), {
            as: "categories",
            foreignKey: "name_id"
        }
            Product.hasMany(models.Product_cart), {
            as: "products",
            foreignKey: "product_id"
        }
            Product.hasMany(models.Trade_mark), {
            as: "mark",
            foreignKey: "trade_mark"
        }
            Product.hasMany(models.products_color), {
            as: "color",
            foreignKey: "product_id"
        }
    }
    return Product;
}
