module.exports = (sequelize,dataType) => {
    let alias = 'Category'
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
        createdAt:{
            type: dataType.DATE
        },
        updatedAt:{
            type: dataType.DATE
        }
    }
    let config = {
        tableName: 'categories',
        timestamps: true
    }
    const Category = sequelize.define(alias,cols,config)
    Category.associate = (models) => {
        Category.hasMany(models.Product,{
            as:'products',
            foreignKey: 'category_id'
        })        
    }
    return Category
}