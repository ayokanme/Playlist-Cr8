import React from 'react';

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
      <div>
        <button onClick={this.props.modalHandler}>X</button>
        <h2>Playlist Details</h2>
        <div className="form">
          <form onSubmit={this.create}>
            <label htmlFor="playlistName" style={{ display: 'block' }}>Name: </label>
            <input
              name="playlistName"
              value={this.props.playlistName}
              onChange={this.handleChange}
              type="text"
              required
              style={{ display: 'block' }}
              placeholder="what should we name it?">
            </input>
            <label htmlFor="playlistDescription" style={{ display: 'block' }}>Description: </label>
            <textarea
              name="playlistDescription"
              value={this.props.playlistDescription}
              onChange={this.handleChange}
              style={{ display: 'block' }}
              placeholder="say a few words about your masterpiece">
            </textarea>
            <button>CREATE PLAYLIST</button>
          </form>
        </div>
      </div>
    );
  }
}


export default CreatePlaylistForm;
