module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    User.associate = function(models){
        models.user.hasOne(models.board);
    };

    return User;
};