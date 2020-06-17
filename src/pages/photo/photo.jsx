import React, { useEffect } from 'react';
import classnames from 'classnames';
import { init, animate } from '../../three/point-cloud';

function Photo(props) {

  useEffect(() => {
    init();
    animate();
  }, []);

  return (
    <article className="mobile-page-photo">
      <div id="container"></div>
    </article>
  );
}

export default Photo;
