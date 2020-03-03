import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav(props) {
  return (
    <nav className='Nav'>
      {/* <button onClick={() => props.clickPage('list')}>
        Bookmark List
      </button> */}
      <Link to={'/'}>
        Bookmark List
      </Link>
      {' '}
      {/* <button onClick={() => props.clickPage('add')}>
        Add Bookmark
      </button> */}
      <Link to={'/add-bookmark'}>
        Add Bookmark
      </Link>

    </nav>
  );
}
