var express = require('express');

// var app = express();

var countryRouter = express.Router();

var countryQuery = require('../db/countryQuery.js')
var query = new countryQuery();

countryRouter.get('/', function(req,res){
  query.all(function(countries){
    res.json(countries);

  })
})

countryRouter.post('/', function(req,res){
  var country = req.body.country
  console.log("we are in the post request")
  query.add({"name": country},function(results){
    res.json(results);
  })


});


module.exports = countryRouter
