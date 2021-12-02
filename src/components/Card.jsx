import styled, { css } from 'styled-components';
import { ReactComponent as Plate } from 'assets/img/plate.svg';
import { colors } from 'constants/colors';

function Card(props) {
  const { data, setCoEatList, setNoEatList } = props;
  return (
    <StyledCard>
      <UpBox>
        <CardWrapper>
          <CardName>{data.drinkName}</CardName>
          <CardDesc>{data.content}</CardDesc>
        </CardWrapper>
        <ImageWrapper>
          <Plate />
          <MainDish>
            <img src={`${process.env.PUBLIC_URL}/${data.drinkImg}`} alt="drink-img" />
          </MainDish>
        </ImageWrapper>
      </UpBox>
      <DownBox>
        <InvertedBorder left />
        <InvertedBorder right />
        <ButtonWrapper>
          <CoEatButton
            onClick={() => {
              setCoEatList((list) => ({ ...list, [data.id]: (list[data.id] || 0) + 1 }));
            }}>
            COEAT
          </CoEatButton>
          <NoEatButton
            onClick={() => {
              setNoEatList((list) => ({ ...list, [data.id]: (list[data.id] || 0) + 1 }));
            }}>
            NOEAT
          </NoEatButton>
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
`;

const InvertedBorder = styled.i`
  border: 1px solid ${colors.cardBorder};
  position: absolute;
  width: 3rem;
  height: 1.5rem;
  ${(props) =>
    props.left
      ? css`
          transform: translate(-25%, -50%) rotate(-90deg);
          border-radius: 0 0 1.5rem 1.5rem;
          border-left: none;
          left: -1px;
        `
      : css`
          transform: translate(25%, -50%) rotate(-90deg);
          border-radius: 1.5rem 1.5rem 0 0;
          border-right: none;
          right: -1px;
        `};

  background-color: white;
  top: 0;

  &::after {
    content: '';
    background-color: white;
    width: 100%;
    height: 3px;
    position: absolute;
    ${(props) =>
      props.left
        ? css`
            left: 0;
            transform: translate(0, -75%);
          `
        : css`
            bottom: -2px;
            transform: translateY(0, 75%);
          `};
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  & b {
    font-weight: bolder;
  }
`;

const UpBox = styled.div`
  flex: 5;
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

const ImageWrapper = styled.div`
  position: relative;
  padding-top: 14rem;
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
  background-color: ${colors.orange};
  color: ${colors.white};
`;
const NoEatButton = styled(BasicButton)`
  background-color: ${colors.gray};
  color: ${colors.darkGray};
`;

const MainDish = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;

  & > img {
    max-width: 100%;
    max-height: 14rem;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
  }
`;

export default Card;
