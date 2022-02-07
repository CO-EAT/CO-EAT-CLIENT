import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from 'assets/profile.svg';
import { ReactComponent as CartlBtnIcon } from 'assets/cartlBtn.svg';
import CartModal from 'components/CartModal';
import { colors } from 'constants/colors';
import useRoomInfo from 'cores/hooks/useRoomInfo';
import { postMenuSelection } from 'libs/api';

function PickCartModal({ coEatList, noEatList, isCartOpen, toggleModal, onRemoveFood }) {
  const {
    roomStateContext: {
      inviteCode,
      userInfo: { nickname },
    },
  } = useRoomInfo();
  const navigator = useNavigate();

  const getIdArrayFromEatList = (list) => list.map((li) => li.id);
  const submitCompleteCoeat = async () => {
    const isSuccess = await postMenuSelection(
      { inviteCode, nickname },
      getIdArrayFromEatList(coEatList),
      getIdArrayFromEatList(noEatList),
    );
    if (isSuccess) navigator('/result');
  };

  return (
    <StyledCartNavWrapper>
      {isCartOpen && (
        <CartModal coEatList={coEatList} noEatList={noEatList} onRemoveFood={onRemoveFood} toggleModal={toggleModal} />
      )}
      <StyledCartNav>
        <StyledCartInfo>
          <span>COEAT</span>
          <span>{coEatList.length}/5</span>
          <span>NOEAT</span>
          <span>{noEatList.length}/5</span>
        </StyledCartInfo>
        <StyledOpenModalBtn onClick={toggleModal} isOpen={isCartOpen}>
          <CartlBtnIcon />
          <span>{isCartOpen ? '더 둘러보기' : '선택 목록보기'}</span>
        </StyledOpenModalBtn>
        <StyledUserProfile>
          <StyledLine />
          <StyledProfileIcon />
          <span>{nickname}님</span>
          {isCartOpen && (
            <StyledResultBtn onClick={submitCompleteCoeat} isOpen={isCartOpen}>
              완료하기
            </StyledResultBtn>
          )}
        </StyledUserProfile>
      </StyledCartNav>
    </StyledCartNavWrapper>
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
  }
`;

const StyledProfileIcon = styled(ProfileIcon)`
  height: 48px;
`;
