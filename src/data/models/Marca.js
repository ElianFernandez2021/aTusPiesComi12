module.exports = (sequelize, dataTypes) => {
    const alias = "Trade_mark";
    const cols = {
        id: {
        type: dataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false,
        },
        mark: {
            type: dataTypes.STRING(),
            allowNull: false,
        },
       
    };
    
    const config = {
        tableName: "trade_mark",
        timestamps: false
    };
    
    
    const Trade_mark = sequelize.define(alias, cols, config);
    Trade_mark.associate = models => {
        Trade_mark.belongsTo(models.Product,{
            as:"product_mark",
            foreignKey:"trade_mark",
        })
    }
    return Trade_mark
}