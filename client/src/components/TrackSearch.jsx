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

  search(e) {
    // prevent app from rerendering!
    e.preventDefault();
    // handle search
    this.props.onSearch(this.state.query);
    // reset the form after search button is hit
    this.setState({
      query: ''
    });
  }

  render() {
    return (
      <div className="searchForm">
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
