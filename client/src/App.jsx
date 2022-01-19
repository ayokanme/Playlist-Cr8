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
      key: Date.now()
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

  render() {
    return(
      <div id="container">
        <div className="appHeader">
          <h1> Welcome to Playlist Cr8! </h1>
          <TrackSearch
            addTrack={this.addTrack.bind(this)}
            onFormChange={this.handleFormEntry.bind(this)}
          />
        </div>
        <div className="appLists">
          <h3> Your current tracklist </h3>
          <SelectedSongs tracks={this.state.tracks} />
        </div>
      </div>
    );
  }
}

export default App;
