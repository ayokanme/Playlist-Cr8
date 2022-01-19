import React from 'react';

class TrackSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      trackName: '',
      artistName: ''
    }
    this.addTrack = this.addTrack.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addTrack(e) {
    var refresh = this.state.tracks;
    refresh.push({
      track: this.state.trackName,
      artist: this.state.artistName
    });

    this.setState({
      tracks: refresh,
      trackName: '',
      artistName: ''
    });

    console.log(this.state.tracks);

    e.preventDefault();
    e.target.reset();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="searchForm">
        <h2>Search for a track</h2>
      <form onSubmit={this.addTrack}>
        <label htmlFor="trackName">Song: </label>
        <input
          id="trackName"
          name="trackName"
          defaultValue={this.state.artist}
          onChange={this.handleChange}
          placeholder="song title">
        </input>
        <label htmlFor="artistName"> Artist: </label>
        <input
          id="artistName"
          name="artistName"
          defaultValue={this.state.artist}
          onChange={this.handleChange}
          placeholder="artist">
        </input>
        <button type="submit">search</button>
      </form>
    </div>
    );
  }
}

export default TrackSearch;
