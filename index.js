const express = require('express');
const app = express();

const routers = require('./src/router')

const  loggerListen = () => console.log('listening on')


routers(app)

app.listen(3000, loggerListen)
