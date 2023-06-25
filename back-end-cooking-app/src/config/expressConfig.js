const express = require("express");
const app = express();

function expressConfig(app){
    app.use(express.static('src/static'));
    app.use(express.urlencoded({extended: false}));
}

module.exports = expressConfig;