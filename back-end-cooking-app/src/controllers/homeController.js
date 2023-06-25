const router = require('express').Router();
const recipiesManager = require('../managers/recipiesManager');

router.get('/', async (req, res) => {

    const recipies = await recipiesManager.getAll();
    res.render('home', { recipies });
});

router.get('/about', (req, res) => {
    res.render('about')
});



module.exports = router;