import React, { useState, useEffect } from 'react';
import BgPointCloud3d from '../../components/bgPointCloud3d';
import BabyCry from '../../components/babyCry';
import BGM from '../../components/bgm';

function Photo(props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 7000)
  }, [])

  const content = show ? <BabyCry className="baby" /> : null;

  return (
    <article className="mobile-page-photo">
      <BgPointCloud3d />
      <BGM />
      <div className="mobile-page-photo-content">
        { content }
      </div>
    </article>
  );
}

export default Photo;
