import React from 'react';
import TrackCard from './TrackCard.jsx';

class CurrentTracklist extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTrack = this.deleteTrack.bind(this);
  }

  deleteTrack(trackId) {
    this.props.delete(trackId);
  }


  render() {
    let CurrentTracklist = this.props.playlist;

    return (
      <div className="currentTracklist">
        {
          CurrentTracklist.map(track => {
            return (<TrackCard track={track} action={this.deleteTrack} />)
          })
        }
      </div>
    );
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.selectTrack = this.selectTrack.bind(this);
  }

  selectTrack(trackId) {
    this.props.select(trackId);
  }


  render() {
    let searchedTracks = this.props.searchResults;

    return (
      <div className="searchResults">
        {
          searchedTracks.map(track => {
            return (<TrackCard track={track} action={this.selectTrack} />)
          })
        }
      </div>
    );
  }
}

export { CurrentTracklist, SearchResults };
