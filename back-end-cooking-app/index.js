const express = require("express");
const expressConfig = require('./src/config/expressConfig');
const handlebarsConfig = require('./src/config/hadlebarsConfig');
const dbConnect = require('./src/config/dbConfig');


const router = require('./routes');

const app = express();
const port = 5000;
expressConfig(app);
handlebarsConfig(app);


dbConnect()
.then(()=> console.log('DB connected successfully'))
.catch((err)=> err.message);

app.use(router)


app.listen(port, ()=>console.log(`Server is running on port ${port}...`));

