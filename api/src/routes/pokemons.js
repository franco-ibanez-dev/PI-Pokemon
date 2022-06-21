const { Router } = require('express');
const router = Router()

router.get('/', (req, res, next) => {
    try {
        res.send("Hola soy la ruta de pokemons")
    } catch (err) {
        next(err)
    }
})

module.exports = router;