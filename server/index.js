const express = require('express');
const trackSearch = require('../helpers/trackSearch').trackSearch;
const insert = require('../database/insert');
const retrieve = require('../database/retrieve');
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
  var searchResults = [];
  trackSearch(searchString)
    .then((data) => {
      if (data.error) {
        console.log(`the search returned this error: ${JSON.stringify(data)}`);
        res.status(data.error.status).json(data.error).end();
      } else {
        // console.log(`the search returned: ${JSON.stringify(data)}`);
        searchResults = data;
        return retrieve.deleteSearchResults();
      }
    })
    .then(() => {
      return insert.addSearchResults(searchResults);
    })
    .then((data) => {
      // console.log(`the insertion operation returned ${data}`);
      res.status(201).json(data).end();
    })
    .catch(() => {
      res.status(404).send('error. troubleshoot.').end();
    });
});

app.get('/search', (req, res) => {
  retrieve.getSearchResults()
    .then((data) => {
      res.status(200).json(data).end();
    })
    .catch(() => {
      res.status(404).send('Nothing found in database. Please try again').end();
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

