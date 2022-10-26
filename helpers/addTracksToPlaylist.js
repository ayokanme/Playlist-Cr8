import axios from "axios";
import config from "../config.js";

export default function addTracksToPlaylist(playlistId, trackIdArray) {

  var queryArray = trackIdArray.map(id => {
    return `spotify:track:${id}`;
  });

  var queryObject = {
    uris: queryArray
  };

  let options = {
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    headers: {
      "User-Agent": "request",
      "Authorization": `Bearer ${config.bearer_token}`
    }
  };

  return axios({
    method: "post",
    url: options.url,
    data: queryObject,
    responseType: "json",
    headers: options.headers,
    validateStatus: (status) => {
      return status === 201;
    }
  })
    .then((response) => {
      var snapshotId = response.data.snapshot_id;
      // console.log(`Your snapshotId is: ${snapshotId}`);
      return snapshotId;
    })
    .catch((error) => {
      console.log(`Your search returned an error. ${error}`);
      return error.response.data;
    });
}
