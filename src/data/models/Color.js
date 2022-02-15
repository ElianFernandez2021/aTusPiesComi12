module.exports = (sequelize,dataType) => {
    let alias='Color'
    let cols={
        id:{
            type: dataType.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type: dataType.STRING,
            allowNull:false
        },
        createdAt:{
            type:dataType.DATE
        },
        updatedAt:{
            type:dataType.DATE
        },
    }
    let config= {
        tableName:'color',
        timestamps:true
    }
    const Color= sequelize.define(alias,cols,config)
    Color.associate = models => {
        Color.belongsToMany(models.Product,{
            as:'products',
            through: 'products_color',
            foreignKey:'color_id',
            otherKey:'product_id',
            timestamps:false
        })
    }
    return Color
}