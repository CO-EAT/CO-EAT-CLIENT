import { deviceInfo } from 'constants/deviceInfo';

const { mini, mobile, tablet, desktop } = deviceInfo;

const deviceMediaQuery = {
  mini: `screen and ${mini}`,
  mobile: `screen and ${mobile}`,
  tablet: `screen and ${tablet}`,
  desktop: `screen and ${desktop}`,
};

export const applyMediaQuery = (device) => `@media ${deviceMediaQuery[device]}`;

const media = {
  device: deviceMediaQuery,
};

export default media;
