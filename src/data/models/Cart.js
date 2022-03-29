module.exports = (sequelize,dataType) => {
    let alias='Cart'
    let cols={
        id:{
            type: dataType.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement:true,
        },
        user_id:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false
            }
    }
    let config= {
        tableName:'cart',
        timestamps:false
    }
    const Cart= sequelize.define(alias,cols,config)
    Cart.associate = models => {
        Cart.belongsTo(models.User,{
            as:'cart_user',
            foreignKey:'user_id'
        })
        Cart.hasMany(models.Product_cart,{
            as:'products_cart',
            foreignKey:'cart_id'
        })
    }           
    return Cart
}