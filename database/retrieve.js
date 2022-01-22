const Playlist = require('./index.js').Playlist;
const SearchResults =  require('./index.js').SearchResults;


let getPlaylistTracks = (playlistId) => {
  return Playlist.find({ playlistId: playlistId }, 'tracks');
};

let getSearchResults = () => {
  return SearchResults.find().limit(10);
};

let deleteSearchResults = () => {
  return SearchResults.deleteMany({});
};


module.exports = {
  getPlaylistTracks,
  getSearchResults,
  deleteSearchResults
};
