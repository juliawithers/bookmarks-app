import React, { Component } from  'react';
// import { withRouter } from 'react-router-dom';
import config from '../config'
import './AddBookmark.css';
import BookmarksContext from '../BookmarksContext'
import PropTypes from 'prop-types'


const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class AddBookmark extends Component {

  static contextType = BookmarksContext;
  state = {
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description, rating } = e.target
    const bookmark = {
      title: title.value,
      url: url.value,
      description: description.value,
      rating: Number(rating.value),
    }
    this.setState({ error: null })
    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        title.value = ''
        url.value = ''
        description.value = ''
        rating.value = ''
        this.context.addBookmark(data)
        this.props.history.push('/')
        // this.props.onAddBookmark(data)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  }

  render() {
    const { error } = this.state
    // const { onClickCancel } = this.props
    return (
      <section className='AddBookmark'>
        <h2>Create a bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Great website!'
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder='https://www.great-website.com/'
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue='1'
              min='1'
              max='5'
              required
            />
          </div>
          <div className='AddBookmark__buttons'>
            {/* <button type='button' onClick={onClickCancel}> */}
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

AddBookmark.propTypes = {
  title: PropTypes.string.isRequired,
  url: (props, propName, componentName) => {
    // get the value of the prop
    const prop = props[propName];

    // do the isRequired check
    if(!prop) {
      return new Error(`${propName} is required in ${componentName}. Validation Failed`);
    }

    // check the type
    if (typeof prop != 'string') {
      return new Error(`Invalid prop, ${propName} is expected to be a string in ${componentName}. ${typeof prop} found.`);
    }

    // do the custom check here
    // using a simple regex
    if (prop.length < 5 || !prop.match(new RegExp(/^https?:\/\//))) {
      return new Error(`Invalid prop, ${propName} must be min length 5 and begin http(s)://. Validation Failed.`);
    }
  },
  rating: PropTypes.number,
  description: PropTypes.string
};

AddBookmark.defaultProps={
  rating:1,
  description: ""
}

AddBookmark.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  rating: PropTypes.number,
  description: PropTypes.string
};

// export default withRouter(AddBookmark);
export default AddBookmark;
