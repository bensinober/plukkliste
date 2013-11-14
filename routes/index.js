
/*
 * GET home page.
 */

module.exports.index = function(req, res){
  var books = [
    { title: "title1", isbn: "1234567" },
    { title: "title2", isbn: "135611" },
    { title: "title3", isbn: "34731717" },
    { title: "title4", isbn: "236146" },
    { title: "title5", isbn: "2461426" },
  ]
  res.render('index', { layout: true, title: 'Plukkliste', books: books });
};
