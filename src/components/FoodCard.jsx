import styled, { css } from 'styled-components';

import { ReactComponent as Coffee } from 'assets/img/coffee.svg';
import { ReactComponent as Meal } from 'assets/img/meal.svg';

function FoodCard(props) {
  const { type, selectedCard, setSelectedCard } = props; // types = 'coffee' or 'meal'
  const handleCheck = (e) => {
    if (e.target.selected) {
      setSelectedCard('');
    } else setSelectedCard(type);
  };

  return (
    <StyledMenuSelection selected={selectedCard === type}>
      <LeftBox>
        <CardWrapper>
          {type === 'coffee' ? <Coffee /> : <Meal />}
          <CardType>{type === 'coffee' ? '커피' : '식사'} </CardType>
          <CardDesc>
            <b>뭐뭐</b>때문에 <br />
            <b>눈치보인다면?</b>
          </CardDesc>
        </CardWrapper>
      </LeftBox>
      <RightBox>
        <InvertedBorder selected={selectedCard === type} top />
        <InvertedBorder selected={selectedCard === type} bottom />
        <CustomRadio name="food" type="radio" onChange={handleCheck} selected={selectedCard === type} />
      </RightBox>
    </StyledMenuSelection>
  );
}

const StyledMenuSelection = styled.article`
  margin: 10rem;
  display: flex;
  width: 35rem;
  height: 35rem;
  border-radius: 8px;
  background-color: white;
  ${(props) =>
    props.selected
      ? css`
          border: 3px solid orange;
        `
      : css`
          border: 1px solid #dddddd;
        `};
`;

const InvertedBorder = styled.i`
  ${(props) =>
    props.selected
      ? css`
          border: 3px solid orange;
        `
      : css`
          border: 1px solid #dddddd;
        `};
  position: absolute;
  width: 3rem;
  height: 1.5rem;
  transform: translateX(-50%);
  ${(props) =>
    props.bottom
      ? css`
          border-radius: 1.5rem 1.5rem 0 0;
          border-bottom: none;
          bottom: 0;
        `
      : css`
          border-radius: 0 0 1.5rem 1.5rem;
          top: 0;
          border-top: none;
        `};

  background-color: white;
  left: 0;

  &::after {
    content: '';
    background-color: white;
    width: 100%;
    ${(props) =>
      props.selected
        ? css`
            height: 6px;
          `
        : css`
            height: 3px;
          `};
    position: absolute;
    ${(props) =>
      props.bottom
        ? css`
            bottom: 0;
            transform: translateY(50%);
          `
        : css`
            top: 0;
            transform: translateY(-50%);
          `};
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;

  & > svg {
    width: 10rem;
    height: 10rem;
    margin-bottom: 3rem;
  }
`;

const CardType = styled.h3`
  background-color: black;
  color: white;
  width: fit-content;
  padding: 0.5rem;
  margin-bottom: 2rem;

  font-size: 1.8rem;
  line-height: 2.16rem;
  letter-spacing: -1%;
  font-weight: 500;

  &:before {
    content: '# ';
  }
`;

const CardDesc = styled.p`
  font-size: 2.6rem;
  line-height: 145%;
  letter-spacing: -0.01rem;
  & b {
    font-weight: bolder;
  }
`;

const LeftBox = styled.div`
  flex: 5;
  display: flex;
  justify-content: flex-start;

  border-right: 1px dashed #dddddd;
`;
const RightBox = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomRadio = styled.input``;

export default FoodCard;
