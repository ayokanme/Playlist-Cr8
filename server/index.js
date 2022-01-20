const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// how to handle cors requests


app.route('/tracks')
  .get((req, res, next) => {
    res.send(`${req.method} request called on ${req.path}`).end();
  })
  .post((req, res, next) => {
    res.send(`${req.method} request called on ${req.path}`).end();
  });

app.route('/search')
  .get((req, res, next) => {
    res.send(`${req.method} request called on ${req.path}`).end();
  })
  .post((req, res, next) => {
    res.send(`${req.method} request called on ${req.path}`).end();
  });

app.route('/create')
  .get((req, res, next) => {
    res.send(`${req.method} request called on ${req.path}`).end();
  })
  .post((req, res, next) => {
    res.send(`${req.method} request called on ${req.path}`).end();
});

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

