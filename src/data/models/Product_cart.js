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
        timestamps:true
    }
    let Product_cart = sequelize.define(alias,cols,config)
    
     Product_cart.associate = models => {
         Product_cart.hasMany(models.Cart,{
             as: "cart",
             foreignKey:"cart_id"
         })
         Product_cart.belongsTo(models.Product,{
             as:"products",
             foreignKey:"product_id"
         })
     }
    
    return Product_cart
} 