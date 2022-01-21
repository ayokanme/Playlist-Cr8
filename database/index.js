const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/playlist-cr8')
  .then(() => {
    console.log('Connected to app database');
  })
  .catch((err) => {
    console.log('Unable to connect to database. ERROR: ', err);
  });

let dbSchema = mongoose.Schema({
	name: String,
	description: String,
	playlistId: {
    unique: true,
    type: String
  },
	url: {
    unique: true,
    type: String
  },
	tracks: [
		{
			trackId: String,
			name: String,
			artist: Array,
			trackUrl: String,
			imageUrl: String,
			danceability: Number,
			energy: Number,
			tempo: Number,
			valence: Number
		}
	],
	createdAt: String
});

let Playlist = mongoose.model('Playlist', dbSchema);

module.exports.Playlist = Playlist;
