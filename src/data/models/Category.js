module.exports = (sequelize,dataTypes) => {
    let alias = 'Category'
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
        created_at:{
            type: dataTypes.DATE
        },
        updated_at:{
            type: dataTypes.DATE
        }
    }
    let config = {
        tableName: 'categories'
    }
    const Category = sequelize.define(alias,cols,config)
    Category.associate = (models) => {
        Category.belongsTo(models.Product,{
            as:'category',
            foreignKey: 'category_id'
        })        
    }
    return Category
}