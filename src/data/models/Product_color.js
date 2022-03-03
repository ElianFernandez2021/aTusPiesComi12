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
        timestamps:false
    }
    const Product_color= sequelize.define(alias,cols,config)

    return Product_color
}