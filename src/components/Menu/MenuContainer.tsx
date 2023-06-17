import { useTransition, animated } from '@react-spring/web';

interface MenuContainerProps {
  isShow: boolean;
  children: React.ReactNode;
}

const MenuContainer = ({ isShow, children }: MenuContainerProps) => {
  const menuTransitions = useTransition(isShow, {
    from: { transform: 'translateX(-100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { tension: 360, friction: 42 },
  });

  return menuTransitions((style, item) => item && (
    <animated.aside style={style} className='menu'>
      { children }
    </animated.aside>
  ));
}

export default MenuContainer;
