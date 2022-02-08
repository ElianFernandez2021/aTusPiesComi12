module.exports = (sequelize,dataType) => {
    let alias = 'Product'
    let cols = {
        id: {
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false,
            autoIncrement:true,
            unique:true
        },
        name: {
            type:dataType.STRING(50),
            allowNull:false
        },
        description: {
            type:dataType.STRING(50),
            allowNull:false
        },
        price: {
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false,
        },
        category_id:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false
        },
        trade_mark:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false
        },
        created_at:{
            type: dataType.DATE
        },
        updated_at:{
            type: dataType.DATE
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