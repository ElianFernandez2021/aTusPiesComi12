module.exports = (sequelize,dataType) => {
    let alias='Cart'
    let cols={
        id:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false,
            autoIncrement:true,
        },
        user_id:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false
            }
    }
    let config= {
        tablename:'cart',
        timestamp:false
    }
    const Cart= sequelize.define(alias,cols,config)
    Cart.associate = models => {
        Cart.belongsTo(models.User,{
            as:'cart',
            foreignKey:'user_id'
        })
        Cart.hasMany(models.Product_cart,{
            as:'cart',
            foreignKey:'cart_id'
        })
    }
    return Cart
}