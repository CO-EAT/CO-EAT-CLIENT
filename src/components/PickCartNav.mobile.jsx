import styled from 'styled-components';
import CartModal from 'components/CartModal.mobile';
import { colors } from 'constants/colors';
import usePickInfo from 'cores/hooks/usePickInfo';
import { css } from 'styled-components';
import { ThemeProvider as CartOpenProvider } from 'styled-components';

function MobilePickCartModal({ isCartOpen, toggleModal, submitCompleteCoeat }) {
  const { coEatList, noEatList } = usePickInfo();

  return (
    <CartOpenProvider theme={{ isCartOpen }}>
      <StyledCartNavWrapper>
        {isCartOpen && <CartModal toggleModal={toggleModal} />}
        <StyledCartNav>
          <StyledCartInfo>
            <span>COEAT</span>
            <span>{coEatList.length}/5</span>
            <span>NOEAT</span>
            <span>{noEatList.length}/5</span>
          </StyledCartInfo>
          <OrangeButton onClick={isCartOpen ? submitCompleteCoeat : toggleModal}>
            {isCartOpen ? '완료' : '다음'}
          </OrangeButton>
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
      height: unset;
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

const OrangeButton = styled.button`
  flex: 1;
  background-color: ${colors.orange};
  height: 100%;
  color: white;
  border: none;

  font-size: 16px;
  line-height: 19px;

  padding-bottom: 30px;

  ${({ theme }) =>
    theme.isCartOpen &&
    css`
      width: 100%;
      padding-bottom: unset;
      height: 79px;
      flex: unset;
    `};
`;
