const { response } = require('express');
const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const LogModel = sequelize.import('../models/log');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let validateSession = require('../middleware/validate-session');

router.post('/', validateSession, function (request, response){
    console.log(request.body);
    let Description = request.body.log.description;
    let Definition = request.body.log.definition;
    let Result = request.body.log.result;
    let Owner = request.user.id;

    LogModel
    .create({
        description: Description,
        definition: Definition,
        result: Result,
        owner_id: Owner
    })
    .then(
        function createSuccess(log){
            response.json({
                log: log
            });
        },
        function createError(err) {
            response.send(500, err.message);
        }
    );
});

router.get('/getall', validateSession, function(request, response){
    let userid = request.user.id;

    LogModel.findAll({
        where: {owner_id: userid}
    })
    .then(
        function findAllSuccess(data) {
            response.json(data);
        },
        function findAllError(err){
            response.send(500, err.message);
        }
    );
});

router.get('/:id', validateSession, function(request, response){
    let data = request.params.id;
    let userid = request.user.id;

    LogModel
    .findOne({
        where: { id: data }
    }).then(
        function findOneSuccess(data){
            response.json(data);
        },
        function findOneError(err) {
            response.send(500, err.message);
        }
    );

});

router.put('/:id', function(request, response){
    let data = request.params.id;
    let Description = request.body.log.description;
    let Definition = request.body.log.definition;
    let Result = request.body.log.result;

    LogModel
    .update({
        description: Description,
        definition: Definition,
        result: Result

    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedLog) {
            response.json({
                description: Description
            });
        },
        function updateError(err){
            response.send(500, err.message);
        }
    )
});

router.delete('/:id', function(req, res){
    let data = req.params.id;
    

    LogModel
    .destroy({
        where: { id: data}
    }).then(
        function deleteLogSuccess(data){
            res.send("you removed a log");
        },
        function deleteLogError(err){
            res.send(500, err.message);
        }
    );
});



module.exports = router;