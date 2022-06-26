import { useState, useRef, useMemo, Fragment, useEffect } from 'react';
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
import Modal, { mobileModalStyles, modalStyles } from 'components/common/Modal';
import WarnMaxItem from 'components/common/Modal/WarnMaxItem';
import WarnMinItem from 'components/common/Modal/WarnMinItem';
import { useNavigate } from 'react-router-dom';
import usePickInfo from 'cores/hooks/usePickInfo';
import Responsive from 'components/common/Responsive';
import { LogoWrapper } from './ResultPage';
import Logo from 'assets/logo.svg';
import SmallLogo from 'assets/small-logo.svg';
import { applyMediaQuery } from 'styles/mediaQueries';
import useMedia from 'cores/hooks/useMedia';
import MobilePickCartModal from 'components/PickCartNav.mobile';

const COEAT = 'COEAT';
const NOEAT = 'NOEAT';

function PickPage() {
  const { isMobile } = useMedia();
  const { roomStateContext, cleanRoomInfo } = useRoomInfo();
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const navigator = useNavigate();
  const { data, loading } = useAPI({
    method: 'GET',
    url: `/menu`,
  });

  const [selectCtg, setSelectCtg] = useState(MEAL_CATEGORIES[0]);
  const { coEatList, noEatList, handleCoeat, handleNoeat, initializePickList } = usePickInfo();

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

      if (list.length >= 5 && list.every((foodInfo) => foodInfo.id !== foodId)) {
        setRestrictModal((prev) => ({
          ...prev,
          max: true,
        }));
        setCheckType(list === coEatList ? '코잇' : '노잇');
      } else {
        foodHandler(foodId, foodName, foodImg);
      }
    };
  };

  const toggleModal = () => setIsCartOpen(!isCartOpen);
  const closeWarnModal = () =>
    setRestrictModal({
      min: false,
      max: false,
    });

  const handleClickHashAnchor = (e) => {
    setSelectCtg(e.currentTarget.getAttribute('name'));
  };

  const showFoods = () => {
    if (!(data && !loading)) return null;

    return Object.entries(reduceDataByCategory).map(([foodCategory, foodInfo]) => (
      <Fragment key={foodCategory}>
        <span id={foodCategory} className="toBeScroll" />
        <header>{foodCategory}</header>
        <div className="ctgFoods" data-food-category={foodCategory} ref={observeElement}>
          {foodInfo.map((food) => (
            <FoodSelectionWrapper key={food.id}>
              <FoodSelectionCard
                addCoEat={addFoodToList(COEAT)}
                addNoEat={addFoodToList(NOEAT)}
                data={food}
                imgCallbackRef={observeElement}
              />
            </FoodSelectionWrapper>
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
    if (isSuccess) navigator('/share');
  };

  const CurrentCartNav = isMobile ? MobilePickCartModal : PickCartNav;

  const observeElement = (refElement) => {
    if (refElement && observerRef.current) {
      observerRef.current.observe(refElement);
    }
  };

  const handleImageIntersection = (entry) => {
    const LOADED = 'loaded';
    if (!entry.target.classList.contains(LOADED)) {
      entry.target.src = entry.target.dataset.lazysrc;
      entry.target.addEventListener('load', function detectLoad(e) {
        e.currentTarget.classList.add(LOADED);
        e.currentTarget.removeEventListener('load', detectLoad);
      });
    }
  };

  const handleHashAnchorIntersection = (entry) => {
    if (entry.isIntersecting) {
      const targetDataset = entry.target?.dataset;
      if (targetDataset) {
        const { foodCategory } = targetDataset;
        if (foodCategory) {
          setSelectCtg(foodCategory);
          navigator(`/pick#${foodCategory}`, { replace: true });
        }
      }
    }
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.target.classList.contains('ctgFoods')) {
        handleHashAnchorIntersection(entry);
      }
      if (entry.isIntersecting && entry.target instanceof HTMLImageElement) handleImageIntersection(entry);
    });
  };

  const handleLogoClick = () => {
    cleanRoomInfo();
    initializePickList();
    navigator('/');
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });
    return () => {
      initializePickList();
      observerRef.current.disconnect();
    };
  }, []);

  return (
    <StyledContainer ref={containerRef} isCartOpen={isCartOpen}>
      <nav>
        <StyledNav>
          <Responsive mobile>
            <LogoWrapper>
              <img src={Logo} className="main-logo" alt="logo" onClick={handleLogoClick} />

              <div>
                <img src={SmallLogo} className="small-logo" alt="small-logo" />
                {roomStateContext && <span>{roomStateContext.userInfo.nickname}님</span>}
              </div>
            </LogoWrapper>
          </Responsive>
          <Responsive tablet desktop>
            <StyledTitle>
              <img src={LogoImg} alt="logo" onClick={handleLogoClick} />
            </StyledTitle>
          </Responsive>
          <StyledCategories isCartOpen={isCartOpen}>
            {!(isMobile && isCartOpen) && (
              <StyledCategory>
                {MEAL_CATEGORIES.map((category, idx) => (
                  <div
                    onClick={handleClickHashAnchor}
                    name={category}
                    key={idx}
                    className={category === selectCtg ? 'selected' : ''}>
                    <a href={`#${category}`}>{category}</a>
                  </div>
                ))}
              </StyledCategory>
            )}
            {!isMobile && <StyledResultBtn onClick={submitCompleteCoeat}>완료하기</StyledResultBtn>}
          </StyledCategories>
        </StyledNav>
      </nav>
      {loading && <Loader overlay />}
      <section>
        <StyledSection>{showFoods()}</StyledSection>
      </section>
      <CurrentCartNav isCartOpen={isCartOpen} toggleModal={toggleModal} submitCompleteCoeat={submitCompleteCoeat} />
      <ReactModal
        style={isMobile ? mobileModalStyles : modalStyles}
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

  ${applyMediaQuery('mobile')} {
    & > nav {
      width: 100%;
      padding: 10% 5% 0% 5%;
      height: unset;
    }

    & > section {
      background-color: ${colors.lightGray};
      padding: 15px;
    }

    .ctgFoods {
      width: 100%;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px 12px;
    }
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

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;
const StyledCategories = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid ${colors.gray};
  background-color: white;

  ${applyMediaQuery('mobile')} {
    position: relative;
    margin-top: 31px;
    border-bottom: unset;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100vw;
      background-color: ${(props) => (props.isCartOpen ? 'white' : colors.gray)};
      height: 1px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
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

  ${applyMediaQuery('mobile')} {
    & > div {
      font-size: 16px;
      line-height: 19px;
      letter-spacing: -0.01rem;

      color: ${colors.lighterGray};

      margin-right: 15px;
    }

    & > div.selected {
      border-bottom: 0.5rem solid ${colors.orange};
    }

    & > div:hover {
      transform: unset;
    }
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

  ${applyMediaQuery('mobile')} {
    margin-top: 0;
  }
`;

const FoodSelectionWrapper = styled.div`
  width: 100%;
  min-height: calc(223px + 2px);

  display: flex;
  justify-content: center;
  align-items: center;
`;
