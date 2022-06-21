const { Router } = require('express');
const router = Router()
const {
    getAllPokemons,
    getPokemonById,
    postPokemon } = require('../controllers/pokemons.js')


router.get('/', getAllPokemons)
router.get('/:id', getPokemonById)
router.post('/', postPokemon)


module.exports = router;