import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './Article.scss';
import noImage from '../../assets/images/noimage.jpg';

const Article = ({ id, time, image, title }) => {
  return (
    <article className="article-card">
      <Link className="article-card-link" to={`/news/${id}`}>
        <div className="article-card-image" style={{ backgroundImage: `url(${image ? image : noImage})`}}></div>
       
        <time className="article-card-time" dateTime="2021-02-25">2021-02-25</time>
        <p className={`article-card-desc${!time ? ' article-card-desc-top' : ''}`}>{title}</p>
      </Link>
    </article>
  );
}

export default Article;
