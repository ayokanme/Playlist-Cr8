import React from 'react';

class SelectedSongs extends React.Component {
  constructor(props) {
    super(props);
    this.createTrackListItem = this.createTrackListItem.bind(this);
  }

  delete(index) {
    this.props.delete(index);
  }

  createTrackListItem(track, index) {
    return (
      <li onClick={() => this.delete(track.key)} key={track.key}>{
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
