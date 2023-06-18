const jwt = require('../lib/jwt')
const { SECRET } = require('../config/config');


exports.auth = async (req, res, next) => {
    const token = req.cookies['token'];

    if (token) {
        try {
            const decoredToken = await jwt.verify(token, SECRET);
            req.user = decoredToken;
            res.locals.user = decoredToken;
            res.locals.isAuthenticated = true;
            next();
        } catch (err) {
            res.clearCookie('token');
            res.redirect('/users/login');
        }
    } else {
        next();
    }
};

exports.isAuth = (req,res, next)=>{
    if(!req.user){
        res.redirect('/users/login')
    }
    next();
}