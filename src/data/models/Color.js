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
        Color.hasMany(models.products_color, {
            as: 'products_color',
            foreignKey: 'color_id'
        })
    }
    return Color
}