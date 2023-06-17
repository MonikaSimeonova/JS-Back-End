const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const auctionController = require('./controllers/auctionController');


router.use(homeController);
router.use('/users', userController)
router.use('/auction', auctionController);

router.use('*', (req,res)=>{
    res.redirect('/404')
})
module.exports = router;