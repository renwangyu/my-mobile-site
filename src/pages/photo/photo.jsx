import React, { useState, useEffect } from 'react';
import BgPointCloud3d from '../../components/bgPointCloud3d';
import BabyCry from '../../components/babyCry';
import BGM from '../../components/bgm';
import Song from '../../assets/music/slamdunk.mp3';
import bbPng from '../../assets/bb.png';
import nnPng from '../../assets/nn.png';
import clockPng from '../../assets/clock.png';
import txPng from '../../assets/tx.jpeg';

function Photo(props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // setTimeout(() => {
    //   setShow(true);
    // }, 7000)
  }, [])

  const content = show ? <BabyCry className="baby" /> : null;
  const imgs = [
    bbPng,
    nnPng,
    clockPng,
    txPng,
  ];
  const flys = imgs.map((url, index) => {
    const clazz = `fly-${index + 1}`;
    return (
      <div
        key={clazz}
        className={clazz}
        />
    );
  });

  return (
    <article className="mobile-page-photo">
      <BgPointCloud3d />
      <BGM song={Song} className="mobile-page-photo__bgm" />
      <div className="mobile-page-photo-content">
        { content }
        { flys }
        {/* <img src={bbPng} className="fly" alt=""/> */}
      </div>
    </article>
  );
}

export default Photo;
