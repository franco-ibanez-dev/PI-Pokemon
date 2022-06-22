const { Pokemon, Type } = require('../db.js')
const { v4: uuidv4 } = require('uuid');
const { POKEMON_URL } = require('../utils/constants/constants.js');
const axios = require('axios');
const { default: Op } = require('sequelize/types/operators.js');

async function getAPIpokemons() {
    const results1 = await axios.get(POKEMON_URL)
    const results2 = await axios.get(results1.data.next)
    const arr1 = results1.data.results;
    const arr2 = results2.data.results;
    const arr3 = arr1.concat(arr2)
    let arr5 = []
    const arr4 = await Promise.all(arr3.map(async (element) => {
        const results = await axios.get(element.url)
        arr5.push(results.data)
    }))
    let arrFinal = [];
    arr5.forEach((element) => {
        arrFinal.push({
            id: element.id,
            name: element.name,
            life: element.stats[0].base_stat,
            sprite: element.sprites.other.home.front_default,
            defense: element.stats[2].base_stat,
            speed: element.stats[5].base_stat,
            height: element.height,
            weight: element.weight,
            type: element.types.map(i => i.type.name),
            dbOriginated: false,
        })
    })
    return arrFinal;
}

function getPokemons(req, res, next) {
    const name = req.query.name;
    if (!name) {
        const dbPokemons = Pokemon.findAll({
            include: Type,
        })
        const apiPokemons = getAPIpokemons()
        Promise.all([dbPokemons, apiPokemons])
            .then(results => {
                const [dbPokemonsResults, apiPokemosResults] = results;
                return res.send(results)
            })
            .catch(error => next(error))
    } else {
        return Pokemon.findOne({
            where: { name },
            include: Type
        },
        ).then(results => res.send(results))
            .catch(error => next(error))
    }
}

function getPokemonById(req, res, next) {
    const id = req.params.id
    if (id) {
        const pokemon = Pokemon.findByPk(id, { include: Type })
            .then(results => res.send(results))
            .catch(error => next(error))
    }
}


function postPokemon(req, res, next) {
    const { name, life, sprite, defense, speed, height, weight, dbOriginated } = req.body;
    if (name) {
        try {
            const [pokemonCreated, created] = await Pokemon.findOrCreate({
                where: { name },
                defaults: { life, sprite, defense, speed, height, weight, dbOriginated }
            })

        if(types)

        } catch (error) {
            next(error)
        }
    }

}


module.exports = {
    getPokemons,
    getPokemonById,
    postPokemon
}