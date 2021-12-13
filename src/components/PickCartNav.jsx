import styled, { css } from 'styled-components';
import { ReactComponent as ProfileIcon } from 'assets/profile.svg';
import { ReactComponent as CartlBtnIcon } from 'assets/cartlBtn.svg';
import CartModal from 'components/CartModal';
import { colors } from 'constants/colors';

function PickCartModal({ coEatList, noEatList, isOpen, toggleModal, onRemoveFood, navigator }) {
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
          <StyledOpenModalBtn onClick={() => toggleModal(!isOpen)} isOpen={isOpen}>
            <CartlBtnIcon />
            <span>{isOpen ? '더 둘러보기' : '선택 목록보기'}</span>
          </StyledOpenModalBtn>
          <StyledUserProfile>
            <StyledLine />
            <ProfileIcon />
            <span>유루리님</span>
            <StyledResultBtn
              onClick={() => {
                navigator('/result');
              }}
              isOpen={isOpen}>
              완료하기
            </StyledResultBtn>
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

const StyledResultBtn = styled.button`
  ${(props) =>
    props.isOpen
      ? css`
          display: '';
        `
      : css`
          display: none;
        `}
  border: 0;
  outline: 0;
  background-color: #ff7a00;
  width: 19.4rem;
  height: 6.4rem;
  font-size: 2.2rem;
  font-weight: bolder;
  color: white;
  margin-left: 4.3rem;
`;

const StyledOpenModalBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: 0;
  background-color: transparent;

  & > svg {
    ${(props) =>
      props.isOpen
        ? css`
            transform: rotate(180deg);
            order: 1;
          `
        : css`
            transform: rotate(0);
          `};
    width: 2.6rem;
  }

  & > span {
    color: #b3b3b3;
    font-size: 2rem;
`;
