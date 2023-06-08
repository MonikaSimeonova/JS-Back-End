const handlebars = require('express-handlebars');


function handlebarsConfig(app) {
    //Handlebars config
    app.engine('hbs', handlebars.engine({
        extname: 'hbs',
    }));
    app.set('view engine', 'hbs');
    app.set('views', 'src/views');// set the views folder directory
}

module.exports = handlebarsConfig;