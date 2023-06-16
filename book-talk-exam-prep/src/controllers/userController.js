const router = require('express').Router();

const userManager = require('../managers/userManager');
const bookManager = require('../managers/bookManager')
const { getErrorMessage } = require('../utils/errorHelpers')
const {isAuth}= require('../middlewares/authMiddleware');


router.get('/login', (req, res) => {
    res.render('users/login')
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userManager.login(email, password)
        res.cookie('token', token)

        res.redirect('/')
    } catch (err) {
        res.render('users/login', { error: getErrorMessage(err) })
    }

});

router.get('/register', (req, res) => {
    res.render('users/register')
});
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, repeatPassword } = req.body;

        const token = await userManager.register({ username, email, password, repeatPassword });
        res.cookie('token', token)
        res.redirect('/')
    } catch (err) {
        res.render('users/register', { error: getErrorMessage(err) })
    }

});
router.get('/logout',isAuth, (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
});

router.get('/profile',isAuth, async(req,res)=>{
    const books = await bookManager.getWished(req.user._id).lean()
    const user = req.user;
    console.log(user);
    console.log(books);
    res.render('users/profile', {books,user})
})

module.exports = router;