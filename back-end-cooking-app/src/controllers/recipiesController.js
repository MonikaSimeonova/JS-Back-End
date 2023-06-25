const router = require('express').Router();
const recipiesManager = require('../managers/recipiesManager');


router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await recipiesManager.create({ name, description, imageUrl, difficultyLevel });

    res.redirect('/');
})

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const recipie = await recipiesManager.getById(id).lean();

    res.render('details', { recipie });
})

router.get('/edit/:id', async (req, res) => {
    const recipie = await recipiesManager.getById(req.params.id).lean();

    res.render('edit', { recipie });
});

router.post('/edit/:id', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await recipiesManager.updateRecipie(req.params.id, { name, description, imageUrl, difficultyLevel });

    res.redirect(`/recipies/details/${req.params.id}`);
})

router.get('/delete/:id', async (req, res) => {

    await recipiesManager.deleteRecipie(req.params.id);

    res.redirect('/');
})

module.exports = router;