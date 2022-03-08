import React, { useState, useEffect } from 'react';
import './SingleBlogPost.css';

// Get the Article component
import Article from '../../Article/Article.js';

function SingleBlogPost(props) {
  const [post, setPost] = useState(null);


  function doFetchLoad() {
    console.log('need to load', props.match.params.index);
    fetch('/api/' + props.match.params.index)
      .then(response => response.json())
      .then(data => {
        console.log('got data back!', data);
        setPost(data.post);
      });
  }

  function doDelete() {
    fetch('/api/' + props.match.params.index + '/delete/', { method:'DELETE' })
      .then(response => response.json())
      .then(data => {
        console.log('got data back!', data);
        props.history.push('/blog/'); // redirect back
      });
  }

  useEffect(doFetchLoad, []);

  return (
    <div className="SingleBlogPost">
      <h1>Single Post</h1>
      {
        post ? (
          <Article title={post.title} image={post.image}>
            {
              post.content.map((text, index) => (
                <p key={index}>{text}</p>
              ))
            }
          </Article>
        ) : null
      }

      <hr />

      <h2>Actions</h2>
      <button onClick={doDelete}>Delete</button>

    </div>
  );
}

export default SingleBlogPost;
