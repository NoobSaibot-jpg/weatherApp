import React from 'react';
import './spiner.scss'
import load from './load.gif'

export default function Spiner() {
  return (
    <div className="load">
      <img src={load} alt="loading" className='load_screen' />
    </div>
  );
}
