import { Playlist, SearchResults } from "./index.js";
import { response as res } from "express";


export function createPlaylist(playlist) {
  var time = Date();

  var newPlaylist = {
    name: playlist.name,
    description: playlist.description,
    createdAt: time
  };

  return Playlist.insertOne(newPlaylist);
}

export function updatePlaylistId(playlistDetails, spotifyId) {
  var updateObj = {
    playlistId: spotifyId,
    playlistUrl: `https://open.spotify.com/embed/playlist/${spotifyId}`
  };
  return Playlist.updateOne({ _id: playlistDetails.playlistId, name: playlistDetails.name }, updateObj);
}

export function addTrack(playlistId, trackObj) {
  var trackToAdd = {
    trackId: trackObj.trackId,
    track: trackObj.track,
    artists: trackObj.artists,
    album: trackObj.album,
    year: trackObj.year,
    imageUrl: trackObj.imageUrl,
    trackUrl: trackObj.trackUrl
  };

  return Playlist.updateOne(
    { playlistId: playlistId },
    { $push: { tracks: trackToAdd } },
    // For server response
    (err, result) => {
      if (err) {
        res.status(500)
          .json({ error: `Unable to insert new track. Error: ${err}`});
      } else {
        res.status(200)
          .json(result);
      }
    }
  );

}

export function addSearchResults(results) {
  return SearchResults.insertMany(results);
}

// let addTrackAnalysis = (playlistId, trackAnalysisObj) => {
//   // needs to iterate through array, use updateMany???
//   // export afterwards

//   var trackAnalysis = {
//     danceability: trackAnalysisObj.danceability,
//     energy: trackAnalysisObj.energy,
//     tempo: trackAnalysisObj.tempo,
//     valence: trackAnalysisObj.valence
//   };

//   return Playlist.updateOne(
//     { playlistId: playlistId, tracks.trackId: trackAnalysisObj.trackId },
//     { $set: trackAnalysis },
//     // For server response
//     (err, result) => {
//       if (err) {
//         res.status(500)
//         .json({ error: `Unable to update track data. Error: ${err}`});
//       } else {
//         res.status(200)
//         .json(result);
//       }
//     }
//   );
// };
