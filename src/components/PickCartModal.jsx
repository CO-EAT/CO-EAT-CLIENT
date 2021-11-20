import styled from 'styled-components';
import { ReactComponent as ProfileIcon } from 'assets/profile.svg';
import { ReactComponent as CartlBtnIcon } from 'assets/cartlBtn.svg';
import FoodCartCard from 'components/FoodCartCard';

function PickCartModal() {
  return (
    <>
      <StyledCartModalWrapper>
        <StyledCoEat>
          <div>
            <div>
              <span>COEAT</span>
              <div></div>
            </div>
            <span>13</span>
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
            <span>13</span>
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
        <ProfileIcon />
        <span>유루리님</span>
        <StyledLine />
        <span>COEAT</span>
        <span>13</span>
        <span>NOEAT</span>
        <span>13</span>
        <CartlBtnIcon />
        <button>결과 화면</button>
      </StyledCartWrapper>
    </>
  );
}

export default PickCartModal;

const StyledCartWrapper = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 9.2rem;
  padding: 2.4rem 0rem 2.6rem 36.4rem;
  background-color: #000;
  color: #fff;
  font-size: 2rem;
  text-align: center;
  line-height: 2.4rem;

  & > svg {
    height: 4.1rem;
  }

  & > svg:last-child {
    margin-left: 3.7rem;
  }

  & > span:nth-child(even) {
    margin-right: 2.4rem;
  }

  & > span:nth-child(odd) {
    color: #ff912d;
    margin-right: 5.5rem;
  }

  & > button {
    border: 0;
    border-radius: 0.2rem;
    outline: 0;
    width: 16.3rem;
    height: 4.9rem;
    background-color: #ff912d;
    margin: 0 36rem 0 42.2rem;
    font-size: 2.4rem;
    font-weight: 700;
  }
`;

const StyledLine = styled.div`
  width: 0.1rem;
  height: 100%;
  background-color: #fff;
  margin: 0 4rem;
`;

const StyledCartModalWrapper = styled.div`
  display: flex;
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
