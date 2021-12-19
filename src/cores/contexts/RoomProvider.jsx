import { createContext, useReducer } from 'react';

export const SET_USER_INFO = 'room/SET_USER_INFO';
export const SET_INVITE_CODE = 'room/SET_INVITE_CODE';

const initialRoomInfo = {
  inviteCode: '',
  userInfo: {
    nickname: '',
    isHost: false,
  },
};

const roomReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.value,
      };
    case SET_INVITE_CODE:
      return action.value;
    default:
      throw new Error('Failed to dispatch roomInfo');
  }
};

export const RoomState = createContext(initialRoomInfo);
export const RoomDispatch = createContext();

const RoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roomReducer, initialRoomInfo);
  return (
    <RoomState.Provider value={state}>
      <RoomDispatch.Provider value={dispatch}>{children}</RoomDispatch.Provider>
    </RoomState.Provider>
  );
};

export default RoomProvider;