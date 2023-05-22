const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const routes = require('./routes');

const app = express();
const port = 5000;

expressConfig(app);
handlebarsConfig(app);
app.use(routes)

app.listen(port, ()=> console.log(`Server is running on port ${port}...`));