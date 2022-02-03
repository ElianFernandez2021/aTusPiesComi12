module.exports = (sequelize,dataTypes) => {
    let alias = 'Size'
    let col = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement:true
        },
        number: {
            type: dataTypes.INTEGER,
        }
    }
    let config ={
        timeStamps: false,
        tableName:"products_cart",
    }
    const Size = sequelize.define(alias,col,config)

    Size.associate = models => {
        Size.hasMany(models.Product_size,{
            as:"size",
            foreignKey:"size_id"
        })
    }
    return Size
}