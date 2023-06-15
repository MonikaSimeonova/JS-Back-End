const router = require('express').Router();
const bookManager = require('../managers/bookManager');
const { getErrorMessage } = require('../utils/errorHelpers');

//create
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
//catalog
router.get('/catalog', async(req, res) => {
    const books = await bookManager.getAll().lean();
    res.render('catalog', {books})
});
//details
router.get('/:bookId/details', async(req, res) => {
    const book = await bookManager.findOne(req.params.bookId);
    console.log(book);
    const isOwner = req.user?._id == book.owner._id;
    console.log(isOwner);
    res.render('details', {book, isOwner})
});
//delete
router.get('/:bookId/delete', async(req, res) => {
    await bookManager.delete(req.params.bookId);
    res.redirect('/books/catalog')
});
//edit
router.get('/:bookId/edit', async(req, res) => {
    const book = await bookManager.findOne(req.params.bookId);
    res.render('edit', {book})
});


module.exports = router;