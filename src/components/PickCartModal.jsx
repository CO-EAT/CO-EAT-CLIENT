import styled from 'styled-components';
import { ReactComponent as ProfileIcon } from 'assets/profile.svg';
import { ReactComponent as CartlBtnIcon } from 'assets/cartlBtn.svg';
import FoodCartCard from 'components/FoodCartCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PickCartModal({ coEatList, noEatList }) {
  const navigator = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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
      <StyledCartModalWrapper isOpen={isOpen}>
        <CloseButton onClick={() => setIsOpen(false)}>X</CloseButton>
        <StyledCoEat>
          <div>
            <div>
              <span>COEAT</span>
              <div></div>
            </div>
            <span>{Object.keys(coEatList).length}</span>
          </div>
          <ul>
            <li>
              <FoodCartCard />
            </li>
            <li>
              <FoodCartCard />
            </li>
            <li>
              <FoodCartCard />
            </li>
            <li>
              <FoodCartCard />
            </li>
          </ul>
        </StyledCoEat>
        <StyledNoEat>
          <div>
            <div>
              <span>NOEAT</span>
              <div></div>
            </div>
            <span>{Object.keys(noEatList).length}</span>
          </div>
          <ul>
            <li>
              <FoodCartCard />
            </li>
            <li>
              <FoodCartCard />
            </li>
            <li>
              <FoodCartCard />
            </li>
            <li>
              <FoodCartCard />
            </li>
          </ul>
        </StyledNoEat>
      </StyledCartModalWrapper>

      <StyledCartWrapper>
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
          <StyledOpenCartBtn onClick={handleClick}>
            <CartlBtnIcon />
          </StyledOpenCartBtn>
          <StyledResultBtn
            onClick={() => {
              navigator('/result');
            }}>
            결과 화면
          </StyledResultBtn>
        </StyledCartNav>
      </StyledCartWrapper>
    </>
  );
}

export default PickCartModal;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: 0;
  background-color: transparent;
`;

const StyledCartWrapper = styled.div`
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
  width: 0.1rem;
  height: 70%;
  background-color: #fff;
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

const StyledOpenCartBtn = styled.button`
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

const StyledCartModalWrapper = styled.div`
  position: fixed;
  bottom: 9.2rem;
  display: ${(prop) => (prop.isOpen ? 'flex' : 'none')};
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: 77rem;
  background-color: #f4f5f6;
`;

const StyledCoEat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  overflow-y: hidden;
  background-color: #f4f5f6;
  border-right: 1px solid #e6e6e6;

  & > div {
    display: flex;
    font-size: 2.4rem;
    text-align: center;
    margin-top: 4.6rem;
    color: #ff912d;

    & > div {
      display: flex;
      flex-direction: column;
      font-size: 2.8rem;
      line-height: 2.2rem;
      margin-right: 2.1rem;
      color: black;

      & > div {
        width: 10rem;
        height: 0.8rem;
        background: #ff912d;
        margin-top: 0.4rem;
      }
    }
  }
`;

const StyledNoEat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  overflow-y: hidden;
  background-color: #f4f5f6;

  & > div {
    display: flex;
    font-size: 2.4rem;
    text-align: center;
    margin-top: 4.6rem;
    color: #000;

    & > div {
      display: flex;
      flex-direction: column;
      font-size: 2.8rem;
      line-height: 2.2rem;
      margin-right: 2.1rem;
      color: black;

      & > div {
        width: 10rem;
        height: 0.8rem;
        background: #000;
        margin-top: 0.4rem;
      }
    }
  }
`;
