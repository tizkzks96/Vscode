module.exports = (sequelize, DataTypes) => {

    const Board = sequelize.define("board",{
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contents:{
            type : DataTypes.STRING,
            allowNull: false
        },
        viewCount:{
            type : DataTypes.INTEGER,
            allowNull: false
        }
    });
    
    return Board;
};