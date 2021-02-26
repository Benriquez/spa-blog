import React, { useState, useEffect } from 'react';
import moment from 'moment';

import usePost from '../../hooks/usePost'
import Button from '../Button';
import Loading from '../Loading'
import './Comment.scss';

const Comment = ({ postId, comments }) => {
  const { comment, addComment } = usePost(postId);
  const [contents, setContents] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  function getDurationTimeSince(date) {
    let seconds = Math.floor((new Date() - moment(date)) / 1000),
        years = seconds / 31536000,
        months = seconds / 2592000,
        days = seconds / 86400,
        hours = seconds / 3600,
        minutes = seconds / 60;

    if(years > 1) return `${Math.floor(years)} year${Math.floor(years) > 1 ? 's' : ''} ago`;
    if(months > 1) return `${Math.floor(months)} month${Math.floor(months) > 1 ? 's' : ''} ago`;
    if(days > 1) return `${Math.floor(days)} day${Math.floor(days) > 1 ? 's' : ''} ago`;
    if(hours > 1) return `${Math.floor(hours)} hour${Math.floor(hours) > 1 ? 's' : ''} ago`;
    if(minutes > 1) return `${Math.floor(minutes)} minute${Math.floor(minutes) > 1 ? 's' : ''} ago`;
    if(seconds > 1 || seconds === 0) return `${Math.floor(seconds)} second${Math.floor(seconds) > 1 ? 's' : ''} ago`;
  }

  useEffect(() => setContents(comments), [comments])

  useEffect(() => {
    if(comment) {
      setValue('')
      setLoading(false)
      setMessage(false)
    }
  }, [postId, comment])

  const handleClick = e => {
    e.preventDefault();

    if(value.length > 0) {
      addComment({ postId: parseInt(postId), content: value })
      setLoading(true);
    } else {
      setMessage(true)
    }
  }

  return (
    <div className="l-container">
      {loading ? <Loading /> : ''}
      <div className="comment">
        <h2 className="heading">COMMENT</h2>

        <ul className="comment-list">
          {contents.map((value, key) => (
          <li key={key} className="comment-item">
            <p className="comment-item-text">{value.content}</p>
            <span className="comment-item-date">{getDurationTimeSince(value.createdAt)}</span>
          </li>))}
          <li className="comment-item comment-item-textarea">
            <textarea placeholder="Write comment" value={value} onChange={(e) => setValue(e.target.value)}></textarea>
          </li>
          {message ? <p class="message message-comment error">Please add comment!</p> : ''}
        </ul>
        <div className="comment-button">
          <Button label="Submit" onClick={(e) => handleClick(e)} />
        </div>
      </div>
    </div>
  );
}

export default Comment;
