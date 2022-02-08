module.exports = (sequelize,dataType) => {
    let alias='Product_cart'
    let cols={
        id:{
            type: dataType.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true
        },
        cart_id:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false
        },
        product_id:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false
        },
        quantity:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false
        },
        create_at:{
            type: dataType.DATE,
        },
        update_at:{
            type: dataType.DATE,
        }
    }
    let config= {
        tableName:'products_cart',
        timestamps:true,
        createdAt:'create_at',
        updatedAt:'update_at',
    }
    const Product_cart= sequelize.define(alias,cols,config)
    Product_cart.associate = models => {
        Product_cart.belongsTo(models.Product,{
            as:'product',
            foreignKey:'product_id'
        })
        Product_cart.belongsTo(models.Cart,{
            as:'cart',
            foreignKey:'cart_id'
        })
    }
    return Product_cart
}