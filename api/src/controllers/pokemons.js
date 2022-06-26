const { Pokemon, Type } = require('../db.js')
const { v4: uuidv4 } = require('uuid');
const { POKEMON_URL } = require('../utils/constants/constants.js');
const axios = require('axios');
const { Op } = require('sequelize');

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
            attack: element.stats[1].base_stat,
            sprite: element.sprites.other.home.front_default,
            defense: element.stats[2].base_stat,
            speed: element.stats[5].base_stat,
            height: element.height,
            weight: element.weight,
            types: element.types.map(i => { return { name: i.type.name } }),
        })
    })
    return arrFinal;
}

async function getAPIpokemonById(id) {
    const result1 = await axios.get(`${POKEMON_URL}/${id}`)
    const result2 = result1.data
    let obj = {};
    obj.id = result2.id;
    obj.name = result2.name;
    obj.life = result2.stats[0].base_stat;
    obj.attack = result2.stats[1].base_stat;
    obj.sprite = result2.sprites.other.home.front_default;
    obj.defense = result2.stats[2].base_stat;
    obj.speed = result2.stats[5].base_stat;
    obj.height = result2.height;
    obj.weight = result2.weight;
    obj.types = result2.types.map(i => { return { name: i.type.name } });
    return obj;
}

async function getAPIpokemonByName(name) {
    const result1 = await axios.get(`${POKEMON_URL}/${name}`);
    const result2 = result1.data;
    let obj = {};
    obj.id = result2.id;
    obj.name = result2.name;
    obj.life = result2.stats[0].base_stat;
    obj.attack = result2.stats[1].base_stat;
    obj.sprite = result2.sprites.other.home.front_default;
    obj.defense = result2.stats[2].base_stat;
    obj.speed = result2.stats[5].base_stat;
    obj.height = result2.height;
    obj.weight = result2.weight;
    obj.types = result2.types.map(i => { return { name: i.type.name } });

    return obj;
}

async function getPokemons(req, res, next) {
    const name = req.query.name;
    if (!name) {
        const dbPokemons = Pokemon.findAll({
            include: {
                model: Type
            },
        })
        const apiPokemons = getAPIpokemons()
        Promise.all([dbPokemons, apiPokemons])
            .then(results => {
                const [dbPokemonsResults, apiPokemosResults] = results;
                return res.send(results)
            })
            .catch(error => next(error))
    } else {
        try {
            const dbPokemon = await Pokemon.findOne(
                {
                    where: { name: { [Op.iLike]: `%${name}%` } },
                    include: {
                        model: Type
                    }
                }
            )
            if (!dbPokemon) {
                const apiPokemon = getAPIpokemonByName(name)
                    .then(results => res.send(results))
                    .catch(err => next(err))
            } else {
                res.status(200).send(dbPokemon)
            }
        } catch (error) {
            next(error)
        }
    }
}

async function getPokemonById(req, res, next) {
    const id = req.params.id
    try {
        if (isNaN(id)) {
            const dbPokemon = Pokemon.findByPk(id, { include: Type })
                .then(results => res.send(results))
                .catch(error => next(error))
        } else {
            const apiPokemon = getAPIpokemonById(id)
                .then(results => res.send(results))
                .catch(error => next(error))
        }
    } catch (error) {
        next(error)
    }

}

async function postPokemon(req, res, next) {
    const { name, life, attack, sprite, defense, speed, height, weight, types } = req.body;
    if (name) {
        try {
            const [pokemonCreated, created] = await Pokemon.findOrCreate({
                where: { name },
                defaults: { id: uuidv4(), life, attack, sprite, defense, speed, height, weight }
            })
            let dbTypesArray = [];
            if (types) {
                dbTypesArray = await Type.findAll({
                    where: {
                        name: { [Op.or]: types }
                    }
                })
            }
            dbTypesArray.forEach(async ({ dataValues }) => await pokemonCreated.addType(dataValues.id))
            if (created) {
                res.status(201).send('Your pokemon was posted succesfully!')
            } else {
                res.send(`The pokemon ${name} was already posted!`)
            }

        } catch (error) {
            next(error)
        }
    } else {
        res.status(409).send('The name field is required.')
    }
}


module.exports = {
    getPokemons,
    getPokemonById,
    postPokemon
}