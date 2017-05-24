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
