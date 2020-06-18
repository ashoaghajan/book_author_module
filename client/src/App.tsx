import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddBook from './components/books/AddBook';
import Navbar from './components/Navbar';
import ListAuthors from './components/author/ListAuthors';
import ListBooks from './components/books/ListBooks';
import AddAuthor from './components/author/AddAuthor';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <ListBooks />
            <AddBook />
          </Route>
          <Route path='/authors'>
            <ListAuthors />
            <AddAuthor />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
