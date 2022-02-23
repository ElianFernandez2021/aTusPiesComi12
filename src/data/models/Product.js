module.exports = (sequelize,dataType) => {
    let alias = 'Product'
    let cols = {
        id: {
            type: dataType.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true
        },
        name: {
            type:dataType.STRING(50),
            allowNull:false
        },
        size:{
            type: dataType.STRING(100)
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
        updatedAt: 'updated_at',
        timestamps: true
    }
    const Product = sequelize.define(alias,cols,config)
    Product.associate = (models) => {
        Product.belongsTo(models.Category,{
            as:'category',
            foreignKey: 'category_id'
        })
        Product.hasMany(models.Product_cart,{
            as:'cart',
            foreignKey: 'product_id'
        })   

        Product.belongsTo(models.Trade_mark,{
            as:'marca',
            foreignKey: 'trade_mark'
        })        
        Product.belongsToMany(models.Color,{
            as:'colors',
            through: 'products_color',
            foreignKey:'product_id',
            otherKey:'color_id',
            timestamps:false
        })
        
        Product.hasMany(models.Product_image,{
            as:'images',
            foreignKey: 'product_id'
        }) 
    }
    return Product
}