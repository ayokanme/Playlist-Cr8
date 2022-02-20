import React from 'react';

class CurrentTracklist extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.createTracklistItem = this.createTracklistItem.bind(this);
  }

  deleteTrack(trackId) {
    this.props.delete(trackId);
  }

  createTracklistItem(track) {
    return (
      <li onClick={() => this.deleteTrack(track.trackId)}>
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
    var CurrentTracklist = this.props.playlist;
    var selectedTracks = CurrentTracklist.map(this.createTracklistItem);

    return (
      <ul className="CurrentTracklist">
        {selectedTracks}
      </ul>
    );
  }
}

export default CurrentTracklist;
