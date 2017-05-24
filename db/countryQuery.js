var MongoClient = require('mongodb').MongoClient;

var CountryQuery = function(){
  this.url = "mongodb://localhost:27017/countries_site"
}

CountryQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection('countries');
        //Why is err used?
        collection.find().toArray(function(err, docs){
          onQueryFinished(docs);
        })
      }
    })
  },
  add: function(country, onQueryFinished){
    MongoClient.connect(this.url, function(err,db) {
      if(db){
        var collection = db.collection('countries');
        collection.insert(country);
        collection.find().toArray(function(err, docs){
          console.log(docs);
          onQueryFinished(docs);
        });
      }
    })
  }

}

module.exports = CountryQuery;
