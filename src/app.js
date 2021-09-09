const path =require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

const indexRoutes = require('./routes/index');

app.use('/', indexRoutes);

app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
});