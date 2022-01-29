module.exports = (sequelize, dataTypes) => {
    const alias = "Color";
    const cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        }
    }
    const config = {
        tableName: 'color',
        timestaps: false
    }
    const Color = sequelize.define(alias, cols, config)
    Color.associate = models => {
        Color.hasOne(models.ProductsColor, {
            as: 'products_color',
            foreignKey: 'productsColor'
        })
    }
    return Color
}