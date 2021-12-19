import { RoomDispatch, RoomState, SET_USER_INFO, SET_INVITE_CODE } from 'cores/contexts/RoomProvider';
import { useContext } from 'react';

function useRoomInfo() {
  const roomState = useContext(RoomState);
  const roomDispatch = useContext(RoomDispatch);

  const setInviteCode = (inviteCode) => {
    if (!inviteCode) return;
    roomDispatch({
      type: SET_INVITE_CODE,
      value: inviteCode,
    });
  };

  const setUserInfo = (userInfo) => {
    if (!userInfo) return;
    roomDispatch({
      type: SET_USER_INFO,
      value: userInfo,
    });
  };

  return { roomState, setInviteCode, setUserInfo };
}

export default useRoomInfo;
