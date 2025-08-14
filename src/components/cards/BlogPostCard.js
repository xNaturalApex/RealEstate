// src/components/BlogPostCard.js
import React from "react";
import "./BlogPostCard.css";

const BlogPostCard = ({ post }) => {
  return (
    <div className="blog-post-card">
      <img src={post.image} alt={post.title} />
      <div className="post-info">
        <h4>{post.title}</h4>
        <p>{post.subtext}</p>
      </div>
    </div>
  );
};

export default BlogPostCard;
