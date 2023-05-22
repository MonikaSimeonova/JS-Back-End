const router = require('express').Router();
const homeController = require('./controllers/homeContoller');
const cubeController = require('./controllers/cubeController')

//modular controllers
router.use(homeController);
router.use('/cubes', cubeController);

//page not found redirect
router.get('*', (req, res)=>{
    res.redirect('/404')
})
module.exports = router;