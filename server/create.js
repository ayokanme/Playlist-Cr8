import createPlaylist from "../helpers/createPlaylist";
import addTracksToPlaylist from "../helpers/addTracksToPlaylist";

export default function create(req, res) {
  const playlistCreateQueryObj = {
    name: req.body.name,
    description: req.body.description,
  };
  const trackIds = req.body.tracks;
  let playlistId = "";
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
    .then((spotifyId) => addTracksToPlaylist(spotifyId, trackIds))
    .then((data) => {
      if (data.error) {
        console.log(`the search returned this error at addTracksToPlaylist: ${JSON.stringify(data)}`);
        res.status(data.error.status).json(data.error).end();
      } else {
        // console.log(`the search returned: ${JSON.stringify(data)}`);
        if (playlistId) {
          res.status(201)
            .json({ embedLink: `https://open.spotify.com/embed/playlist/${playlistId}` })
            .end();
        }
      }
    })
    .catch(() => {
      res.status(404).send("error. troubleshoot.").end();
    });
}
