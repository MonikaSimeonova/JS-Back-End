const {extractErrorMessages} = require('../utils/errorHelpers')

module.exports = (error, req, res, next) =>{
const errorMessages = extractErrorMessages(error);
    res.render('404', {errorMessages})

   
}