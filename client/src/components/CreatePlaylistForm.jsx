import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

class CreatePlaylistForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
      playlistDescription: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.create = this.create.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  create(e) {
    // prevent app from rerendering!
    e.preventDefault();
    // handle create
    this.props.playlistCreate({
      name: this.state.playlistName,
      description: this.state.playlistDescription
    });
    // close modal
    this.props.modalHandler();
    // reset the form after search button is hit
    this.setState({
      playlistName: '',
      playlistDescription: ''
    });
  }

  render() {
    return (
      <div className="playlistForm-container">
        <button id="escapeModal" onClick={this.props.modalHandler}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <h2>playlist details</h2>
        <div className="playlistForm-fields">
          <form onSubmit={this.create}>
            <label htmlFor="playlistName" style={{ display: 'block' }}>name: </label>
            <input
              name="playlistName"
              value={this.props.playlistName}
              onChange={this.handleChange}
              type="text"
              required
              style={{ display: 'block' }}
              placeholder="what are you going to name it?">
            </input>
            <br></br>
            <label htmlFor="playlistDescription" style={{ display: 'block' }}>
              description:
            </label>
            <textarea
              name="playlistDescription"
              value={this.props.playlistDescription}
              onChange={this.handleChange}
              style={{ display: 'block' }}
              placeholder="say a few words about your masterpiece...">
            </textarea>
            <br></br>
            <button>CREATE PLAYLIST</button>
          </form>
        </div>
      </div>
    );
  }
}


export default CreatePlaylistForm;
