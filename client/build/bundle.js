/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Countries = __webpack_require__(2)

var UI = function(){
  var countries = new Countries();
  countries.all(function(countries){
    this.createDropDown(countries);
  }.bind(this));
}
UI.prototype = {
  render:function(countries){
    console.log( countries)
    var container = document.getElementById('countries');
    container.innerHTML = "";

    for (var country of countries){
      console.log(country)
      var li = document.createElement('li');
      li.innerText = country.name;
      container.appendChild(li)
    }

  },
  createDropDown: function(countries){
    var div = document.createElement('div');
    var form = document.createElement('form')
    var select = document.createElement('select');
    select.name = "country"
    var body = document.querySelector('body');

    var button = document.createElement('button')
    button.type = "submit";
    button.innerText = 'I visited this country'
    form.appendChild(button);


    for (var country of countries){
      // console.log(country)
      var option= document.createElement('option');
    option.value = country.name;
    option.innerText = country.name;
      select.appendChild(option)
    }
    form.appendChild(select);


    form.onsubmit = function(e){
      console.log(e.target)
      e.preventDefault();
      var newCountry = {country: e.target.country.value}
      var countries = new Countries();
      countries.add(newCountry, function(data){
        console.log(data);
      })
    }



  div.appendChild(form);
  body.insertBefore(div, body.firstChild);

  }


}
module.exports = UI


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(0);
var app = function(){
  new UI();
}
window.addEventListener('load',app);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var RequestHelper = __webpack_require__(3);
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var RequestHelper = function(){

}

RequestHelper.prototype = {
  makeGetRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", function(){
      if(request.status =! 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject)
    })
    request.send();
  },
makePostRequest: function(url,callback,payload){
  var request = new XMLHttpRequest();
  console.log("make request")
  request.open('POST',url);
  request.setRequestHeader('Content-Type','application/json');
  request.addEventListener('load',function(){
    if(request.status !== 200 ) return;
    var jsonString = request.responseText;
    console.log("request complete")
    var resultsObject = JSON.parse(jsonString);
    callback(resultsObject);
  })
  request.send(payload);
}




}

module.exports = RequestHelper;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map