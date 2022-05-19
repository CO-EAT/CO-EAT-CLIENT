import { deviceInfo } from 'constants/deviceInfo';

export const applyMediaQuery = (...deviceList) =>
  '@media screen and ' + deviceList.map((device) => deviceInfo[device]).join(',');

const media = {
  device: deviceInfo,
};

export default media;
