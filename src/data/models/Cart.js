module.exports = (sequelize,dataTypes) => {
    let alias= "cart"
    let cols={
        id:{
            type: dataTypes.INTEGER(100).UNSIGNED,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        user_id: {
            type: dataTypes.INTEGER(100).UNSIGNED,
            allowNull:false
        }
    }
    let config={
        tableName: "cart",
        timestamps:false
    }

    let cart = sequelize.define(alias,cols,config)
    cart.associate = models => {
        cart.hasMany(models.product_cart,{
            as:"product-cart",
            foreignKey:"cart_id"
        }),
        cart.hasOne(models.user,{
            as:"user-cart",
            foreignKey:"user_id"
        })
    }
    return cart
}