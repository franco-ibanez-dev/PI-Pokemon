const { Router } = require('express');
const router = Router()
const {
    getPokemons,
    getPokemonById,
    postPokemon,
} = require('../controllers/pokemons.js')


router.get('/', getPokemons)
router.get('/:id', getPokemonById)
router.post('/', postPokemon)


module.exports = router;