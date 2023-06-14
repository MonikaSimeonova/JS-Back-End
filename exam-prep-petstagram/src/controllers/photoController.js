const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const { getErrorMessage } = require('../utils/errorHelpers');

const {isAuth} = require('../middlewares/authMiddleware')

//catalog
router.get('/', async (req, res) => {
    const photos = await photoManager.getAll().lean();
    res.render('photos', { photos });
});

router.get('/create', (req, res) => {
    res.render('photos/create');
});

//create
router.post('/create',isAuth, async (req, res) => {
    const photoData = {
        ...req.body,
        owner: req.user._id
    }
    try {
        await photoManager.create(photoData);
        res.redirect('/photos');
    } catch (err) {
        res.render('photos/create', { error: getErrorMessage(err) })
    }
});
//details
router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photoManager.getOne(photoId).populate('comments.user').lean();

    const isOwner = req.user?._id == photo.owner._id;

    res.render('photos/details', { photo, isOwner })
});
//delete
router.get('/:photoId/delete',isAuth, async (req, res) => {
    try {
        await photoManager.delete(req.params.photoId);
        res.redirect('/photos')
    } catch (error) {
        res.render('photos/details', { error: 'Unsuccessfull photo deletion' });
    }
});

//edit
router.get('/:photoId/edit', async (req, res) => {

    const photo = await photoManager.getOne(req.params.photoId).lean()
    res.render('photos/edit', { photo })

});
router.post('/:photoId/edit',isAuth, async (req, res) => {
    const photoData = req.body;
    try {
        await photoManager.edit(req.params.photoId, photoData);
        res.redirect(`/photos/${req.params.photoId}/details`)
    } catch (err) {
        res.render('photos/edit', { error: 'Unable to update photo', ...photoData });
    }

});
//comments
router.post('/:photoId/comments', async (req, res) => {
    const photoId = req.params.photoId;
    const { message } = req.body;
    const user = req.user._id;
    await photoManager.addComment(photoId, { user, message })

    res.redirect(`/photos/${photoId}/details`)
})



module.exports = router;