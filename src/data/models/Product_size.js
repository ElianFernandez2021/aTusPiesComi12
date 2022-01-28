module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_size';
    let cols = {
        id: {
            type: dataTypes.int.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.INT,
            allowNull: false,
            through:"products"
        },
        size_id: {
            type: dataTypes.INT.UNSIGNED,
            allowNull: false,
            trhough:"size"
        },
    };

    let config = {
        timestamps: false,
        tableName:"products_size"
    }
    const Product_size = sequelize.define(alias, cols, config);

    
    return Product_size
};