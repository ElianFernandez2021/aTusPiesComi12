module.exports = (sequelize,dataTypes) => {
    let alias = 'Product'
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            autoIncrement:true,
            unique:true
        },
        name: {
            type:dataTypes.STRING(50),
            allowNull:false
        },
        description: {
            type:dataTypes.STRING(50),
            allowNull:false
        },
        price: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull:false,
        },
        category_id:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },
        trade_mark:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },
        created_at:{
            type: dataTypes.DATE
        },
        updated_at:{
            type: dataTypes.DATE
        }
    }
    let config = {
        tableName: 'products',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    const Product = sequelize.define(alias,cols,config)
    Product.associate = (models) => {
        Product.belongsTo(models.Category,{
            as:'category',
            foreignKey: 'category_id'
        })

        Product.belongsTo(models.Trade_mark,{
            as:'trade_mark',
            foreignKey: 'trade_mark'
        })        
    }
    return Product
}