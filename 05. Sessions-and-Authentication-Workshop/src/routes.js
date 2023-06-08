const router = require('express').Router();
const homeController = require('./controllers/homeContoller');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accsessoryController');
const userController = require('./controllers/userController');

//modular controllers
router.use(homeController);
router.use('/cubes', cubeController);
router.use('/accessories', accessoryController);
router.use('/users', userController);

//page not found redirect
router.get('*', (req, res)=>{
    res.redirect('/404')
})
module.exports = router;