module.exports = (sequelize, dataTypes) => {
    let alias = "product_image"
    let cols = {
        id: {
            type: dataTypes.INTEGER().UNSIGNED,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        image: {
            type: dataTypes.STRING(),
            allowNull:false
        },
        product_id: {
            type: dataTypes.INTEGER().UNSIGNED,
            allowNull:false,
        }
            
    }
    let config = {
        tableName:"products_image",
        timestamps:false
    }

    const Product_image = sequelize.define(alias,cols,config)

    Product_image.associate= models => {
        Product_image.belongsTo(models.Product,{
            as:"imageProduct",
            foreignKey:"product_id"
        })
    }
    return Product_image
}