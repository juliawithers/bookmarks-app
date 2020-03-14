import React, { Component } from 'react';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import './BookmarkList.css'
import BookmarksContext from '../BookmarksContext'
import PropTypes from 'prop-types'
class BookmarkList extends Component {
  static contextType = BookmarksContext;
  static defaultProps = {
    bookmarks: []
  };

  render() {
    // const { bookmarks } = this.props
    const { bookmarks } = this.context
    return (
      <section className='BookmarkList'>
        <h2>Your bookmarks</h2>
        <ul className='BookmarkList__list' aria-live='polite'>
          {bookmarks.map(bookmark =>
            <BookmarkItem
              key={bookmark.id}
              {...bookmark}
            />
          )}
        </ul>
      </section>
    );
  }
}

BookmarkList.propTypes={
  bookmarks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    rating: PropTypes.number,
    description: PropTypes.string
  }))
}

export default BookmarkList;
