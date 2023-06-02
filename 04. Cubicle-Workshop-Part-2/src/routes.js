const router = require('express').Router();
const homeController = require('./controllers/homeContoller');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accsessoryController')

//modular controllers
router.use(homeController);
router.use('/cubes', cubeController);
router.use('/accessories', accessoryController);

//page not found redirect
router.get('*', (req, res)=>{
    res.redirect('/404')
})
module.exports = router;