module.exports = (sequelize,dataType) => {
    let alias='Product_color'
    let cols={
        id:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false,
            autoIncrement:true,
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
        tablename:'products_color',
        timestamp:false
    }
    const Product_color= sequelize.define(alias,cols,config)
    Product_color.associate = models => {
        Product_color.hasMany(models.Produc,{
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