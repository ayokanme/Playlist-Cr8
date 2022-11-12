# Playlist Cr8 #
Create playlists using the Spotify Web API

## Installation
- Open a terminal window and clone this repository and navigate to the project directory
  ```
  git clone https://github.com/ayokanme/Playlist-Cr8.git

  cd playlist-cr8
  ```

- Request a token from the [Spotify Developer Console](https://developer.spotify.com/console/) with the following permissions:
  - `playlist-modify-public`
  - `playlist-modify-private`

- Rename the `config.example.js` file to `config.js`
  - paste the token into the `bearer_token` field
  - paste your Spotify User ID into the `user_id` field

- Create two (2) terminal sessions:
  - In session #1, run: `npm install` then `npm run build`
  - In session #2, run: `npm start`

- Open your browser and navigate to `http://localhost:3000/`

## Usage
- Type a song, album, or artist's name in the search bar (just like you would on the official Spotify app) then hit enter/return.
- Add a track to the tracklist from the search results by clicking anywhere on it.
- After you have selected 5 tracks, the `CR8 PLAYLIST` button will be enabled. Click it!
- A modal window will pop up prompting you to name your playlist and add a description.
- Hit the `CREATE PLAYLIST` button and your playlist will show up on the right for your listening pleasure.
- Look in your Spotify account and your playlist will be waiting for you!

## Future Plans
Future development will focus on:
- [ ] rewrite in TypeScript
- [ ] rewrite using NextJS
- [ ] Streamlining authentication by using the [Spotify Passport](https://www.passportjs.org/packages/passport-spotify/) strategy
- [ ] Publishing to a website (the domain is secured!)
- [ ] Implementing a track sorting algorithm (using track features)