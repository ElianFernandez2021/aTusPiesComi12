module.exports = (sequelize,dataType) => {

    let alias='Product_color'
    let cols={
        id:{
            type: dataType.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true
        },
        product_id:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false
        },
        color_id:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false
        }
    }
    let config= {
        tableName:'products_color',
        timestamp:false
    }
    const Product_color= sequelize.define(alias,cols,config)
    Product_color.associate = models => {
        Product_color.hasMany(models.Product,{
            as:'product',
            foreignKey:'product_id'
        })
        Product_color.hasMany(models.Color,{
            as:'color',
            foreignKey:'color_id'
        })
    }
    return Product_color
}