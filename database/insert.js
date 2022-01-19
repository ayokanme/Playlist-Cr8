const Playlist = require('./index.js').Playlist;

let createPlaylist = (playlist) => {
  var time = new Date now(); // how to add seconds
  time.toString();
  var newPlaylist = {
    name: playlist.name,
    description: playlist.description,
    createdAt: time
  };

  return Playlist.insertOne(newPlaylist);
  // grab _id on server side and save globally
};

let updatePlaylistId = (playlistIdObj) => {
  var spotifyId = playlistIdObj.spotifyPlaylistId;
  var playlistId = {
    playlistId: spotifyId,
    url: `https://api.spotify.com/v1/playlists/${spotifyId}`
  };
  return Playlist.updateOne({ _id: playlistIdObj._id, name: playlistIdObj.name }, playlistId);
};

let addTrack = (trackObj) => {
  var track = {
    trackId: trackObj.id,
    name: trackObj.name,
    artists: [...figure this one out...]
  };
  return Playlist.updateOne(...figure this out too...);
};

let addTrackAnalysis = (trackAnalysisObj) => {
  // needs to iterate through array, use updateMany???
  var trackAnalysis = {
    danceability: trackAnalysisObj.danceability,
    energy: trackAnalysisObj.energy,
    tempo: trackAnalysisObj.tempo,
    valence: trackAnalysisObj.valence
  };
  return Playlist.updateOne(...figure this out too...);
};

module.exports = {
  createPlaylist,
  updatePlaylistId,
  addTrack,
  addTrackAnalysis
};
