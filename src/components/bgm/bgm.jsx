import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import Icon from '../icon';

function BGM(props) {
  const [isPlay, setPlay] = useState(false);
  const bgmRef = useRef(null);

  const {
    className = '',
    song = '',
  } = props;
  const clazz = classnames({
    'comp-bgm': true,
    'comp-bgm--play': isPlay,
    'comp-bgm--pause': !isPlay,
    [className]: true,
  });

  useEffect(() => {
    if (isPlay) {
      bgmRef.current.play();
    } else {
      bgmRef.current.pause();
    }
  }, [isPlay])

  return (
    <section
      className={clazz}
      onClick={(e) => {
        e.stopPropagation();
        setPlay(v => !v);
      }}
    >
      <Icon name="music" className="comp-bgm__music-btn" />
      <audio
        id="bgm"
        ref={bgmRef}
        src={song}
        loop
        />
    </section>
  )
}

export default BGM;
