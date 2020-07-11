import React, { useState, useEffect } from 'react';
import BgPointCloud3d from '../../components/bgPointCloud3d';


function Photo(props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 7000)
  }, [])

  return (
    <article className="mobile-page-photo">
      { show && <p className="hello-world">hello world</p> }
      <BgPointCloud3d />
    </article>
  );
}

export default Photo;
