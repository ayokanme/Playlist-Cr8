import React from 'react';

class SelectedSongs extends React.Component {
  constructor(props) {
    super(props);
  }

  createTrackListItem(track) {
    return (
      <li song={track.trackName}>{
        `Track: ${track.trackName}
        Artist: ${track.artistName}`
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
