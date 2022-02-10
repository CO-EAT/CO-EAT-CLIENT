import { RoomDispatchContext, RoomStateContext, SET_USER_INFO, SET_INVITE_CODE } from 'cores/contexts/RoomProvider';
import { useContext, useEffect } from 'react';

const ROOM_INFO = 'roomInfo';
const INVITE_CODE = 'inviteCode';
const USER_INFO = 'userInfo';

const setDataToSessionStorage = (key, val) => {
  if (!window) return;

  const ss = window.sessionStorage;
  const prevItem = ss.getItem(ROOM_INFO);
  if (prevItem) {
    ss.setItem(
      ROOM_INFO,
      JSON.stringify({
        ...JSON.parse(prevItem),
        [key]: val,
      }),
    );
  } else {
    ss.setItem(ROOM_INFO, JSON.stringify({ [key]: val }));
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

    setDataToSessionStorage(INVITE_CODE, inviteCode);
  };

  const setUserInfo = (userInfo) => {
    if (!userInfo) return;
    roomDispatchContext({
      type: SET_USER_INFO,
      value: userInfo,
    });

    setDataToSessionStorage(USER_INFO, userInfo);
  };

  useEffect(() => {
    if (window) {
      const ss = window.sessionStorage;
      const prevRoomInfo = ss.getItem(ROOM_INFO);
      if (!prevRoomInfo) return;

      const roomInfo = JSON.parse(prevRoomInfo);
      if ('inviteCode' in roomInfo && 'userInfo' in roomInfo) {
        const { inviteCode, userInfo } = roomInfo;
        setInviteCode(inviteCode);
        setUserInfo(userInfo);
      }
    }
  }, []);

  return { roomStateContext, setInviteCode, setUserInfo };
}

export default useRoomInfo;
