
/*
 * GET home page.
 */
//var request = require("request");
var http = require("http");
var config = require('../config/settings.json');

module.exports.index = function(req, res){

  var options = {
    host: 'localhost',
    port: 8080,
    path: "/cgi-bin/koha/rest.pl/holds/all",
  };

  var holdsrequest = http.get(options, function(holdsresponse) {
    holdsresponse.setEncoding('utf-8');
    var responseString = '';

    holdsresponse.on('data', function(data) {
      responseString += data;
    });

    holdsresponse.on('end', function() {
      var json = JSON.parse(responseString);
      res.render('index', { layout: true, title: 'Plukkliste', books: json });
    });
  });

  holdsrequest.on('error', function(e) {
    console.log("error: "+e)
  });
    
}

module.exports.foundBook = function(req, res){
  console.log(req.params);
  
  var options = {
    host: 'localhost',
    port: 8080,
    path: "/cgi-bin/koha/rest.pl/holds/"+req.params.biblionumber+"/"+req.params.itemnumber+"/"+req.params.borrowernumber+"/found_book",
    method: 'PUT'
  };
  
  var bookrequest = http.request(options, function(bookresponse) {  
    bookresponse.setEncoding('utf-8');

    var responseString = '';

    bookresponse.on('data', function(data) {
      responseString += data;
    });

    bookresponse.on('end', function() {
      var resultObject = JSON.parse(responseString);
      console.log("response: "+resultObject);
      res.json(resultObject);
    });
  });

  bookrequest.on('error', function(e) {
    console.log("error: "+e)
  });

  //request.write(userString);
  bookrequest.end();
/*
  var url = config.opac+"/cgi-bin/koha/rest.pl/holds/"+req.params.biblionumber+"/"+req.params.itemnumber+"/"+req.params.borrowernumber+"/found_book";
  console.log(url);
  var bookrequest = request.put(url, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      var json = JSON.parse(body);
      console.log("response: "+json);
      res.json(json);
    } else if (!err) {
      console.log("error: " +err);
    } else {
      console.log("body: " +body);
    }
  });*/
  

}