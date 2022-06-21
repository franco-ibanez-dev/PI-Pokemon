const { Pokemon } = require('../db.js')
const { v4: uuidv4 } = require('uuid')


function getAllPokemons(req, res, next) {
    return Pokemon.findAll()
        .then(results => res.send(results))
        .catch(err => next(err))
}

function getPokemonById(req, res, next) {
    const id = req.params.id;
    return Pokemon.findByPk(id)
        .then(results => res.send(results))
        .catch(err => next(err))
}

function postPokemon(req, res, next) {
    const pokemon = req.body;
    Pokemon.create({
        ...pokemon,
        id: uuidv4()
    })
        .then(character => res.send(character))
        .catch(err => next(err))
}


module.exports = {
    getAllPokemons,
    getPokemonById,
    postPokemon
}