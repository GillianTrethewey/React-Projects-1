import React from 'react';
import './BookInfo.css';

function BookInfo(props) {

  return (
    <div className="BookInfo">
      <img src={props.coverImage} alt="Cover" />
      <h2>{props.title}</h2>
      <h2>by {props.author}</h2>
      <h3>{props.release}</h3>
    </div>
  );
}

export default BookInfo;
