import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
      <div id="search-form">
        <div id="search-form-container">
          <form onSubmit={this.search}>
            <input
              value={this.state.query}
              onChange={this.handleChange}
              placeholder="search for a song, artist, or album">
            </input>
            <button type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default TrackSearch;
