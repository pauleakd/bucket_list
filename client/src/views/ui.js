var Countries = require('../models/countries.js')

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
