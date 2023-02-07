import { useTransition, animated } from '@react-spring/web';

const MenuContainer = props => {

  const {
    isShow,
    animationConfig = { tension: 360, friction: 42 },
    children
  } = props;

  const menuTransitions = useTransition(isShow, {
    from: { transform: 'translateX(-100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: animationConfig
  });

  return menuTransitions((style, item) => item && (
    <animated.aside style={style} className='menu'>
      { children }
    </animated.aside>
  ));
}

export default MenuContainer;
