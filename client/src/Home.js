import React from 'react';
import { Link } from 'react-router';

export default function Home() {
  return (
    <div className="col-md-6 offset-md-3">
      <div className="list-group">
        <Link to="/books" className="list-group-item list-group-item-action">Books</Link>
        <Link to="/authors" className="list-group-item list-group-item-action">Authors</Link>
        <Link to="/genres" className="list-group-item list-group-item-action">Genres</Link>
      </div>
    </div>
  )
}
