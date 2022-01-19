import React from 'react';
import TrackSearch from './components/TrackSearch.jsx';
import SelectedSongs from './components/SelectedSongs.jsx';
// import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="container">
        <div className="appHeader">
          <h1> Welcome to Playlist Cr8! </h1>
          <TrackSearch />
        </div>
        <div className="appLists">
          <SelectedSongs tracks={this.state.tracks} />
        </div>
      </div>
    );
  }
}

export default App;
