module.exports = (sequelize,dataType) => {
    let alias='Product_image'
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
        image:{
            type: dataType.STRING,
            allowNull:false
        }
    }
    let config= {
        tableName:'products_image',
        timestamp:false
    }
    const Product_image= sequelize.define(alias,cols,config)
    Product_image.associate = models => {
        Product_image.hasMany(models.Product,{
            as:'color',
            foreignKey:'product_id'
        })
    }
    return Product_image
}