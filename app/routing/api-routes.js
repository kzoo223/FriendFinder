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
      
      //variable for submitted score
      var submitScore = answers.score
      var totalSubmitScore = 0
      
      for (var i = 0; i< submitScore.length; i++){
        totalSubmitScore += parseInt(submitScore[i]) 
      }

      //compare difference between submit & matches
      var lowestMatchScore = 50;
      var matchName

      for (var i = 0; i<friends.length-1; i++){

        var matchScoreArray = friends[i].score
        var matchScore = 0

        for (var k = 0; k<matchScoreArray.length; k++){
          matchScore += parseInt(friends[i].score[k])

        }
        var matchDiff = parseInt(totalSubmitScore - matchScore);
        matchDiff = Math.abs(matchDiff)

        if(matchDiff < lowestMatchScore){
          lowestMatchScore = matchDiff
          matchName = friends[i].name
        }
      }
      console.log("Your Match is: "+ matchName)
      res.send("Your Match is: "+ matchName)
    })



app.get("/api/friends", function(req, res){
  res.json(friends)
});

}