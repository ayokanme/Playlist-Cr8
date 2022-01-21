const express = require('express');
const trackSearch = require('../helpers/trackSearch').trackSearch;
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// how to handle cors requests


// app.route('/tracks')
//   .get((req, res, next) => {
//     res.send(`${req.method} request called on ${req.path}`).end();
//   })
//   .post((req, res, next) => {
//     res.send(`${req.method} request called on ${req.path}`).end();
//   });


app.post('/search', (req, res) => {
  var searchString = req.body.query;
  trackSearch(searchString)
    .then((data) => {
      console.log('we have received: ', data);
      res.status(201)
        .json(data)
        .end();
    })
    .catch((err) => {
      res.status(404).send(`the search returned this error: ${err}`).end();
    });
});

// app.route('/create')
//   .get((req, res, next) => {
//     res.send(`${req.method} request called on ${req.path}`).end();
//   })
//   .post((req, res, next) => {
//     res.send(`${req.method} request called on ${req.path}`).end();
// });

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

