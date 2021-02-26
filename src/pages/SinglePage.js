import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

import useAuth from '../hooks/useAuth'
import usePost from '../hooks/usePost'

import Breadcrumbs from '../components/Breadcrumbs';
import Comment from '../components/Comment';
import Button from '../components/Button';
import './SinglePage.scss';
import noImage from '../assets/images/noimage.jpg';


const SinglePage = () => {
  const history = useHistory();
  const {id} = useParams();
  const {isLoggedIn} = useAuth();
  const {post, postItem} = usePost(id);

  const handleClick = e => {
    e.preventDefault();
    history.push(`/news/edit/${id}`)
  }

  return (
    <>
      <Breadcrumbs title={postItem ? postItem.title : post.title} />
      <div className="l-container single-body">
        {isLoggedIn &&
        <div className="content-header">
          <div className="content-header-item content-header-item-right">
            <div className="content-header-link">
              <Button modifier="button-default" label="Edit Post" onClick={e => handleClick(e)} />
            </div>
          </div>
        </div>}

        {postItem && (postItem.createdAt &&
        <span className="single-date">
          <time dateTime="2021-02-25">2021-02-25
          </time>
        </span>)}

        <h1>{postItem ? postItem.title : post.title}</h1>
        <div className="single-feature-image"
          style={{ backgroundImage: `url(${postItem && postItem.image ? postItem.image : noImage})` }}></div>
        {postItem && (postItem.content && <p>{postItem.content}</p>)}
        {!postItem && (post.content && <p>{post.content}</p>)}

      </div>
      {postItem && (postItem.comments &&
      <Comment
        postId={id}
        comments={postItem.comments}
      />)}
      {!postItem && (post.comments &&
      <Comment
        postId={id}
        comments={post.comments}
      />)}
    </>
  );
}

export default SinglePage;
