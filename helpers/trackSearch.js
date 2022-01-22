const axios = require('axios');
const config = require('../config.js');

let trackSearch = (searchString) => {

  var createQueryString = (string) => {
    var trackQuery = '';
    if (string) {
      trackQuery = string.replaceAll(' ', '%20');
    }
    return trackQuery;
  };

  var queryString = createQueryString(searchString);

  let options = {
    url: `https://api.spotify.com/v1/search?q=${queryString}&type=track`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `Bearer ${config.bearer_token}`
    }
  };

  return axios({
    method: 'get',
    url: options.url,
    responseType: 'json',
    headers: options.headers,
    validateStatus: (status) => {
      return status === 200;
    }
  })
    .then((response) => {
      var queryResponse = [];
      response.data.tracks.items.forEach(song => {

        var parseArtists = (track) => {
          var artistsStorage = [];
          track.artists.forEach(artist => {
            artistsStorage.push(artist.name);
          });
          var artistsString = artistsStorage.join(', ');
          return artistsString;
        };

        var parseYear = (track) => {
          return track.album.release_date.substring(0, 4);
        };

        var parseImage = (track) => {
          return track.album.images.find(({ height }) => height === 64 );
        };

        var trackData = {
          track: song.name,
          artists: parseArtists(song),
          album: song.album.name,
          year: parseYear(song),
          imageUrl: parseImage(song).url,
          trackId: song.id,
          trackUrl: song.external_urls.spotify,
        };

        queryResponse.push(trackData);
      });

      // console.log(`Your search returned this data: ${JSON.stringify(queryResponse)}`);
      return queryResponse;
    })
    .catch((error) => {
      // console.log(`Your search returned an error. ${error}`);
      return error.response.data;
    });
};

module.exports.trackSearch = trackSearch;
