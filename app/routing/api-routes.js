var path = require('path');
var friends = require('../data/friends.js');
var parser = require('body-parser');

module.exports = function(app){
    
    //parser for JSON
    app.use(parser.json());
    app.use(parser.urlencoded({extended: true}));
    app.use(parser.text());
    
    //Routing for API
    app.post("/api/friends", function(req, res){
      var answers = req.body;
      console.log(answers);
      friends.push(answers);
      
      for(var i = 0; i < friends.length; i++){
        res.json(friends.score);
    }
})


app.get("/api/friends", function(req, res){
  res.json(friends)
});

};