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
        tableName:'size'
    }
    const Size = sequelize.define(alias,cols,config)
    Size.associate = models => {
        Size.hasMany(models.Product_size,{
            as:'size',
            foreignKey:'size_id'
        })
    }
    return Size
}