import styled, { css } from 'styled-components';
import { ReactComponent as Plate } from 'assets/img/plate.svg';
import { ReactComponent as Bab } from 'assets/img/bab.svg';

const DUMMY = { id: 1, name: '국밥', desc: '국밥은 든든하거든요' };

function Card(props) {
  const { data = DUMMY, setCoEatList, setNoEatList } = props;
  return (
    <StyledCard>
      <UpBox>
        <CardWrapper>
          <CardName>{data.name}</CardName>
          <CardDesc>{data.desc}</CardDesc>
        </CardWrapper>
        <ImageWrapper>
          <Plate />
          <MainDish>
            <Bab />
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
  margin: 3rem;
  display: flex;
  flex-direction: column;
  width: 28rem;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #dddddd;
`;

const InvertedBorder = styled.i`
  border: 1px solid #dddddd;
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

  & > svg {
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

  border-bottom: 1px dashed #dddddd;
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
`;

const CoEatButton = styled(BasicButton)`
  background-color: #ff7a00;
  color: white;
`;
const NoEatButton = styled(BasicButton)`
  background-color: #f5f5f5;
  color: #888888;
`;

const MainDish = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(-35%);

  width: 50%;
`;

export default Card;
