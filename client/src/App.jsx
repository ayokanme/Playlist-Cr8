import React from 'react';
import $ from 'jquery';
import PlaylistDetails from './components/PlaylistDetails.jsx';
import TrackSearch from './components/TrackSearch.jsx';
import CurrentTracklist from './components/CurrentTracklist.jsx';
import SearchResults from './components/SearchResults.jsx';
const sampleData = require('../../sampledata.js').data;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlist: []
    }
    this.search = this.search.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.selectTrack = this.selectTrack.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/search',
      success: (data) => {
        // console.log('get request');
        this.setState({
          searchResults: data
        });
      },
      dataType: 'json'
    });
  }

  search(query) {
    var searchQuery = { query };
    if (searchQuery.query) {
      $.ajax({
        type: 'POST',
        url: '/search',
        data: searchQuery,
        success: (data) => {
          // console.log('done');
          this.setState({
            searchResults: data
          });
        },
        dataType: 'json'
      });
    }
  }

  deleteTrack(spotifyTrackId) {
    var updatedPlaylist = this.state.playlist.filter(track => {
      return track.trackId !== spotifyTrackId;
    });

    this.setState({
      playlist: updatedPlaylist
    });
  }

  selectTrack(spotifyTrackId) {
    var selectedTrack = this.state.searchResults.find(track => {
      return track.trackId === spotifyTrackId;
    });

    var updatedPlaylist = this.state.playlist;
    updatedPlaylist.push(selectedTrack);

    this.setState({
      playlist: updatedPlaylist
    });
  }

  render() {
    // console.log('App rendered with search state: ', this.state.searchResults);
    return (
      <div id="container">
        <div className="appHeader">
          <h1> Welcome to Playlist Cr8! </h1>
          <TrackSearch onSearch={this.search}/>
        </div>
        <div className="appLists">
          <div className="playlist" style={{display: 'inline-block'}}>
            <h3> Current Tracklist </h3>
            <CurrentTracklist
              playlist={this.state.playlist}
              delete={this.deleteTrack}
            />
          </div>
          <div className="searchResults" style={{display: 'inline-block'}}>
            <h3> Search Results </h3>
            <SearchResults
              searchResults={this.state.searchResults}
              select={this.selectTrack}
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
