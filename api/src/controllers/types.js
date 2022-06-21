const axios = require('axios');
const { Type } = require('../db.js');
const { v4: uuidv4 } = require('uuid');


async function preChargeTypes(req, res, next) {
    try {
        const response = await axios('https://pokeapi.co/api/v2/type');
        const responseArray = response.data.results;
        const typesArray = [];
        responseArray.forEach((elm) => typesArray.push(elm.name))
        typesArray.forEach(async (elm) => {
            await Type.findOrCreate({
                where: {
                    id: uuidv4(),
                    name: elm,
                }
            })
        })

    } catch (err) {
        next(err)
    }
}



module.exports = {
    preChargeTypes,
}

