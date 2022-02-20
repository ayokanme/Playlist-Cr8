import React from 'react';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.selectTrack = this.selectTrack.bind(this);
    this.createSearchResultItem = this.createSearchResultItem.bind(this);
  }

  selectTrack(trackId) {
    this.props.select(trackId);
  }

  createSearchResultItem(track) {
    return (
      <li onClick={() => this.selectTrack(track.trackId)}>
        <div style={{display: 'inline-block'}}>
          <img src={track.imageUrl} width="64" height="64"/>
        </div>
        <div style={{display: 'inline-block'}}>
          <ul>
          <li className="trackName">
            {`Track: `}
              <a href={track.trackUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {track.track}
              </a>
            </li>
            <li className="artistName">{`Artist(s): ${track.artists}`}</li>
            <li className="albumName">{`Album: ${track.album}`}</li>
            <li className="releaseYear">{`Year: ${track.year}`}</li>
          </ul>
        </div>
      </li>
    );
  }

  render() {
    var searchedTracks = this.props.searchResults;
    var results = searchedTracks.map(this.createSearchResultItem);
    // console.log('Search Results rendered: ', searchedTracks);
    return (
      <ul className="searchResults">
        {results}
      </ul>
    );
  }
}

export default SearchResults;
