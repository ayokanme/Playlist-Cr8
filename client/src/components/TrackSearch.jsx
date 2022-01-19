import React from 'react';

class TrackSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onFormChange(e);
  }

  render() {
    return (
      <div className="searchForm">
        <h2>Search for a track</h2>
      <form onSubmit={this.props.addTrack}>
        <label htmlFor="trackName">Song: </label>
        <input
          id="trackName"
          name="trackName"
          defaultValue={this.props.trackName}
          onChange={this.handleChange}
          placeholder="song title">
        </input>
        <label htmlFor="artistName"> Artist: </label>
        <input
          id="artistName"
          name="artistName"
          defaultValue={this.props.artistName}
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
