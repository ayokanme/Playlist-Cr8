import axios from "axios";
import config from "../config.js";

export default function createPlaylist(createPlaylistObj) {

  var queryObject = {
    name: createPlaylistObj.name,
    description: `${createPlaylistObj.description} (this playlist was made using Playlist Cr8 app)`,
    public: false
  };

  let options = {
    url: `https://api.spotify.com/v1/users/${config.user_id}/playlists`,
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
      var spotifyId = response.data.id;
      // console.log(`Your playlistId is: ${spotifyId}`);
      return spotifyId;
    })
    .catch((error) => {
      console.log(`Your search returned an error. ${error}`);
      return error.response.data;
    });
}
