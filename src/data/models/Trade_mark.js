module.exports = (sequelize,dataTypes) => {
    let alias = 'Trade_mark'
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true
        },
        mark: {
            type:dataTypes.STRING(50),
            allowNull:false
       }
    }
    let config = {
        tableName: 'trade_mark',
        timestamps:false
    }
    const Trade_mark = sequelize.define(alias,cols,config)
    Trade_mark.associate = (models) => {
        Trade_mark.hasMany(models.Product,{
            as:'products',
            foreignKey: 'trade_mark'
        })        
    }
    return Trade_mark
}