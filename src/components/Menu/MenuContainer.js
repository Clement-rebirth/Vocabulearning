import React from 'react';
import { useTransition, animated } from 'react-spring';

const MenuContainer = props => {

  const {
    isShow,
    animationConfig = { tension: 360, friction: 42 },
    children
  } = props;

  const menuTransitions = useTransition(isShow, null, {
    from: { transform: 'translateX(-100%)' },
    enter: { transform: 'translateX(0)' },
    leave: { transform: 'translateX(-100%)' },
    config: animationConfig
  });

  return menuTransitions.map(({ item, key, props }) =>
    item && 
    <animated.aside key={key} style={props} className='menu'>
      { children }
    </animated.aside>
  );
}
 
export default MenuContainer;
