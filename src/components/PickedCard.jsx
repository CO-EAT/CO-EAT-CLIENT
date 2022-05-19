import styled, { css } from 'styled-components';
import { ImageWrapper, MainDish } from './FoodSelectionCard';
import { colors } from 'constants/colors';
import { ReactComponent as CloseBtnImg } from 'assets/closeBtn.svg';
import { ReactComponent as Plate } from 'assets/img/plate.svg';
import usePickInfo from 'cores/hooks/usePickInfo';
import Responsive from './common/Responsive';
import { applyMediaQuery } from 'styles/mediaQueries';

const COEAT = 'COEAT';

function PickedCard(props) {
  const { type, foodInfo } = props;
  const { name, img, id } = foodInfo;

  const { handleCoeat, handleNoeat } = usePickInfo();

  const foodHandler = type === COEAT ? handleCoeat : handleNoeat;

  return (
    <StyledMenuSelection>
      <LeftBox>
        <Responsive tablet desktop>
          <StyledImageWrapper>
            <StyledPlate />
            <StyledMainDish>
              <img src={img} alt="picked-food-img" />
            </StyledMainDish>
          </StyledImageWrapper>
        </Responsive>

        <FoodInfoWrapper>
          <h2>{name}</h2>
          <FoodInfoBadge badgeType={type}>{type}</FoodInfoBadge>
        </FoodInfoWrapper>
      </LeftBox>
      <RightBox>
        <InvertedBorder top />
        <InvertedBorder bottom />
        <CloseBtn onClick={() => foodHandler(id, name, img)}>
          <CloseBtnImg />
        </CloseBtn>
      </RightBox>
    </StyledMenuSelection>
  );
}

const StyledMenuSelection = styled.li`
  display: flex;
  width: 38rem;
  height: 16.844rem;
  background-color: #fff;
  border: 1px solid ${colors.cardBorder};
  margin-bottom: 1.7rem;

  ${applyMediaQuery('mobile', 'mini')} {
    width: 100%;
    height: 84px;
  }
`;

const InvertedBorder = styled.i`
  border: 1px solid ${colors.cardBorder};
  position: absolute;
  width: 3rem;
  height: 1.5rem;
  transform: translateX(-50%);
  ${applyMediaQuery('mobile')} {
    width: 15px;
    height: 7.5px;
  }
  ${(props) =>
    props.bottom
      ? css`
          border-radius: 1.5rem 1.5rem 0 0;
          border-bottom: none;
          bottom: 0;
          ${applyMediaQuery('mobile')} {
            border-radius: 7.5px 7.5px 0 0;
          }
        `
      : css`
          border-radius: 0 0 1.5rem 1.5rem;
          top: 0;
          border-top: none;
          ${applyMediaQuery('mobile')} {
            border-radius: 0 0 7.5px 7.5px;
          }
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
  gap: 5px;
`;
const RightBox = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 2rem;

  ${applyMediaQuery('mobile')} {
    padding: 0 5px;
  }
`;

const FoodInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  & > h2 {
    font-family: 'Pretendard Variable';
    font-size: 2.8rem;
    font-weight: bold;
    letter-spacing: -0.01rem;
  }

  ${applyMediaQuery('mobile')} {
    align-items: flex-start;
    margin-left: 14px;
    gap: 8.25px;

    & > h2 {
      font-size: 16px;
      line-height: 19px;
    }
  }
`;

const FoodInfoBadge = styled.div`
  font-family: 'Montserrat';

  display: flex;
  align-items: center;
  justify-content: center;

  width: 10rem;
  height: 3.811rem;
  border: 0;

  font-size: 1.6rem;
  font-weight: 700;

  color: ${colors.white};
  background-color: ${(props) => (props.badgeType === COEAT ? colors.darkOrange : colors.black)};

  ${applyMediaQuery('mobile')} {
    font-size: 13px;
    line-height: 16px;

    width: fit-content;
    padding: 6px 8px;
    height: unset;
    background-color: ${(props) => (props.badgeType === COEAT ? colors.darkOrange : '#434343')};
  }

  ${applyMediaQuery('mini')} {
    font-size: 11px;
    line-height: 14px;
  }
`;

const StyledMainDish = styled(MainDish)`
  & > img {
    width: 150%;
    height: auto;
    max-height: 100%;
    transform: translate(-50%, -50%);
  }
`;

const StyledPlate = styled(Plate)`
  width: 66px;
  height: 66px;
`;

const StyledImageWrapper = styled(ImageWrapper)`
  padding-top: calc(10rem + 2rem);
  margin: 0;
  width: 50%;
`;

const CloseBtn = styled.button`
  border: none;
  background-color: transparent;

  & > svg {
    width: 3rem;
    ${applyMediaQuery('mobile')} {
      width: 16px;
    }
  }
`;

export default PickedCard;
