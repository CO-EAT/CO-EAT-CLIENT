import styled from 'styled-components';
import CartModal from 'components/CartModal.mobile';
import { colors } from 'constants/colors';
import usePickInfo from 'cores/hooks/usePickInfo';
import { css } from 'styled-components';
import { ThemeProvider as CartOpenProvider } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQueries';

function MobilePickCartModal({ isCartOpen, toggleModal, submitCompleteCoeat }) {
  const { coEatList, noEatList } = usePickInfo();

  return (
    <CartOpenProvider theme={{ isCartOpen }}>
      <StyledCartNavWrapper>
        {isCartOpen && <CartModal />}
        <StyledCartNav>
          <StyledCartInfo>
            <span>COEAT</span>
            <span>{coEatList.length}/5</span>
            <span>NOEAT</span>
            <span>{noEatList.length}/5</span>
          </StyledCartInfo>
          {isCartOpen ? (
            <ButtonWrapper>
              <PrevButton onClick={toggleModal}>이전</PrevButton>
              <NextButton onClick={submitCompleteCoeat}>완료</NextButton>
            </ButtonWrapper>
          ) : (
            <NextButton onClick={toggleModal}>다음</NextButton>
          )}
        </StyledCartNav>
      </StyledCartNavWrapper>
    </CartOpenProvider>
  );
}

export default MobilePickCartModal;

const StyledCartNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 83px;
  color: #fff;

  ${({ theme }) =>
    theme.isCartOpen &&
    css`
      height: 116px;
    `};
`;

const StyledCartNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;

  flex-direction: ${({ theme }) => theme.isCartOpen && 'column'};
`;

const StyledCartInfo = styled.div`
  flex: 2.67;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    font-size: 14px;
    line-height: 17px;
    font-weight: bold;
    font-family: 'Montserrat';
    letter-spacing: -0.1px;
  }

  & > span + span {
    margin-left: 2.4rem;
    ${applyMediaQuery('mobile')} {
      margin-left: 10px;
    }
  }

  & > span:nth-child(even) {
    margin-right: 3rem;
    color: ${colors.darkOrange};
  }

  padding-bottom: 30px;
  ${({ theme }) =>
    theme.isCartOpen &&
    css`
      flex: unset;
      padding-bottom: unset;
      height: unset;
      padding: 10px 0;
    `};
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  margin: 0;
`;

const NextButton = styled.button`
  flex: 1;
  background-color: ${colors.orange};
  height: 100%;
  color: white;
  border: none;

  font-size: 16px;
  line-height: 19px;

  padding-bottom: 30px;
  margin: 0;

  ${({ theme }) =>
    theme.isCartOpen &&
    css`
      width: 100%;
      padding-bottom: 15px;
      flex: unset;
    `};
`;

const PrevButton = styled(NextButton)`
  background-color: ${colors.prevBtnGray};
`;
