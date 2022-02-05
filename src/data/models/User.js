module.exports = (sequelize, dataTypes) => {
    const alias = "User";
    const cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        first_name: {
            type: dataTypes.STRING(45),
            
        },
        last_name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(60),
            allowNull: false,
            unique: true
        },
        avatar: {
            type: dataTypes.STRING(100),
        },
        password: {
            type: dataTypes.STRING(70),
            allowNull: false,
        },
        rol: {
            type: dataTypes.INTEGER(2).UNSIGNED,
            allowNull: false
        }
    }
    const config = {
        tableName: 'user',
        tablestamp:true
    }
    const User = sequelize.define(alias, cols, config)
    User.associate = (models) => {
        User.hasMany(models.Cart, {
            as: 'cart',
            foreignKey: 'user_id'
        })
    }
    return User
}