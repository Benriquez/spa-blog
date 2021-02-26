import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import usePost from './../hooks/usePost'

import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import Confirmation from '../components/Confirmation';
import Upload from '../components/Upload';
import './SinglePage.scss';
import './SingleEditPage.scss';
import { DELAY } from '../utils/constants'

const SingleNewPage = () => {
  const dateToday = new Date();
  const history = useHistory();
  const {posts, addPost} = usePost();
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [values, setValues] = useState({
    title: '',
    content: '',
    image: '',
  });

  const handleChange = (id, value) => {
    setValues({
      ...values,
      [id]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(values.title !== '' || values.title.length > 0) {
      if(image) values.image = image
      addPost({ post: { ...values } })
      history.push(`/news/${posts.length + 1}`)
    } else {
      setMessage('Title must not be empty!');
    }
  }

  const handleCancel = e => {
    e.preventDefault();
    if(image) values.image = image

    if(values.title.length > 0 ||
      values.content.length > 0 ||
      values.image.length > 0) {
      setTimeout(() => setConfirm(!confirm), DELAY)
    } else {
      history.push(`/`)
    }
  }

  return (
    <>
      <Breadcrumbs title="Create New Post" />
      <Confirmation
        modifier={confirm ? ' is-open' : ''}
        text={'Are you sure you want to discard changes?'}
        onClick={(e) => handleCancel(e)} />

      <div className="l-container single-body single-body-new">
        {message !== '' ? <p class="message message-single error">{message}</p> : ''}
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <div className="content-header-item content-header-item-right">
              <div className="content-header-link">
                <Button modifier="button-default" label="Save Post" />
              </div>
              <div className="content-header-link">
                <Button modifier="button-default" label="Cancel" onClick={e => handleCancel(e)} />
              </div>
            </div>
          </div>

          <span className="single-date">
            <time dateTime={moment(dateToday).format('YYYY-MM-DD')}>
              {moment(dateToday).format('YYYY.MM.DD')}
            </time>
          </span>

          <textarea className="single-edit-textarea single-edit-heading" placeholder="Title"
            name="title" id="title" value={values.title} onChange={(e) => handleChange('title', e.target.value)}></textarea>

          <Upload callback={file => setImage(file)} />

          <textarea className="single-edit-textarea single-edit-copy" placeholder="Content"
            name="content" id="content" value={values.content} onChange={(e) => handleChange('content', e.target.value)}></textarea>
        </form>
     </div>
    </>
  );
}

export default SingleNewPage;
