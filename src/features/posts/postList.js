import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './postAuthor';
import { TimeAgo } from './timeAgo';
import { ReactionButtons } from './reactionButtons';
import { selectAllPosts, fetchPosts } from './postSlice';


export const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  const postStatus = useSelector(state => state.posts.status);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  },[postStatus, dispatch]);

  const renderPosts = orderedPosts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0,100)}</p>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return (
    <section>
      <h2>Posts</h2>
      {renderPosts}
    </section>
  )
};