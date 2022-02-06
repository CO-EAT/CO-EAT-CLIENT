import { RoomDispatchContext, RoomStateContext, SET_USER_INFO, SET_INVITE_CODE } from 'cores/contexts/RoomProvider';
import { useContext } from 'react';

function useRoomInfo() {
  const roomStateContext = useContext(RoomStateContext);
  const roomDispatchContext = useContext(RoomDispatchContext);

  const setInviteCode = (inviteCode) => {
    if (!inviteCode) return;
    roomDispatchContext({
      type: SET_INVITE_CODE,
      value: inviteCode,
    });
  };

  const setUserInfo = (userInfo) => {
    if (!userInfo) return;
    roomDispatchContext({
      type: SET_USER_INFO,
      value: userInfo,
    });
  };

  return { roomStateContext, setInviteCode, setUserInfo };
}

export default useRoomInfo;
