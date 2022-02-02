module.exports = (sequelize, dataTypes) => {
    const alias = "products_color";
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
        color_id: {
            type: dataTypes.INTEGER().UNSIGNED,
            allowNull: false,
            unique: true,
        },
       
    };
    
    const config = {
        tableName: "products_color",
        createdAt: "created_at",
        updatedAt: "update_at"
    };
    
    
    const products_color = sequelize.define(alias, cols, config);
    products_color.associate = models => {
        products_color.belongsTo(models.Product,{
            as:"products_color",
            foreignKey:"product_id",
        })
        products_color.belongsTo(models.Color,{
            as:"color",
            foreignKey:"color_id"
        })
    }
    return products_color
}