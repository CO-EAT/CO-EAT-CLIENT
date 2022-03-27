import styled, { css } from 'styled-components';
import { ReactComponent as Plate } from 'assets/img/plate.svg';
import { colors } from 'constants/colors';
import usePickInfo from 'cores/hooks/usePickInfo';
import { applyMediaQuery } from 'styles/mediaQueries';
import Responsive from './common/Responsive';
import SmallLogo from 'assets/small-logo.svg';

const COEAT = 'COEAT';
const NOEAT = 'NOEAT';

function FoodSelectionCard(props) {
  const { data, addCoEat, addNoEat, imgCallbackRef } = props;
  const { menuName, content, menuImg, id } = data;
  const { coEatList, noEatList } = usePickInfo();

  const getIsCurrentSelected = (type) => {
    const list = type === COEAT ? coEatList : noEatList;
    return Boolean(list.find((food) => food.id === id));
  };

  const handleClickCONOEatBtn = (type, id, name, img) => {
    const addFoodHandler = type === COEAT ? addCoEat : addNoEat;
    return () => addFoodHandler(id, name, img);
  };

  return (
    <StyledCard isCoeat={getIsCurrentSelected(COEAT)} isNoeat={getIsCurrentSelected(NOEAT)}>
      <UpBox>
        <CardWrapper>
          <CardName>{menuName}</CardName>
          <Responsive tablet desktop>
            <CardDesc>{content}</CardDesc>
          </Responsive>
        </CardWrapper>
        <ImageWrapper>
          <Plate />
          <MainDish>
            <img ref={imgCallbackRef} data-lazysrc={menuImg} src={SmallLogo} alt="food-img" />
          </MainDish>
        </ImageWrapper>
      </UpBox>
      <DownBox>
        <InvertedBorder left isCoeat={getIsCurrentSelected(COEAT)} isNoeat={getIsCurrentSelected(NOEAT)} />
        <InvertedBorder right isCoeat={getIsCurrentSelected(COEAT)} isNoeat={getIsCurrentSelected(NOEAT)} />
        <ButtonWrapper>
          <CoEatButton onClick={handleClickCONOEatBtn('COEAT', id, menuName, menuImg)}>COEAT</CoEatButton>
          <NoEatButton onClick={handleClickCONOEatBtn('NOEAT', id, menuName, menuImg)}>NOEAT</NoEatButton>
        </ButtonWrapper>
      </DownBox>
    </StyledCard>
  );
}

const StyledCard = styled.article`
  display: flex;
  flex-direction: column;
  width: 28rem;
  border-radius: 4px;
  background-color: white;
  border: 1px solid ${colors.cardBorder};

  ${(props) =>
    props.isCoeat &&
    css`
      border: 2px solid ${colors.orange};
    `};

  ${(props) =>
    props.isNoeat &&
    css`
      border: 2px solid ${colors.noEatProgress};
    `}

  ${applyMediaQuery('mobile')} {
    width: 100%;
  }
`;

const InvertedBorder = styled.i`
  border: 1px solid ${colors.cardBorder};

  ${(props) =>
    props.isCoeat &&
    css`
      border: 2px solid ${colors.orange};
    `};

  ${(props) =>
    props.isNoeat &&
    css`
      border: 2px solid ${colors.noEatProgress};
    `}

  position: absolute;
  width: 3rem;
  height: 1.5rem;
  ${(props) =>
    props.left
      ? css`
          transform: translate(-25%, -50%) rotate(-90deg);
          border-radius: 0 0 1.5rem 1.5rem;
          border-left: none;
          left: -2px;

          ${applyMediaQuery('mobile')} {
            border-radius: 0 0 10px 10px;
            transform: translate(-35%, -50%) rotate(-90deg);
            border-right: none;
          }
        `
      : css`
          transform: translate(25%, -50%) rotate(-90deg);
          border-radius: 1.5rem 1.5rem 0 0;
          border-right: none;
          right: -2px;
          ${applyMediaQuery('mobile')} {
            border-radius: 10px 10px 0 0;
            transform: translate(35%, -50%) rotate(-90deg);
            border-left: none;
          }
        `};

  background-color: white;
  ${applyMediaQuery('mobile')} {
    background-color: ${colors.lightGray};
    width: 15px;
    height: 15px;
  }
  top: 0;

  &::after {
    content: '';
    background-color: white;
    ${applyMediaQuery('mobile')} {
      background-color: ${colors.lightGray};
    }

    width: 100%;
    height: 4px;
    border-radius: 81px;
    position: absolute;
    ${(props) =>
      props.left
        ? css`
            left: 0;
            transform: translate(0, -100%);
          `
        : css`
            bottom: 0;
            transform: translate(0, 90%);
          `};
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 1.5rem;

  & > svg,
  & > img {
    width: 10rem;
    height: 10rem;
    margin-bottom: 3rem;
  }

  & > *:not(svg) {
    margin-left: 1.5rem;
  }
  ${applyMediaQuery('mobile')} {
    & > *:not(svg) {
      margin-left: 0;
    }

    margin-bottom: 1rem;
  }
`;

const CardName = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 2.8rem;
  line-height: 3.4rem;

  letter-spacing: -0.01rem;

  ${applyMediaQuery('mobile')} {
    font-size: 18px;
    line-height: 22px;
  }
`;

const CardDesc = styled.p`
  font-size: 2rem;
  line-height: 2.4rem;

  height: 5rem;
  letter-spacing: -0.01rem;
  color: #5b5b5b;
  font-weight: lighter;

  ${applyMediaQuery('mobile')} {
    color: ${colors.noEatProgress};
    font-size: 13px;
  }
`;

const UpBox = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 1px dashed ${colors.cardBorder};

  ${applyMediaQuery('mobile')} {
    border-bottom: unset;
  }
`;
const DownBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  position: relative;
  padding-top: calc(15rem + 2rem);
  width: 100%;

  display: flex;
  justify-content: center;
  margin: 0 auto;

  & > svg {
    position: absolute;
    top: 0;
  }

  ${applyMediaQuery('mobile')} {
    padding-top: 85px;
  }
  ${applyMediaQuery('mobile')} {
    padding-top: 85px;
    margin-bottom: 24px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: center;

  padding: 2rem;

  ${applyMediaQuery('mobile')} {
    height: 49px;
    padding: unset;
    gap: unset;

    overflow: hidden;
  }
`;

const BasicButton = styled.button`
  flex: 1;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.6rem;
  line-height: 2rem;
  letter-spacing: -0.01rem;
  padding: 1rem 1rem;
  border: none;

  &:hover {
    transform: scale(1.1);
  }

  ${applyMediaQuery('mobile')} {
    height: 100%;
    padding: 17px 15px;
    font-size: 13px;
    line-height: 16px;
    margin: 0;

    &:hover {
      transform: unset;
    }
  }

  ${applyMediaQuery('mini')} {
    padding: 1rem 1rem;
  }
`;

const CoEatButton = styled(BasicButton)`
  background-color: ${colors.lightOrange};
  color: ${colors.orange};
`;
const NoEatButton = styled(BasicButton)`
  background-color: ${colors.gray};
  color: ${colors.darkGray};
`;

export const MainDish = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  & > img {
    border-radius: 50%;
    overflow: hidden;
    width: 15rem;
    height: 15rem;
    position: absolute;
    top: -5px;
    left: 55%;
    transform: translate(-50%, 0);
    object-fit: cover;

    ${applyMediaQuery('mobile')} {
      width: 12rem;
      height: 12rem;
      top: -15px;
    }

    ${applyMediaQuery('mini')} {
      width: 10rem;
      height: 10rem;
    }
  }

  & > img.loaded {
    width: 130%;
    height: 100%;
  }
`;

export default FoodSelectionCard;
