var RequestHelper = require('../../helpers/requestHelper');
var requestHelper = new RequestHelper();


var Countries = function(){

}

Countries.prototype = {
  all: function(callback){
    requestHelper.makeGetRequest('https://restcountries.eu/rest/v2/all', function(results){
      // console.log(results);
      callback(results)
    })
  },
  add: function(newCountry,callback){
    var countryData = JSON.stringify(newCountry);
    console.log("countries model")
    requestHelper.makePostRequest('http://localhost:3000/api/countries',callback,countryData)

  }
}

module.exports = Countries;
