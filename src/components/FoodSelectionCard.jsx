import { useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Plate } from 'assets/img/plate.svg';
import { colors } from 'constants/colors';

const COEAT = 'COEAT';

function FoodSelectionCard(props) {
  const { data, addCoEat, addNoEat } = props;
  const { menuName, content, menuImg, id } = data;

  const [isCoeat, setIsCoeat] = useState(false);
  const [isNoeat, setIsNoeat] = useState(false);

  const handleClickCONOEatBtn = (type, id, name, img) => {
    const getIsClickable = type === COEAT ? addCoEat : addNoEat;
    const onClickCONOEatBtn = type === COEAT ? setIsCoeat : setIsNoeat;
    return () => {
      if (getIsClickable(id, name, img)) {
        onClickCONOEatBtn((prev) => !prev);
      }
    };
  };

  return (
    <StyledCard isCoeat={isCoeat} isNoeat={isNoeat}>
      <UpBox>
        <CardWrapper>
          <CardName>{menuName}</CardName>
          <CardDesc>{content}</CardDesc>
        </CardWrapper>
        <ImageWrapper>
          <Plate />
          <MainDish>
            <img src={menuImg} alt="food-img" />
          </MainDish>
        </ImageWrapper>
      </UpBox>
      <DownBox>
        <InvertedBorder left isCoeat={isCoeat} isNoeat={isNoeat} />
        <InvertedBorder right isCoeat={isCoeat} isNoeat={isNoeat} />
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
  border-radius: 8px;
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
        `
      : css`
          transform: translate(25%, -50%) rotate(-90deg);
          border-radius: 1.5rem 1.5rem 0 0;
          border-right: none;
          right: -2px;
        `};

  background-color: white;
  top: 0;

  &::after {
    content: '';
    background-color: white;
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
`;

const CardName = styled.h2`
  font-family: Pretendard Variable;
  font-style: normal;
  font-weight: bold;
  font-size: 2.8rem;
  line-height: 3.4rem;

  letter-spacing: -0.01rem;
`;

const CardDesc = styled.p`
  font-size: 2rem;
  line-height: 2.4rem;
  letter-spacing: -0.01rem;
  color: #5b5b5b;
  font-weight: lighter;
`;

const UpBox = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 1px dashed ${colors.cardBorder};
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
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: center;

  padding: 2rem;
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

  & > img {
    border-radius: 50%;
    overflow: hidden;
    width: 15rem;
    height: 15rem;
    position: absolute;
    top: 0;
    left: 55%;
    transform: translate(-50%, 0);
  }
`;

export default FoodSelectionCard;
