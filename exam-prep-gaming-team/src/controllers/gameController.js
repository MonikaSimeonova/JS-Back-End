const router = require('express').Router();
const gameManager = require('../managers/gameManager');
const { getErrorMessage } = require('../utils/errorHelpers')

//create
router.get('/create', (req, res) => {
    res.render('create')
});

router.post('/create', async (req, res) => {

    const { platform, name, image, price, description, genre } = req.body;
    
    await gameManager.create({ platform, name, image, price, description, genre, owner: req.user._id })
    res.redirect('/games/all')

});
//catalog
router.get('/all', async(req, res) => {
    const games = await gameManager.getAll().lean()
    res.render('catalog', {games})
});
//details
router.get('/:id/details', async(req, res) => {
    const game = await gameManager.getOne(req.params.id).lean();
    const isOwner = req.user?._id == game.owner._id;
    
    const isBought = game.boughtBy.toString().includes(req.user?._id)
    res.render('details', {game, isOwner, isBought})
});
router.get('/:id/delete', async(req, res) => {
    await gameManager.delete(req.params.id)
    res.redirect('/games/all')
});
router.get('/:id/edit', async(req, res) => {
    const game = await gameManager.getOne(req.params.id).lean()
    res.render('edit', {game})
});
router.post('/:id/edit', async(req, res) => {
    const gameData = req.body;
    console.log(gameData);
    await gameManager.update(req.params.id, gameData)
    res.redirect(`/games/${req.params.id}/details`)
});
//buy
router.get('/:id/buy', async(req, res) => {
    const gameId = req.params.id;
    await gameManager.buyGame(gameId, req.user._id)
    res.redirect(`/games/${req.params.id}/details`);
});


module.exports = router;