const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const animalController = require('./controllers/animalContoller');


router.use(homeController);
router.use('/users', userController)
router.use('/animals', animalController);

router.use('*', (req,res)=>{
    res.redirect('/404')
})
module.exports = router;