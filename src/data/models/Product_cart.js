module.exports = (sequelize,dataTypes) => {
    let alias= "Product_cart"
    let cols = {
        id:{
            type: dataTypes.INTEGER(100).UNSIGNED,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        cart_id:{
            type: dataTypes.INTEGER(100).UNSIGNED,
            allowNull:false,

        },
        product_id: {
            type: dataTypes.INTEGER(100).UNSIGNED,
            allowNull:false,
        },
        quantity:{
            type: dataTypes.INTEGER(100).UNSIGNED,
            allowNull:false
        }
    }
    let config = {
        tableName:"products_cart",
        createdAt:"created_at",
        updatedAt:"updated_at",
        timestamps:true
    }
    let products_cart = sequelize.define(alias,cols,config)
    
     products_cart.associate = models => {
         products_cart.hasOne(models.cart,{
             as: "cart",
             foreignKey:"cart_id"
         })
         products_cart.hasMany(models.product,{
             as:"products",
             foreignKey:"product_id"
         })
     }
    
    return products_cart
} 