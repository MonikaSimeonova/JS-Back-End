const router = require('express').Router();
const bookManager = require('../managers/bookManager');
const { getErrorMessage } = require('../utils/errorHelpers');
router.get('/create', (req, res) => {
    res.render('create')
});
router.post('/create', async (req, res) => {
    const {title, author, genre, stars, image, review} = req.body;
    
    try {
        await bookManager.create({title, author, genre, stars, image, review, owner: req.user._id});
        res.redirect('/books/catalog')
    } catch (err) {
        res.render('create', { error: getErrorMessage(err) })
    }
});

module.exports = router;