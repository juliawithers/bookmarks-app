import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'
=======
import { BrowserRouter } from 'react-router-dom';
>>>>>>> context-startingpoint
import Nav from './Nav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
<<<<<<< HEAD
  <BrowserRouter>
    <Nav />
  </BrowserRouter>,
  div);
=======
    <BrowserRouter>
      <Nav />
    </BrowserRouter>,
    div
  );
>>>>>>> context-startingpoint
  ReactDOM.unmountComponentAtNode(div);
});
