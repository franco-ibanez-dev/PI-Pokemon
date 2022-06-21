const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('type', {
        id: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        }

    }, {
        timestamps: false,
    })

}