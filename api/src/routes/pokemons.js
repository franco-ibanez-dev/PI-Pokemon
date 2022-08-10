const { Router } = require('express');
const router = Router()
const {
    getPokemons,
    getPokemonById,
    postPokemon,
    deletePokemon,
} = require('../controllers/pokemons.js')


router.get('/', getPokemons)
router.get('/:id', getPokemonById)
router.post('/', postPokemon)
router.delete('/:id', deletePokemon)

module.exports = router;