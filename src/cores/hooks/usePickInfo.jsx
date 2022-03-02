import {
  ADD_COEAT,
  ADD_NOEAT,
  PickDispatchContext,
  PickStateContext,
  REMOVE_COEAT,
  REMOVE_NOEAT,
} from 'cores/contexts/PickProvider';
import { useContext } from 'react';

const createFoodInfo = (foodId, foodName, foodImg) => ({
  id: foodId,
  name: foodName,
  img: foodImg,
});

function usePickInfo() {
  const pickStateContext = useContext(PickStateContext);
  const pickDispatchContext = useContext(PickDispatchContext);

  const { coEatList, noEatList } = pickStateContext;

  const handleCoeat = (foodId, foodName, foodImg) => {
    const coEatFoodInfo = createFoodInfo(foodId, foodName, foodImg);
    if (coEatList.find((coEat) => coEat.id === foodId)) {
      pickDispatchContext({
        type: REMOVE_COEAT,
        value: coEatFoodInfo,
      });
    } else {
      pickDispatchContext({
        type: ADD_COEAT,
        value: coEatFoodInfo,
      });
    }
  };

  const handleNoeat = (foodId, foodName, foodImg) => {
    const noEatFoodInfo = createFoodInfo(foodId, foodName, foodImg);
    if (noEatList.find((noEat) => noEat.id === foodId)) {
      pickDispatchContext({
        type: REMOVE_NOEAT,
        value: noEatFoodInfo,
      });
    } else {
      pickDispatchContext({
        type: ADD_NOEAT,
        value: noEatFoodInfo,
      });
    }
  };

  return { coEatList, noEatList, handleCoeat, handleNoeat };
}

export default usePickInfo;
