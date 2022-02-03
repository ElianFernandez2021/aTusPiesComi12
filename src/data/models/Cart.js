const models = require('../models')
module.exports = (sequelize,dataTypes) => {
    let alias= "Cart"
    let cols={
        id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull:false
        }
    }
    let config={
        tableName: "cart",
        timestamps:false
    }

    let Cart = sequelize.define(alias,cols,config)
    Cart.associate = models =>{
        Cart.belongsTo(models.Products_cart,{
            as:"product_cart",
            foreignKey:"cart_id"
        }),
        Cart.belongsTo(models.User,{
            as:"user-cart",
            foreignKey:"user_id"
        })
    }
    return Cart
}