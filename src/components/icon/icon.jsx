import React from 'react';
import classnames from 'classnames';

function Icon(props) {
  const {
    name = '',
    className = '',
  } = props;

  const iconName = `icon-${name}`;

  const clazz = classnames({
    'comp-icon': true,
    'iconfont': true,
    [iconName]: true,
    [className]: true,
  });

  return (
    <span
      className={clazz}
      />
  );
}

export default Icon;
