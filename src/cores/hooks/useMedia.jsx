import { deviceInfo } from 'constants/deviceInfo';
import { useMediaQuery } from 'react-responsive';

function useMedia() {
  const isMobile = useMediaQuery({
    query: deviceInfo.mobile,
  });

  const isMini = useMediaQuery({
    query: deviceInfo.mini,
  });

  const isTablet = useMediaQuery({
    query: deviceInfo.tablet,
  });

  const isDesktop = useMediaQuery({
    query: deviceInfo.desktop,
  });

  return { isMobile, isTablet, isDesktop, isMini };
}

export default useMedia;
