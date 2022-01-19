import React from 'react';

class SelectedSongs extends React.Component {
  constructor(props) {
    super(props);
  }

  createTrackListItem(track, index) {
    return (
      <li key={index}>{
        `Track: ${track.track}
        Artist: ${track.artist}`
      }</li>
    );
  }

  render() {
    var selectedSongsEntries = this.props.tracks;
    var selectedTracks = selectedSongsEntries.map(this.createTrackListItem);

    return (
      <ul className="selectedSongsList">
        {selectedTracks}
      </ul>
    );
  }
}

export default SelectedSongs;
