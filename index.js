const express = require("express");
const morgan = require("morgan");
const path = require('path');
const app = express();
const control = require("./router");
require('dotenv').config();

//Middlewares
app.use(morgan("dev")); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

//Especificamos el motor de plantillas
app.set('view engine', 'pug');

app.get("/", (req,res) => {
  res.send('<h1>Bienvenido</h1>');
});

app.use(require('./router'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}!`);
});
