const express = require('express');
const trackSearch = require('../helpers/trackSearch').trackSearch;
const createPlaylist = require('../helpers/createPlaylist').createPlaylist;
const addTracksToPlaylist = require('../helpers/addTracksToPlaylist').addTracksToPlaylist;
const insert = require('../database/insert');
const retrieve = require('../database/retrieve');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// how to handle cors requests


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

app.post('/create', (req, res) => {
  var playlistCreateQueryObj = {
    name: req.body.name,
    description: req.body.description
  };
  var trackIds = req.body.tracks;
  var playlistId = '';
  createPlaylist(playlistCreateQueryObj)
    .then((data) => {
      if (data.error) {
        console.log(`the search returned this error at createPlaylist: ${JSON.stringify(data)}`);
        res.status(data.error.status).json(data.error).end();
      } else {
        // console.log(`the search returned: ${JSON.stringify(data)}`);
        playlistId = data;
        return playlistId;
      }
    })
    .then((spotifyId) => {
      return addTracksToPlaylist(spotifyId, trackIds);
    })
    .then((data) => {
      if (data.error) {
        console.log(`the search returned this error at addTracksToPlaylist: ${JSON.stringify(data)}`);
        res.status(data.error.status).json(data.error).end();
      } else {
        // console.log(`the search returned: ${JSON.stringify(data)}`);
        if (playlistId) {
          res.status(201)
            .json({embedLink: `https://open.spotify.com/embed/playlist/${playlistId}`})
            .end();
        }
      }
    })
    .catch(() => {
      res.status(404).send('error. troubleshoot.').end();
    });
});


let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

