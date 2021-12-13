import styled from 'styled-components';
import { ReactComponent as ProfileIcon } from 'assets/profile.svg';
import { ReactComponent as CartlBtnIcon } from 'assets/cartlBtn.svg';
import CartModal from 'components/CartModal';

import { colors } from 'constants/colors';

function PickCartModal({ coEatList, noEatList, isOpen, toggleModal, onRemoveFood }) {
  return (
    <>
      <StyledCartNavWrapper>
        {isOpen && (
          <CartModal
            coEatList={coEatList}
            noEatList={noEatList}
            onRemoveFood={onRemoveFood}
            toggleModal={toggleModal}
          />
        )}
        <StyledCartNav>
          <StyledCartInfo>
            <span>COEAT</span>
            <span>{coEatList.length}/5</span>
            <span>NOEAT</span>
            <span>{noEatList.length}/5</span>
          </StyledCartInfo>
          <StyledOpenModalBtn onClick={() => toggleModal(!isOpen)}>
            <CartlBtnIcon />
          </StyledOpenModalBtn>

          <StyledUserProfile>
            <StyledLine />
            <ProfileIcon />
            <span>유루리님</span>
          </StyledUserProfile>
        </StyledCartNav>
      </StyledCartNavWrapper>
    </>
  );
}

export default PickCartModal;

const StyledCartNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 9.2rem;
  background-color: #000;
  color: #fff;
  font-size: 2rem;
  border-bottom: 3px solid black;
`;

const StyledCartNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 120rem;
  height: 100%;
`;

const StyledUserProfile = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */

  & > svg {
    width: 4.8rem;
  }

  & > span {
    margin-left: 2.3rem;
  }
`;

const StyledLine = styled.div`
  width: 0.2rem;
  height: 3.5rem;
  background-color: #585858;
  margin-right: 2rem;
`;

const StyledCartInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.4rem;
  font-weight: bold;
  height: 100%;

  & > span + span {
    margin-left: 2.4rem;
  }

  & > span:nth-child(even) {
    margin-right: 3rem;
    color: ${colors.darkOrange};
  }
`;

const StyledOpenModalBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: 0;
  background-color: transparent;
  /* margin-right: 42.2rem; */
`;
