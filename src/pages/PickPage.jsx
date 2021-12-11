import { useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import LogoImg from 'assets/logo.svg';
import PickCartNav from 'components/PickCartNav';
import FoodSelectionCard from 'components/FoodSelectionCard';
import Search from 'assets/search.svg';
import useAPI from 'cores/hooks/useAPI';
import { colors } from 'constants/colors';
import { MEAL_CATEGORIES, COFFEE_CATEGORIES } from 'constants/categories';
import ReactModal from 'react-modal';
import { modalStyles } from 'components/common/WarnModal';
import WarnModal from 'components/common/WarnModal';

const COEAT = 'coeat';
const NOEAT = 'noeat';

function PickPage() {
  const containerRef = useRef(null);
  const location = useLocation();
  const CURRENT_MODE = (location.state && location.state.selectedCard) || 'meal';
  const CATEGORIES = CURRENT_MODE === 'coffee' ? COFFEE_CATEGORIES : MEAL_CATEGORIES;

  const { data, loading } = useAPI({
    method: 'GET',
    url: `/${CURRENT_MODE}`,
  });

  const [selectCtg, setSelectCtg] = useState(CATEGORIES[0]);
  const [coEatList, setCoEatList] = useState([]);
  const [noEatList, setNoEatList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [restrictModal, setRestrictModal] = useState(false);
  const [checkType, setCheckType] = useState('');

  const reduceDataByCategory = useCallback(
    () =>
      data.reduce((acc, cur) => {
        if (!acc[cur.category]) acc[cur.category] = [];
        acc[cur.category].push(cur);
        return acc;
      }, {}),
    [data],
  );

  const isDuplicatedFoodId = (foodId, list) => new Set(list.map((elem) => elem.id)).has(foodId);

  const addFoodToList = (type) => {
    return (foodId, foodName, foodImg) => {
      const list = type === COEAT ? coEatList : noEatList;
      const setter = type === COEAT ? setCoEatList : setNoEatList;

      if (isDuplicatedFoodId(foodId, list)) return;
      setter([...list, { id: foodId, name: foodName, img: foodImg }]);

      if (list.length > 4) {
        setRestrictModal(true);
        setCheckType(list === coEatList ? '코잇' : '노잇');
        setter(list.filter((el, idx) => idx < list.length));
      }
    };
  };

  const toggleModal = () => setIsOpen(!isOpen);

  const handleClick = (e) => {
    setSelectCtg(e.currentTarget.getAttribute('name'));
  };

  const showFoods = () => {
    if (!(data && !loading)) return null;
    const reducedDataByCategory = reduceDataByCategory();

    return Object.entries(reducedDataByCategory).map(([foodCategory, foodInfo]) => (
      <>
        <header id={foodCategory}>{foodCategory}</header>
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
      </>
    ));
  };

  return (
    <StyledContainer ref={containerRef} isOpen={isOpen}>
      <nav>
        <StyledNav>
          <StyledTitle>
            <img src={LogoImg} alt="logo" />
          </StyledTitle>
          <StyledCategories>
            <StyledCategory>
              {CATEGORIES.map((category, idx) => (
                <div
                  onClick={handleClick}
                  name={category}
                  key={idx}
                  className={category === selectCtg ? 'selected' : ''}>
                  <a href={`#${category}`}>{category}</a>
                </div>
              ))}
            </StyledCategory>
            <StyledSearch>
              <input type="text" placeholder="검색하기" />
              <img src={Search} alt="search" />
            </StyledSearch>
          </StyledCategories>
        </StyledNav>
      </nav>
      <section>
        <StyledSection>{showFoods()}</StyledSection>
      </section>
      <PickCartNav
        coEatList={coEatList}
        noEatList={noEatList}
        containerRef={containerRef}
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
      <ReactModal style={modalStyles} isOpen={restrictModal} onRequestClose={() => setRestrictModal(false)}>
        <WarnModal restrictModal={restrictModal} setRestrictModal={setRestrictModal} checkType={checkType} />
      </ReactModal>
    </StyledContainer>
  );
}

export default PickPage;

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: ${(prop) => (prop.isOpen ? 'hidden' : 'auto')};

  & > nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 26rem;
  }

  & > section {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .ctgFoods {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
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

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45.1rem;
  height: 5.6rem;
  background-color: ${colors.gray};
  margin-bottom: 0.9rem;
  border-radius: 1rem;

  & > input {
    background-color: ${colors.gray};
    height: 2.4rem;
    font-size: 2rem;
    border: none;
    outline: none;
    margin-left: 2.9rem;
    color: ${colors.orange};
  }

  & > img {
    width: 2.1rem;
    margin-right: 1.7rem;
  }
`;

const StyledSection = styled.div`
  margin-top: 6rem;
  margin-bottom: 2.1rem;
  width: 120rem;
  font-size: 2.4rem;
  font-weight: 700;

  & > header {
    margin-bottom: 2.1rem;
  }
`;
