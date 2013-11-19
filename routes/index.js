
/*
 * GET home page.
 */
var request = require("request");

module.exports.index = function(req, res){


  var holdsrequest = request.get("http://localhost:8080/cgi-bin/koha/rest.pl/holds/all", function(err, response, body) {
    console.log(req.params)
    if (!err && response.statusCode == 200) {
      var json = JSON.parse(body);
      res.render('index', { layout: true, title: 'Plukkliste', books: json });
    } else if (!err) {
      console.log(err);
    } else {
      console.log(body);
    }
  });
    
}

module.exports.foundBook = function(req, res){
  console.log(req.params)
  // var options = {
  //   host: 'localhost',
  //   port: 8080,
  //   path: "http://localhost:8080/cgi-bin/koha/rest.pl/holds/"+req.params.biblionumber+"/"+req.params.borrowernumber+"/found_book",
  //   method: 'PUT'
  // };

  var bookrequest = request.put("http://localhost:8080/cgi-bin/koha/rest.pl/holds/"+
      req.params.biblionumber+"/"+
      req.params.itemnumber+"/"+
      req.params.borrowernumber+
      "/found_book", function(err, response, body) {
    if (!err && response.statusCode == 200) {
      var json = JSON.parse(body);
      res.json(json);
    } else if (!err) {
      console.log(err);
    } else {
      console.log(body);
    }

  });
  

}