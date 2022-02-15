module.exports = (sequelize,dataType) => {
    let alias = 'Size'
    let cols = {
        id:{
            type: dataType.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true
        },
        num:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false
        },
        createdAt:{
            type:dataType.DATE
        },
        updatedAt:{
            type:dataType.DATE
        },
    }
    let config={
        tableName:'size',
        timestamps:true
    }
    const Size = sequelize.define(alias,cols,config)
    Size.associate = models => {
        Size.belongsToMany(models.Product,{
            as:'products',
            through: 'products_size',
            foreignKey:'size_id',
            otherKey:'product_id',
            timestamps:false
        })
    }
    return Size
}