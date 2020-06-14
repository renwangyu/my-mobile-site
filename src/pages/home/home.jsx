import React, { useRef, useEffect, useContext } from 'react';
import { init, loop } from '../../three/rocket';
import bbPic from '../../assets/bb.png';

function Home() {
  useEffect(() => {
    init();
    loop();
  }, []);

  return (
    <article className="mobile-page-home">
      <div className="mobile-page-home_head">
        <img src={bbPic} alt="avatar"/>
        <div className="mobile-page-home_head--tip">
          <div>请在pc端打开链接</div>
          <div>让我们出发吧~</div>
        </div>
      </div>
      <div id="container"></div>
    </article>
  )
}

export default Home;
