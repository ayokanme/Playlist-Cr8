import React from 'react';
import $ from 'jquery';

import TrackSearch from './components/TrackSearch.jsx';
import SelectedSongs from './components/SelectedSongs.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search(query) {
    console.log(`${query} was searched`);
    var searchQuery = { query };
    $.ajax({
      type: 'POST',
      url: '/search',
      data: searchQuery,
      success: (data) => {
        console.log(`the search returned ${data}`);
      },
      dataType: 'json'
    });
  }

  render() {
    return (
      <div id="container">
        <div className="appHeader">
          <h1> Welcome to Playlist Cr8! </h1>
          <TrackSearch onSearch={this.search}/>
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
