const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {auth} = require('./middlewares/authMiddleware')

const routes = require('./router');

const app = express();

// TO DO change db name
mongoose.connect(`mongodb://localhost:27017/petstagram`)
    .then(()=> console.log('DB connected sucessfully'))
    .catch(err => console.log('DB error', err.message))

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');



app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(auth);


app.use(routes);




app.listen(3000, console.log('Server is listening on port 3000...'));