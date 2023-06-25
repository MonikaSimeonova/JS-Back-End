const router = require('express').Router();

const homeController = require('./src/controllers/homeController');
const recipiesController = require('./src/controllers/recipiesController');


router.use(homeController);
router.use('/recipies', recipiesController);


router.get('*', (req,res)=>{
    res.render('404');
  
});
module.exports = router;