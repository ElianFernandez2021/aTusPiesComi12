module.exports = (sequelize, dataTypes) => {
    const alias = "products_trade_mark";
    const cols = {
        id: {
        type: dataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false,
        },
        product_id: {
            type: dataTypes.INTEGER(),
            allowNull: false,

        },
        trade_mark_id: {
            type: dataTypes.INTEGER().UNSIGNED,
            allowNull: false,
            unique: true,
        },
       
    };
    
    const config = {
        tableName: "products_trade_mark",
        createdAt: "created_at",
        updatedAt: "update_at"
    };
    
    
    const products_trade_mark = sequelize.define(alias, cols, config);
    products_trade_mark.asociate = products => {
        products_trade_mark.hasMany(products.id,{
            as:"products_trade_mark",
            foreignKey:"trade_mark_id",
        })
    }
    return products_trade_mark
}