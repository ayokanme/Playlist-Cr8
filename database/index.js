const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/playlist-cr8')
  .then(() => {
    console.log('Connected to app database');
  })
  .catch((err) => {
    console.log('Unable to connect to database. ERROR: ', err);
  });

let trackSchema = mongoose.Schema({
		trackId: String,
		track: String,
		artists: String,
		album: String,
		year: String,
		imageUrl: String,
		trackUrl: String,
		danceability: Number,
		energy: Number,
		tempo: Number,
		valence: Number
});

let playlistSchema = mongoose.Schema({
	name: String,
	description: String,
	playlistId: {
    unique: true,
    type: String
  },
	playlistUrl: String,
	createdAt: String,
	tracks: [trackSchema]
});

let searchSchema = mongoose.Schema({
	track: String,
	artists: String,
	album: String,
	year: String,
	imageUrl: String,
	trackId: {
    unique: true,
    type: String
  },
	trackUrl: String
});



let Playlist = mongoose.model('Playlist', playlistSchema);
let SearchResults = mongoose.model('SearchResults', searchSchema);

module.exports = { Playlist, SearchResults };
