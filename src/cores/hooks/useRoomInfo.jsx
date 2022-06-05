import { RoomDispatchContext, RoomStateContext, SET_USER_INFO, SET_INVITE_CODE } from 'cores/contexts/RoomProvider';
import { useContext, useEffect } from 'react';

const ROOM_INFO = 'roomInfo';
const INVITE_CODE = 'inviteCode';
const USER_INFO = 'userInfo';

const setDataTosessionStorage = (key, val) => {
  if (!window) return;

  const ls = window.sessionStorage;
  const prevItem = ls.getItem(ROOM_INFO);
  if (prevItem) {
    ls.setItem(
      ROOM_INFO,
      JSON.stringify({
        ...JSON.parse(prevItem),
        [key]: val,
      }),
    );
  } else {
    ls.setItem(ROOM_INFO, JSON.stringify({ [key]: val }));
  }
};

function useRoomInfo() {
  const roomStateContext = useContext(RoomStateContext);
  const roomDispatchContext = useContext(RoomDispatchContext);

  const setInviteCode = (inviteCode) => {
    if (!inviteCode) return;
    roomDispatchContext({
      type: SET_INVITE_CODE,
      value: inviteCode,
    });

    setDataTosessionStorage(INVITE_CODE, inviteCode);
  };

  const setUserInfo = (userInfo) => {
    if (!userInfo) return;
    roomDispatchContext({
      type: SET_USER_INFO,
      value: userInfo,
    });

    setDataTosessionStorage(USER_INFO, userInfo);
  };

  const cleanRoomInfo = () => {
    if (window) window.sessionStorage.clear();
  };

  useEffect(() => {
    if (window) {
      const ls = window.sessionStorage;
      const prevRoomInfo = ls.getItem(ROOM_INFO);
      if (!prevRoomInfo) return;

      const roomInfo = JSON.parse(prevRoomInfo);
      if ('inviteCode' in roomInfo && 'userInfo' in roomInfo) {
        const { inviteCode, userInfo } = roomInfo;
        setInviteCode(inviteCode);
        setUserInfo(userInfo);
      }
    }
  }, []);

  return { roomStateContext, setInviteCode, setUserInfo, cleanRoomInfo };
}

export default useRoomInfo;
