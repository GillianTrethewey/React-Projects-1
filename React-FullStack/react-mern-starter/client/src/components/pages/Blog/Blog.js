import React, { useState, useEffect } from 'react';
import './Blog.css';

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);

  function fetchPosts() {
    fetch('/api/mongodb/blogposts/')
      .then(response => response.json())
      .then(data => {
        console.log('fetch succesful!!', data);
        setBlogPosts(data);
      });
  }

  function deleteArticle(documentId) {
    console.log('Sending DELETE for', documentId);

    const fetchOptions = {
      method: 'DELETE',
    };

    fetch('/api/mongodb/blogposts/?_id=' + documentId, fetchOptions)
      .then(response => response.json())
      .then(data => {
        console.log('fetch succesful!!', data);
        fetchPosts();
      });
  }

  function voteArticle(article) {
    console.log('Need to use PUT to upvote', article);
    let newVoteCount = article.voteCount;

    // Increase the vote count 
    if (!newVoteCount) {
      newVoteCount = 1;
    } else {
      newVoteCount++;
    }

    const formData = {
      voteCount: newVoteCount,
    };
    // Do the PUT, using "?_id=" to specify which document we are affecting
    const documentId = article._id;
    fetch('/api/mongodb/blogposts/?_id=' + documentId, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);
        fetchPosts();
      });
  }


  useEffect(fetchPosts, []);

  return (
    <div className="Blog">
      <h1>Blog</h1>
      {
        blogPosts.map((post, index) => (
          <div className="Blog-article" key={post._id}>

            <h1>{post.title}</h1>
            <p>{post.text}</p>

            <div className="Blog-articleActions">
              <div onClick={() => deleteArticle(post._id)}>
                <span alt="delete this">🗑</span>
              </div>
              <div onClick={() => voteArticle(post)}>
                <span alt="upvote this">⬆ {post.voteCount}</span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Blog;
