require('dotenv').config();
const express = require('express');
const workoutapp = express();
const user = require('./controllers/usercontroller');
const log = require('./controllers/logcontroller');

const sequelize = require('./db');

sequelize.sync();

workoutapp.use(express.json());
workoutapp.use(require('./middleware/headers'));
workoutapp.use('/log', log);
workoutapp.use('/user', user);







workoutapp.listen(4500, function(){
    console.log('Hey man!!!');
});

