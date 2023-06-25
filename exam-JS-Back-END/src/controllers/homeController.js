const router = require('express').Router();
const animalManager = require('../managers/animalManager');

router.get('/', async (req, res) => {
    const animals = await animalManager.getAll().lean();
    let lastThree = animals.slice(-3);
    if (!animals.length) {
        lastThree = [];
    }
    res.render('home', { lastThree, title: 'Home page' })
});


router.get('/search', async (req, res) => {
    const location = req.query.location;
    const animals = await animalManager.findByLocation(location);

    res.render('search', { animals, title: 'Search page'});
});



router.get('/404', (req, res) => {
    res.render('404');
});


module.exports = router;