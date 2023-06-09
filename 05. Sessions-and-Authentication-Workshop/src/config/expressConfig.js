const express = require('express');
const cookieParser = require('cookie-parser');

const path = require('path');

function expressConfig(app) {
    //css middleware
    //with path 
    app.use(express.static(path.resolve(__dirname, '../public')));
    //with src/public path name
    //app.use(express.static('src/public'));
    app.use(express.urlencoded({extended: false}))
    app.use(cookieParser());
}
module.exports = expressConfig;