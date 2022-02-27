import { createContext, useReducer } from 'react';

export const ADD_COEAT = 'pick/ADD_COEAT';
export const REMOVE_COEAT = 'pick/REMOVE_COEAT';

export const ADD_NOEAT = 'pick/ADD_NOEAT';
export const REMOVE_NOEAT = 'pick/REMOVE_NOEAT';

const initialPickInfo = {
  coEatList: [],
  noEatList: [],
};

const pickReducer = (state, action) => {
  switch (action.type) {
    case ADD_COEAT:
      return {
        ...state,
        coEatList: [...state.coEatList, action.value],
        noEatList: state.noEatList.filter((noEat) => noEat.id !== action.value.id),
      };
    case REMOVE_COEAT:
      return {
        ...state,
        coEatList: state.coEatList.filter((coEat) => coEat.id !== action.value.id),
      };
    case ADD_NOEAT:
      return {
        ...state,
        noEatList: [...state.noEatList, action.value],
        coEatList: state.coEatList.filter((coEat) => coEat.id !== action.value.id),
      };
    case REMOVE_NOEAT:
      return {
        ...state,
        noEatList: state.noEatList.filter((noEat) => noEat.id !== action.value.id),
      };
    default:
      throw new Error('Failed to dispatch PickInfo');
  }
};

export const PickStateContext = createContext(initialPickInfo);
export const PickDispatchContext = createContext();

const PickProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pickReducer, initialPickInfo);
  return (
    <PickStateContext.Provider value={state}>
      <PickDispatchContext.Provider value={dispatch}>{children}</PickDispatchContext.Provider>
    </PickStateContext.Provider>
  );
};

export default PickProvider;
