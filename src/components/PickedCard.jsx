import styled, { css } from 'styled-components';
import { ReactComponent as HambugerImg } from 'assets/hambuger.svg';
import { ReactComponent as CloseBtnImg } from 'assets/closeBtn.svg';
import { colors } from 'constants/colors';

function PickedCard() {
  return (
    <StyledMenuSelection>
      <LeftBox>
        <div>
          <HambugerImg />
          <div>
            <span>햄버거</span>
            <div>COEAT</div>
          </div>
        </div>
      </LeftBox>
      <RightBox>
        <InvertedBorder top />
        <InvertedBorder bottom />
        <CloseBtnImg />
      </RightBox>
    </StyledMenuSelection>
  );
}

const StyledMenuSelection = styled.article`
  display: flex;
  width: 38rem;
  height: 16.844rem;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid ${colors.cardBorder};
  margin-top: 5.2rem;
`;

const InvertedBorder = styled.i`
  border: 1px solid ${colors.cardBorder};
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

  background-color: #f4f5f6;
  left: 0;

  &::after {
    content: '';
    background-color: #f4f5f6;
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

const LeftBox = styled.div`
  flex: 5;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  border-right: 1px dashed ${colors.cardBorder};

  div {
    display: flex;
    align-items: center;

    & > svg {
      width: 17.1rem;
    }

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 2.8rem;

      & > div {
        width: 10rem;
        height: 3.811rem;
        border: 0;
        margin-top: 1.2rem;
        font-size: 1.6rem;
        font-weight: 700;
        color: #fff;
        background-color: ${colors.darkOrange};
      }
    }
  }
`;
const RightBox = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    width: 3rem;
  }
`;

export default PickedCard;
