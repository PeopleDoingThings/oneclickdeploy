process.env.NODE_ENV = 'test'
var chai = require('chai')

global.expect = chai.expect

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/oneclickdb');

// Mocha "helpers" to support coroutines tests
var Bluebird = require('bluebird')

global.before_ = function (f) { before ( Bluebird.coroutine(f) ) }
global.beforeEach_ = function (f) { beforeEach ( Bluebird.coroutine(f) ) }
global.it_ = function (description, f) { it ( description, Bluebird.coroutine(f) ) }
global.xit_ = function (description, f) { xit ( description, f ) }
global.it_.only = function (description, f) { it.only( description, Bluebird.coroutine(f) ) }