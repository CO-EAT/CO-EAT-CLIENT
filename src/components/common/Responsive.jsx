import useMedia from 'cores/hooks/useMedia';

function Responsive(props) {
  const { children, mobile, tablet, desktop } = props;
  const { isMobile, isTablet, isDesktop } = useMedia();

  let shouldRender = false;

  if (mobile) shouldRender = shouldRender || isMobile;
  if (tablet) shouldRender = shouldRender || isTablet;
  if (desktop) shouldRender = shouldRender || isDesktop;

  return <>{shouldRender && children}</>;
}

export default Responsive;
