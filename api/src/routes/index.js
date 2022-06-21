const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const pokemonsRoutes = require('./pokemons.js')
const typesRoutes = require('./types.js')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemonsRoutes)
router.use('/types', typesRoutes)


module.exports = router;
