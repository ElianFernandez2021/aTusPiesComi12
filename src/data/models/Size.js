module.exports = (sequelize,dataTypes) => {
    let alias = 'Size'
    let col = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement:true
        }
    }
    let config ={
        timeStamps: false,
        tableName:"products_cart",
    }
    const Size = sequelize.define(alias,col,config)
    return Size
}