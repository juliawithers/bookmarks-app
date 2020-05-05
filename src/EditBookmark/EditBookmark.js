import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import config from '../config'
import './EditBookmark.css';
import BookmarksContext from '../BookmarksContext'
import PropTypes from 'prop-types'


const Required = () => (
    <span className='EditBookmark__required'>*</span>
)

class EditBookmark extends Component {
    static propTypes = {
        match: PropTypes.shape({
          params: PropTypes.object,
        }),
        history: PropTypes.shape({
          push: PropTypes.func,
        }).isRequired,
    };

    static contextType = BookmarksContext;
    state = {
        error: null,
        id: '',
        title: '',
        url: '',
        description: '',
        rating: ''
    };

    componentDidMount = () => {
        const id = this.props.match.params.id;
        fetch(config.API_ENDPOINT + `/${id}`, {
            method: 'GET',
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
                this.setState({
                    id: data.id,
                    title: data.title,
                    url: data.url,
                    description: data.description,
                    rating: data.rating
                })
            })
            .catch(error => {
                this.setState({ error })
            })

    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    changeUrl = (e) => {
        this.setState({
            url: e.target.value
        })
    }
    changeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    changeRating = (e) => {
        this.setState({
            rating: e.target.value
        })
    }


    handleSubmit = e => {
        e.preventDefault()
        // get the form fields from the event

        const bookmark = {
            id: this.state.id,
            title: this.state.title,
            url: this.state.url,
            description: this.state.description,
            rating: this.state.rating,
        }

        this.setState({ error: null })
        fetch(config.API_ENDPOINT + `/${bookmark.id}`, {
            method: 'PATCH',
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
                        Promise.reject(error)
                    })
                }
            })
            .then(() => {
                this.setState({
                    id: bookmark.id || '',
                    title: bookmark.title || '',
                    url: bookmark.url || '',
                    description: bookmark.description || '',
                    rating: bookmark.rating || '',
                })
                this.context.updateBookmark(bookmark)
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    render() {
        const { error, id, title, url, description, rating } = this.state

        // const { onClickCancel } = this.props
        return (
            <section className='EditBookmark'>
                <h2>Edit Bookmark </h2>
                <form
                    className='EditBookmark__form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='EditBookmark__error' role='alert'>
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
                            value={title}
                            onChange={this.changeTitle}
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
                            value={url}
                            onChange={this.changeUrl}
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
                            value={description}
                            onChange={this.changeDescription}
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
                            value={rating}
                            min='1'
                            max='5'
                            onChange={this.changeRating}
                            required
                        />
                    </div>
                    <div className='EditBookmark__buttons'>
                        {/* <button type='button' onClick={onClickCancel}> */}
                        <button type='button' onClick={this.handleClickCancel}>
                            Cancel
            </button>
                        {' '}
                        <button type='submit'>
                            Update
            </button>
                    </div>
                </form>
            </section>
        );
    }
}

EditBookmark.propTypes = {
    title: PropTypes.string.isRequired,
    url: (props, propName, componentName) => {
        // get the value of the prop
        const prop = props[propName];

        // do the isRequired check
        if (!prop) {
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

EditBookmark.defaultProps = {
    rating: 1,
    description: ""
};

EditBookmark.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    rating: PropTypes.number,
    description: PropTypes.string
};

// export default withRouter(EditBookmark);
export default EditBookmark;
