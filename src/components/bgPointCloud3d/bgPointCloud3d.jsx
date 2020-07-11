import React, { useEffect } from 'react';
import { init, animate } from '../../three/point-cloud';

function BgPointCloud3d(props) {

  useEffect(() => {
    init();
    animate();
  }, []);

  return (
    <article className="m-comp-bg-point-cloud-3d">
      <div id="container"></div>
    </article>
  );
}

export default BgPointCloud3d;
