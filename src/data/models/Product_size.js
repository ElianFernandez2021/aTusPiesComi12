module.exports = (sequelize,dataType) => {
    let alias='Product_size'
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
        size_id:{
            type:dataType.INTEGER.UNSIGNED,
            allowNull:false
        }
    }
    let config= {
        tableName:'products_size',
        timestamps:false
    }
    const Product_size= sequelize.define(alias,cols,config)
    /* Product_size.associate = models => {
        Product_size.hasMany(models.Product,{
            as:'Product_size',
            foreignKey:'product_id'
        })

        Product_size.hasMany(models.Size,{
            as:'Size',
            foreignKey:'size_id'
        })
    } */
    return Product_size
}