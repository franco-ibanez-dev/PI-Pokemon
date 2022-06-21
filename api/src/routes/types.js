const { Router } = require('express');
const router = Router()

router.get('/', (req, res, next) => {
    try {
        res.send("Hey soy la ruta de types!!")
    } catch (err) {
        next(err)
    }
})

module.exports = router;