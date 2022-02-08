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
        tableName:'color'
    }
    const Color= sequelize.define(alias,cols,config)
    Color.associate = models => {
        Color.hasMany(models.Product_color,{
            as:'color',
            foreignKey:'color_id'
        })
    }
    return Color
}