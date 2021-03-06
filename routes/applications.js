'use strict';

var express = require('express');
var router = express.Router();
var HTTPStatus = require('http-status');

var mongoose = require('mongoose');
var dbschema = require('../models/dbschema.js');

var async = require('async')

var Application = dbschema.Application;
var Build = dbschema.Build;

/* Gets all applications. */
router.route('/')
    .get(function (req, res, next) {
        async.waterfall([
            function (callback) {
                Application.find(callback);
            }
        ], function (err, applications) {
            if (err) next(err);
            res.json(applications);
        });
    })

/* Creates a new application */
    .post(function (req, res, next) {
        async.waterfall([
            function (callback) {
                Application.findOne({ 'name': req.body.name }, 'name', callback);
            }
        ], function (err, application) {
            if (err) return next(err);
            if (application) {
                res.status(HTTPStatus.NOT_MODIFIED).end();
                return;
            }
            var newApplication = new Application(req.body);
            newApplication.save(function (err) { if (err) return next(err); });
            res.status(HTTPStatus.CREATED).json(newApplication);
        });
    });

router.route('/name/:name')
/* Gets application by name*/
    .get(function (req, res, next) {
        async.waterfall([
            function (callback) {
                Application.findOne({ 'name': req.params.name }, callback);
            }
        ], function (err, application) {
            if (err) return next(err);
            if (application) {
                res.json(application);
            } else {
                res.status(HTTPStatus.NOT_FOUND).json({ "reason": "Applicaion name not found" });
            }
        });
    })
/* Delete application by name*/
    .delete(function (req, res, next) {
        async.waterfall([
            function (callback) {
                console.log("current request id is" + req.params.name);
                 Application.findOne({ 'name': req.params.name }, callback);
            }
        ], function (err, application) {
            if (err) return next(err);
            console.log("current application in route delete is" + application)
            application.remove();
            res.json(application);
        });
    });
/* Gets the application by id*/
router.route('/id/:id')
    .get(function (req, res, next) {
        async.waterfall([
            function (callback) {
                Application.findById(req.params.id, callback);
            }
        ], function (err, application) {
            if (err) return next(err);
            if (application) { res.json(application); }
            res.status(HTTPStatus.NOT_FOUND).end();
        });
    })
/* Updates the application by id */
// Todo: check duplicate before update the application name?
    .put(function (req, res, next) {
        async.waterfall([
            function (callback) {
                var newApplication = new Application(req.body)
                Application.findByIdAndUpdate(req.params.id, newApplication, callback);
            }
        ], function (err, application) {
            if (err) return next(err);
            res.json(application);
        });
    })
/* Deletes the application by id */
// Todo: delete all buils and deployments for the application
    .delete(function (req, res, next) {
        async.waterfall([
            function (callback) {
                console.log("current request id is" + req.params.id);
                Application.findById(req.params.id, callback);
            }
        ], function (err, application) {
            if (err) return next(err);
            console.log("current application in route delete is" + application)
            application.remove();
            res.json(application);
        });
    });

module.exports = router;
