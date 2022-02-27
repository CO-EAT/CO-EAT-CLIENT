import { useState, useRef, useMemo, Fragment } from 'react';
import styled from 'styled-components';
import LogoImg from 'assets/logo.svg';
import Loader from 'components/common/Loader';
import PickCartNav from 'components/PickCartNav';
import FoodSelectionCard from 'components/FoodSelectionCard';
import useAPI from 'cores/hooks/useAPI';
import useRoomInfo from 'cores/hooks/useRoomInfo';
import { postMenuSelection } from 'libs/api';
import { colors } from 'constants/colors';
import { MEAL_CATEGORIES } from 'constants/categories';
import ReactModal from 'react-modal';
import Modal, { modalStyles } from 'components/common/Modal';
import WarnMaxItem from 'components/common/Modal/WarnMaxItem';
import WarnMinItem from 'components/common/Modal/WarnMinItem';
import { useNavigate } from 'react-router-dom';
import usePickInfo from 'cores/hooks/usePickInfo';

const COEAT = 'COEAT';
const NOEAT = 'NOEAT';

function PickPage() {
  const { roomStateContext } = useRoomInfo();
  const containerRef = useRef(null);
  const navigator = useNavigate();
  const { data, loading } = useAPI({
    method: 'GET',
    url: `/menu`,
  });

  const [selectCtg, setSelectCtg] = useState(MEAL_CATEGORIES[0]);
  const { coEatList, noEatList, handleCoeat, handleNoeat } = usePickInfo();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [restrictModal, setRestrictModal] = useState({
    min: false,
    max: false,
  });
  const [checkType, setCheckType] = useState('');

  const categoryPriorityMap = {
    한식: 0,
    중식: 1,
    일식: 2,
    양식: 3,
    분식: 4,
    기타: 5,
  };

  const sortByPriority = (reducedData) => {
    const sortedData = Object.entries(reducedData).sort(
      (a, b) => categoryPriorityMap[a[0]] - categoryPriorityMap[b[0]],
    );

    return Object.fromEntries(sortedData);
  };

  const reduceDataByCategory = useMemo(() => {
    if (!data) return {};
    return sortByPriority(
      data.reduce((acc, cur) => {
        if (!acc[cur.category]) acc[cur.category] = [];
        acc[cur.category].push(cur);
        return acc;
      }, {}),
    );
  }, [data]);

  const addFoodToList = (type) => {
    return (foodId, foodName, foodImg) => {
      const foodHandler = type === COEAT ? handleCoeat : handleNoeat;
      const list = type === COEAT ? coEatList : noEatList;

      if (list.length >= 5) {
        setRestrictModal((prev) => ({
          ...prev,
          max: true,
        }));
        setCheckType(list === coEatList ? '코잇' : '노잇');
        return;
      }
      foodHandler(foodId, foodName, foodImg);
    };
  };

  const toggleModal = () => setIsCartOpen(!isCartOpen);
  const closeWarnModal = () =>
    setRestrictModal({
      min: false,
      max: false,
    });

  const handleClick = (e) => {
    setSelectCtg(e.currentTarget.getAttribute('name'));
  };

  const showFoods = () => {
    if (!(data && !loading)) return null;

    return Object.entries(reduceDataByCategory).map(([foodCategory, foodInfo]) => (
      <Fragment key={foodCategory}>
        <span id={foodCategory} className="toBeScroll" />
        <header>{foodCategory}</header>
        <div className="ctgFoods">
          {foodInfo.map((food) => (
            <FoodSelectionCard
              key={food.id}
              addCoEat={addFoodToList(COEAT)}
              addNoEat={addFoodToList(NOEAT)}
              data={food}
            />
          ))}
        </div>
      </Fragment>
    ));
  };

  const getIdArrayFromEatList = (list) => list.map((li) => li.id);
  const submitCompleteCoeat = async () => {
    if (!coEatList.length) {
      setRestrictModal((prev) => ({
        ...prev,
        min: true,
      }));

      return;
    }
    const { inviteCode, userInfo } = roomStateContext;
    const { nickname } = userInfo;
    const isSuccess = await postMenuSelection(
      { inviteCode, nickname },
      getIdArrayFromEatList(coEatList),
      getIdArrayFromEatList(noEatList),
    );
    if (isSuccess) navigator('/result');
  };

  return (
    <StyledContainer ref={containerRef} isCartOpen={isCartOpen}>
      <nav>
        <StyledNav>
          <StyledTitle>
            <img src={LogoImg} alt="logo" />
          </StyledTitle>
          <StyledCategories>
            <StyledCategory>
              {MEAL_CATEGORIES.map((category, idx) => (
                <div
                  onClick={handleClick}
                  name={category}
                  key={idx}
                  className={category === selectCtg ? 'selected' : ''}>
                  <a href={`#${category}`}>{category}</a>
                </div>
              ))}
            </StyledCategory>
            <StyledResultBtn onClick={submitCompleteCoeat}>완료하기</StyledResultBtn>
          </StyledCategories>
        </StyledNav>
      </nav>
      {loading && <Loader overlay />}
      <section>
        <StyledSection>{showFoods()}</StyledSection>
      </section>
      <PickCartNav isCartOpen={isCartOpen} toggleModal={toggleModal} />
      <ReactModal
        style={modalStyles}
        isOpen={restrictModal.min || restrictModal.max}
        onRequestClose={() => setRestrictModal(false)}>
        <Modal>
          {restrictModal.max ? (
            <WarnMaxItem closeWarnModal={closeWarnModal} checkType={checkType} />
          ) : (
            <WarnMinItem closeWarnModal={closeWarnModal} />
          )}
        </Modal>
      </ReactModal>
    </StyledContainer>
  );
}

export default PickPage;

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: ${(prop) => (prop.isCartOpen ? 'hidden' : 'auto')};
  scroll-behavior: smooth;

  & > nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 26rem;

    position: sticky;
    z-index: 1004;
    top: 0;
    background-color: white;
  }

  & > section {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .ctgFoods {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.65rem;
    margin-bottom: 10%;
  }
`;

const StyledNav = styled.div`
  width: 120rem;
  height: 100%;
`;

const StyledTitle = styled.div`
  margin-top: 4rem;
  padding: 6.3rem 0;

  & > img {
    width: 10.9rem;
    height: 3.7rem;
  }
`;
const StyledCategories = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid ${colors.gray};
  background-color: white;
`;

const StyledCategory = styled.div`
  display: flex;
  width: 100%;

  & > div {
    color: #989898;
    font-size: 2.8rem;
    margin-right: 4.6rem;
    padding-bottom: 0.9rem;
    border-bottom: 0.5rem solid ${colors.white};
  }

  & > div.selected {
    border-bottom: 0.5rem solid ${colors.orange};
    color: ${colors.orange};
    font-weight: 700;
  }

  & > div > a {
    text-decoration: none;
    color: inherit;
  }

  & > div:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const StyledResultBtn = styled.button`
  border: 0;
  outline: 0;
  background-color: #ff7a00;
  width: 19.4rem;
  height: 6.4rem;
  font-size: 2.2rem;
  font-weight: bolder;
  color: white;
`;

const StyledSection = styled.div`
  min-height: calc(100vh - 26rem - 9.2rem - 1.5rem);
  margin-top: 6rem;
  margin-bottom: 2.1rem;
  width: 120rem;
  font-size: 2.4rem;
  font-weight: 700;

  & > header {
    margin-bottom: 2.1rem;
  }

  & .toBeScroll {
    display: block;
    height: calc(26rem + 2.4rem);
    margin-top: calc(-26rem - 2.4rem);
    visibility: hidden;
  }
`;
