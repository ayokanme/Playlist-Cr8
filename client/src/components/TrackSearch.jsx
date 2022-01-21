import React from 'react';

class TrackSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.query);
  }

  render() {
    return (
      <div className="searchForm">
        <h2>Search for a track</h2>
      <form onSubmit={this.search}>
        <input
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="type in a song, artist, or album">
        </input>
        <button type="submit">search</button>
      </form>
    </div>
    );
  }
}

export default TrackSearch;
