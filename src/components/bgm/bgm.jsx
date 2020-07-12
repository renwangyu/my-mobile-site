import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import song from '../../assets/music/slamdunk.mp3';

function BGM(props) {
  const { className } = props;
  const clazz = classnames({
    'comp-bgm': true,
    [className]: true,
  });
  
  const bgmRef = useRef(null);

  useEffect(() => {
    bgmRef.current.play();
  }, [])

  return (
    <section className={clazz}>
      <audio id="bgm" ref={bgmRef} src={song}></audio>
      music
    </section>
  )
}

export default BGM;
