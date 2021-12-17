import styled, { css } from 'styled-components';
import { ReactComponent as Plate } from 'assets/img/plate.svg';
import { colors } from 'constants/colors';

function ResultCard(props) {
  const { coEatCount = 22, noEatCount = 6, imgSrc, foodName } = props;

  const calcCoEatRatio = () => (coEatCount / (coEatCount + noEatCount)) * 100;

  return (
    <StyledCard>
      <UpBox>
        <CardWrapper>
          <CardName>{foodName}</CardName>
        </CardWrapper>
        <ImageWrapper>
          <Plate />
          <MainDish>
            <img src={`${process.env.PUBLIC_URL}/${imgSrc}`} alt="food-img" />
          </MainDish>
        </ImageWrapper>
      </UpBox>
      <DownBox>
        <InvertedBorder left />
        <InvertedBorder right />
        <CONOResult>
          <span>{`COEAT ${coEatCount}`}</span>
          <span>{`NOEAT ${noEatCount}`}</span>
        </CONOResult>
        <CONOProgress coEatRatio={calcCoEatRatio(coEatCount, noEatCount)} />
      </DownBox>
    </StyledCard>
  );
}

const StyledCard = styled.article`
  display: flex;
  flex-direction: column;
  width: 30rem;
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

  margin-bottom: 2rem;

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

const UpBox = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 1px dashed ${colors.cardBorder};
  padding-top: 1rem;
`;
const DownBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 3rem;
`;

export const ImageWrapper = styled.div`
  position: relative;
  padding-top: calc(13.5rem + 2rem);
  width: 100%;

  display: flex;
  justify-content: center;

  & > svg {
    position: absolute;
    top: 0;
    left: 3rem;
  }
`;

export const MainDish = styled.div`
  position: absolute;
  top: -1rem;
  left: 2rem;
  width: 100%;

  & > img {
    border-radius: 50%;
    overflow: hidden;
    width: 13.5rem;
    height: 13.5rem;
    position: absolute;
    top: 0;
  }
`;

const CONOResult = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  & > * {
    font-family: 'Montserrat';
    font-size: 1.8rem;
    font-weight: bold;
    letter-spacing: -0.01rem;
    line-height: 2.2rem;
  }
`;

const CONOProgress = styled.div`
  width: 100%;
  height: 1rem;

  background-color: ${colors.noEatProgress};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: ${(props) => props.coEatRatio}%;
    height: 1rem;
    background-color: ${colors.orange};
  }
`;

export default ResultCard;