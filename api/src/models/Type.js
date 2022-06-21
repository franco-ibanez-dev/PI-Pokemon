const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('type', {
        id: {

        },
        name: {

        },
        defense: {

        },
        speed: {

        },
        height: {

        },
        weight: {

        }
    }, {
        timestamps: false,
    })


}