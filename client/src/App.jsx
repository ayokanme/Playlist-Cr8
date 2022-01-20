import React from 'react';
import TrackSearch from './components/TrackSearch.jsx';
import SelectedSongs from './components/SelectedSongs.jsx';
// import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      trackName: '',
      artistName: '',
      key: 0
    }
    this.handleFormEntry = this.handleFormEntry.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
  }

  handleFormEntry(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addTrack(e) {
    var refresh = this.state.tracks;
    refresh.push({
      track: this.state.trackName,
      artist: this.state.artistName,
      key: this.state.tracks.length
    });

    this.setState({
      tracks: refresh,
      trackName: '',
      artistName: ''
    });

    console.log(this.state.tracks);

    e.preventDefault();
    e.target.reset();
  }

  deleteTrack(index) {
    var newTrackList = this.state.tracks.filter(track => {
      return track.key !== index;
    });

    this.setState({
      tracks: newTrackList
    });
  }

  render() {
    return(
      <div id="container">
        <div className="appHeader">
          <h1> Welcome to Playlist Cr8! </h1>
          <TrackSearch
            addTrack={this.addTrack}
            onFormChange={this.handleFormEntry}
          />
        </div>
        <div className="appLists">
          <div className="currentTrackList" style={{display: 'inline-block'}}>
            <h3> Your current tracklist </h3>
            <SelectedSongs
              tracks={this.state.tracks}
              delete={this.deleteTrack}
            />
          </div>
          <div className="searchResults" style={{display: 'inline-block'}}>
            <h3> Your searched tracks </h3>
            <SelectedSongs
              tracks={this.state.tracks}
              delete={this.deleteTrack}
            />
          </div>
        </div>
        <div className="createPlaylistForm">
          <h3>form for creating a playlist from the tracks selected will be rendered here.</h3>
          <h5>inputs: name and description</h5>
          <h5>button: cr8</h5>
        </div>
      </div>
    );
  }
}

export default App;
