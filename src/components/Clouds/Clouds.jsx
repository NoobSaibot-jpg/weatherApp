import React from 'react'
import './clouds.scss'
import cloud1 from './img/cloud-01.png';
import cloud2 from './img/cloud-02.png';
import cloud3 from './img/cloud-03.png';
import cloud4 from './img/cloud-04.png';

export default function Clouds() {
  return (
    <div className="cloud">
        <img src={cloud1} alt="cloud" className="cloud1"/>
        <img src={cloud2} alt="cloud" className="cloud2"/>
        <img src={cloud3} alt="cloud" className="cloud3"/>
        <img src={cloud4} alt="cloud" className="cloud4"/>
    </div>
  )
}
