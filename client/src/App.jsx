import React from 'react';
import ReactModal from 'react-modal';
import $ from 'jquery';

import CreatePlaylistForm from './components/CreatePlaylistForm.jsx';
import TrackSearch from './components/TrackSearch.jsx';
import CurrentTracklist from './components/CurrentTracklist.jsx';
import SearchResults from './components/SearchResults.jsx';
const sampleData = require('../../sampledata.js').data;


ReactModal.setAppElement('#app');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlist: [],
      disablePlaylistCreate: true,
      showModal: false,
      playlistEmbed: '',
      playlistCreated: false
    }
    this.search = this.search.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.selectTrack = this.selectTrack.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
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

  handleModal() {
    this.setState({
      showModal: !this.state.showModal
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

  createPlaylist(playlistData) {
    var playlistArray = this.state.playlist;
    var trackIds = [];
    playlistArray.forEach(track => {
      trackIds.push(track.trackId);
    });
    var playlistCreateQuery = {
      name: playlistData.name,
      description: playlistData.description,
      tracks: trackIds
    };

    // learn regex later and fix this mess
    if (playlistData.playlistName !== ' ') {
      $.ajax({
        type: 'POST',
        url: '/create',
        data: playlistCreateQuery,
        success: (data) => {
          // console.log('create request');
          this.setState({
            playlistEmbed: data.embedLink,
            playlistCreated: true
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

    if (updatedPlaylist.length < 5) {
      this.setState({
        disablePlaylistCreate: true
      });
    }

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

    if (updatedPlaylist.length >= 5) {
      this.setState({
        disablePlaylistCreate: false
      });
    }

    this.setState({
      playlist: updatedPlaylist
    });
  }

  render() {
    // console.log('App rendered with search state: ', this.state.searchResults);
    return (
      <div id="container">
        <div id="app-header">
          <h1>playlist cr8</h1>
          <TrackSearch onSearch={this.search}/>
        </div>
        <div id="app-lists">
          <div id="tracklist-container"
            style={{ display: 'inline-block', verticalAlign: 'top' }}
          >
            <h3> tracklist </h3>
            <CurrentTracklist
              playlist={this.state.playlist}
              delete={this.deleteTrack}
            />
          </div>
          <div id="results-container"
            style={{ display: 'inline-block', verticalAlign: 'top' }}
          >
            {
              this.state.playlistCreated
              ?
              <iframe
                src={this.state.playlistEmbed}
                width="100%"
                height="380"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
              >
              </iframe>
              :
              <div className="search"
                style={{ display: 'inline-block', verticalAlign: 'top' }}
              >
                <h3> search results </h3>
                <SearchResults
                  searchResults={this.state.searchResults}
                  select={this.selectTrack}
                />
              </div>
            }
          </div>
        </div>
        <div id="createPlaylist-modal">
          <button
            onClick={this.handleModal}
            disabled={this.state.disablePlaylistCreate}
          >
            CR8 PLAYLIST
          </button>
          <ReactModal isOpen={this.state.showModal}>
            <CreatePlaylistForm
              playlistCreate={this.createPlaylist}
              modalHandler={this.handleModal}
            />
          </ReactModal>
        </div>
      </div>
    );
  }
}

export default App;
