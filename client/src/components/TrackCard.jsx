import React from 'react';

class TrackCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let track = this.props.track;

    //refactor these to use icons in place of the bullets
    return (
      <div className="trackCard" onClick={() => this.props.action(track.trackId)}>
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
      </div>
    );
  }
}

export default TrackCard;