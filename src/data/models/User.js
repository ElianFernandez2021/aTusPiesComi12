module.exports = (sequelize,dataTypes) => {
    let alias= "user"
    let cols={
        id:{
            type:dataTypes.INTEGER(100).UNSIGNED,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        first_name:{
            type:dataTypes.STRING(50),
            allowNull:false
        },
        last_name:{
            type:dataTypes.STRING(50),
            allowNull:false
        },
        email:{
            type:dataTypes.STRING(50),
            allowNull:false,
            unique:true
        },
        password: {
            type:dataTypes.STRING(100),
            allowNull:false
        },
        avatar: {
            type:dataTypes.STRING(100)
        },
        rol:{
            type:dataTypes.INTEGER(2),
            allowNull:false
        }
    }
    let config= {
        tableName:"user",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at"
    }

    let user = sequelize.define(alias,cols,config)

    user.associate= models =>{
        user.hasOne(models.cart,{
            as:"cart",
            foreignKey:"user_id"
        })
    }
    return user
}