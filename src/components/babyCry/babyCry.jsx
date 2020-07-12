import React from 'react';
import classnames from 'classnames';

function BabyCry(props) {
  const { className } = props;
  const clazz = classnames({
    'full-baby-container': true,
    [className]: true,
  });

  return (
    <div className={clazz}>
      <div className="baby-container">
        <div className="baby-bottle-container">
          <div className="bottle">
            <div className="bottle-glass">
              <div className="bottle-measure"></div>
              <div className="bottle-measure"></div>
            </div>
            <div className="bottle-rim-chew"></div>
            <div className="bottle-rim-middle"></div>
            <div className="bottle-rim"></div>
          </div>
        </div>

        <div className="towel">
          <div className="towel-band"></div>
        </div>
        
        <div className="baby-head">
          <div className="baby-face">
            <div className="eyes">
              <div className="eye left-eye"></div>
              <div className="eye right-eye"></div>
            </div>
            <div className="mouth">
              <div className="left-mouth-part"></div>
              <div className="right-mouth-part"></div>
              <div className="mouth-tongue"></div>
            </div>
            <div className="chin"></div>
          </div>
          
          <div className="hair-container">
            <div className="panel-container" id="rotate-x">
              <div className="flick-down"></div>
              <div className="flick-up"></div>
              <div className="flick-up-2"></div>
              <div className="flick-up-2-round"></div>        
              <div className="panel"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="baby-dummy-container">
        <div className="dummy-chew"></div>			
        <div className="baby-dummy-ring"></div>
        <div className="baby-dummy-base-bottom"></div>
        <div className="baby-dummy-base-middle"></div>
      </div>
      
    </div>
  );
}

export default BabyCry;
