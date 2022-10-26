import { Playlist, SearchResults } from "./index.js";

export function getPlaylistTracks(playlistId) {
  return Playlist.find({ playlistId: playlistId }, "tracks");
}

export function getSearchResults() {
  return SearchResults.find().limit(10);
}

export function deleteSearchResults() {
  return SearchResults.deleteMany({});
}
