
/*
 * GET home page.
 */
var http = require("http");

module.exports.index = function(req, res){


  var holdsrequest = http.get("http://localhost:8080//cgi-bin/koha/rest.pl/holds/all", function(holdsresponse) {
    var body = '';

    holdsresponse.on('data', function(chunk) {
        body += chunk;
    });

    holdsresponse.on('end', function() {
        var json = JSON.parse(body)
        console.log("Got response: ", json);
        res.render('index', { layout: true, title: 'Plukkliste', books: json });
    });
  });

  holdsrequest.on('error', function(e) {
        console.log("Got error: ", e);
  });
    
};
