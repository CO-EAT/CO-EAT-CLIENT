import styled from 'styled-components';
import { ReactComponent as ProfileIcon } from 'assets/profile.svg';
import { ReactComponent as CartlBtnIcon } from 'assets/cartlBtn.svg';
import CartModal from 'components/CartModal';
import { useNavigate } from 'react-router-dom';

function PickCartModal({ coEatList, noEatList, isOpen, setIsOpen }) {
  const navigator = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const getTotalEatList = (list) => {
    let sum = 0;
    Object.keys(list).forEach((key) => {
      sum += list[key];
    });
    return sum;
  };

  return (
    <>
      <StyledCartNavWrapper>
        {isOpen && <CartModal coEatList={coEatList} noEatList={noEatList} setIsOpen={setIsOpen} />}
        <StyledCartNav>
          <StyledUserProfile>
            <ProfileIcon />
            <span>유루리님</span>
          </StyledUserProfile>
          <StyledLine />
          <StyledCartInfo>
            <span>COEAT</span>
            <span>{getTotalEatList(coEatList)}</span>
            <span>NOEAT</span>
            <span>{getTotalEatList(noEatList)}</span>
          </StyledCartInfo>
          <StyledOpenModalBtn onClick={handleClick}>
            <CartlBtnIcon />
          </StyledOpenModalBtn>
          <StyledResultBtn
            onClick={() => {
              navigator('/result');
            }}>
            결과 화면
          </StyledResultBtn>
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
  justify-content: flex-start;
  width: 50rem;

  & > svg {
    width: 4.8rem;
  }

  & > span {
    margin: 0 4rem 0 2.3rem;
  }
`;

const StyledLine = styled.div`
  width: 0.2rem;
  height: 70%;
  background-color: #585858;
  margin-right: 4rem;
`;

const StyledCartInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.4rem;
  height: 100%;

  & > span + span {
    margin-left: 2.4rem;
  }

  & > span:nth-child(even) {
    margin-right: 3rem;
    color: #ff912d;
  }
`;

const StyledOpenModalBtn = styled.button`
  border: 0;
  outline: 0;
  background-color: transparent;
  margin-right: 42.2rem;
`;

const StyledResultBtn = styled.button`
  border: 0;
  outline: 0;
  background-color: #ff912d;
  width: 18em;
  height: 4.9rem;
  font-weight: bolder;
`;
