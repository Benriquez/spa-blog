import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import moment from 'moment';

import usePost from '../../hooks/usePost'

import './Hero.scss';
import { IS_ACTIVE, IS_DISABLED } from '../../utils/constants';
//import heroImage from '../../assets/images/hero-img.jpg';
import noImage from '../../assets/images/noimage.jpg';

const Hero = () => {
  const {posts} = usePost();
  const [id, setId] = useState(0);

  const handlePrevClick = () => setId(prevId => prevId - 1);
  const handleNextClick = () => setId(prevId => prevId + 1);
  const handleClick = (key) => setId(key);

  const totalSlides = 3;
  const pager = [];
  for(let i = 0; i < totalSlides; i++) {
    pager.push(<span key={i} className={`hero-slider-pager-button pager-button ${i === id ? IS_ACTIVE : ''}`}
      onClick={() => handleClick(i)}></span>);
  }

  return (
    <div className="hero">
      <Switch>
        <Route path="/" exact>
          <div className="hero-slider">
            <ul>
              {posts.slice(0, totalSlides).map((value, item) => (
                <li key={item} className={`hero-slider-item ${item === id ? 'is-active' : ''}`}
                  style={{backgroundImage: `url(${value.image ? value.image : noImage})`}}>
                  <div className="l-container">
                    <div className="hero-slider-inner">
                      <p className="hero-slider-desc">
                        <span>{value.title.slice(0, 30)}</span>
                      </p>
                      <time className="hero-slider-time" dateTime="2021-02-25">2021-02-25
                      </time>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hero-slider-nav">
              <span className={`hero-slider-nav-button prev ${id === 0 ? IS_DISABLED : ''}`} onClick={() => handlePrevClick()}></span>
              <span className={`hero-slider-nav-button next ${id === totalSlides - 1 ? IS_DISABLED : ''}`} onClick={() => handleNextClick()}></span>
            </div>

            <div className="hero-slider-pager">
              {pager}
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Hero;
