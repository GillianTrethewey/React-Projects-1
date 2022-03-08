import React from 'react';
import './Article.css';

function Article(props) {
  return (
    <div className="Article">
      <img src={props.image} className="Article-image" alt="allergen" />
      <h2 className="Article-title">{props.title}</h2>
      <div className="Article-summary">
        {props.children}
      </div>
    </div>
  );
}

export default Article;
