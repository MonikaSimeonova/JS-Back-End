const router = require('express').Router();
const animalManager = require('../managers/animalManager');
const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');
const { isOwnerCheck } = require('../middlewares/authMiddleware');


//create
router.get('/create', isAuth, (req, res) => {
    res.render('create', { title: 'Create Page' })
});
router.post('/create', isAuth, async (req, res) => {
    const { name, years, kind, image, need, location, description } = req.body;

    try {
        await animalManager.create({ name, years, kind, image, need, location, description, owner: req.user._id })
        res.redirect('/animals/catalog');
    } catch (err) {
        res.render('create', { error: getErrorMessage(err) })
    }
});
//catalog
router.get('/catalog', async (req, res) => {
    const animals = await animalManager.getAll().lean();
    res.render('dashboard', { animals, title: 'Dashboard Page' })
});

//details
router.get('/:id/details', async (req, res) => {
    const animalId = req.params.id;
    const animal = await animalManager.getOne(animalId).lean();
    const isDonated = animal.donations.toString().includes(req.user?._id);
    if (animal.owner._id.toString() == req.user?._id) {
        animal.isOwner = true;
    } else {
        animal.isOwner = false;
    }
    res.render('details', { animal, isDonated, title: 'Details Page' })
});

//edit
router.get('/:id/edit', isAuth, isOwnerCheck, async (req, res) => {
    const animalId = req.params.id;
    const animal = await animalManager.getOne(animalId).lean();

    res.render('edit', { animal, title: 'Edit Page' });
});
router.post('/:id/edit', isAuth, isOwnerCheck, async (req, res) => {
    const animalData = req.body;
    const animalId = req.params.id;

    try {
        await animalManager.update(animalId, animalData);
        res.redirect(`/animals/${animalId}/details`);
    } catch (err) {
        res.render('edit', { error: getErrorMessage(err) });
    }

});

//delete
router.get('/:id/delete', isAuth, isOwnerCheck, async (req, res) => {
    const animalId = req.params.id;
    try {
        await animalManager.delete(animalId);
        res.redirect('/animals/catalog');
    } catch (err) {
        res.render('details', { error: 'Unsuccessful photo deletion' });
    }

});
//donate
router.get('/:id/donate', isAuth, async (req, res) => {
    const animalId = req.params.id;
    const userId = req.user._id;
    const animal = await animalManager.getOne(animalId).lean();
    try {
        await animalManager.donate(animalId, userId);
        res.redirect(`/animals/${animalId}/details`);
    } catch (err) {
        res.render('details', { error: getErrorMessage(err), animal, isDonated: true });
    }

});

module.exports = router;