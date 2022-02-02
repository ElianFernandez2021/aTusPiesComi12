module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_size';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            through:"Product"
        },
        size_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            trhough:"Size"
        },
    };

    let config = {
        timestamps: false,
        tableName:"products_size"
    }
    const Product_size = sequelize.define(alias, cols, config);

    Product_size.associate = models => {
        Product_size.belongsToMany(models.Product,{
            as:"product_size",
            foreignKey:"product_id"
        })
        Product_size.belongsTo(models.Size,{
            as:"sizeId",
            foreignKey:"size_id"
        })
    }
    
    return Product_size
};