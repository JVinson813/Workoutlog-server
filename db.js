const Sequelize = require('sequelize');

const sequelize = new Sequelize('workoutlog', 'postgres', 'qwerty', {
    host: 'localhost', 
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to workoutlog postgres database');
    },
    function(err){
        console.log(err);
    }
);

User = sequelize.import('./models/user');
UserInfo = sequelize.import('.models/userinfo');

User.hasOne(UserInfo);
UserInfo.belongsTo(User);

module.exports = sequelize;