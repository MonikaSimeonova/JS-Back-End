const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();
const port = 5000;

//css middleware
//with path 
//app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static('src/public'));

//Handlebars

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');// set the views folder directory


//Routers
app.get('/', (req, res)=>{
    res.render('index')
})

app.listen(port, ()=> console.log(`Server is running on port ${port}`));