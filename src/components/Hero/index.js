import React, { useState, useEffect, useRef } from 'react';
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
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(count + 1);
    if(count >= 5) { handleNextClick(); }
  }, 1000);
  const handlePrevClick = () => {
    setId(prevId => prevId == 0 ? prevId + 2 : prevId - 1);
    setCount(0);
  }
  const handleNextClick = () => {
    setId(prevId => prevId == 2 ? prevId - 2 : prevId + 1);
    setCount(0);
  }
  const handleClick = (key) => {
    setId(key)
    setCount(0)
  }
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
              <span className='hero-slider-nav-button prev' onClick={() => handlePrevClick()}></span>
              <span className='hero-slider-nav-button next' onClick={() => handleNextClick()}></span>
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

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Hero;
