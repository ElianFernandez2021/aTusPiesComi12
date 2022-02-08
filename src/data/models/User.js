module.exports = (sequelize,dataType) => {
    let alias='User'
    let cols={
        id:{
            type: dataType.INTEGER.UNSIGNED,
            allowNull:false,
            autoIncrement:true,
        },
        first_name:{
            type: dataType.STRING,
            allowNull:false
        },
        last_name:{
            type: dataType.STRING,
            allowNull:false
        },
        email:{
            type: dataType.STRING,
            allowNull:false
        },
        avatar:{
            type: dataType.STRING,
            allowNull:false
        },
        rol:{
            type: dataType.TINYINT,
            allowNull:false
        },
        password:{
            type: dataType.STRING,
            allowNull:false
        },
        createdAt:{
            type: dataType.DATE,
        },
        updatedAt:{
            type: dataType.DATE,
        }
    }
    let config= {
        tablename:'user',
    }
    const User= sequelize.define(alias,cols,config)
    User.associate = models => {
        User.belongsTo(models.Cart,{
            as:'cart',
            foreignKey:'user_id'
        })
    }
    return User
}