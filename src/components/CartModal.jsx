import styled from 'styled-components';
import FoodCartCard from 'components/FoodCartCard';

function CartModal({ coEatList, noEatList, setIsOpen }) {
  return (
    <StyledCartWrapper>
      <CloseButton onClick={() => setIsOpen(false)}>X</CloseButton>
      <StyledListWrapper color="COEAT">
        <div>
          <StyledTitle>
            <span>COEAT</span>
            <StyledUnderLine color="COEAT" />
          </StyledTitle>
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
      </StyledListWrapper>
      <StyledListWrapper>
        <div>
          <StyledTitle>
            <span>NOEAT</span>
            <StyledUnderLine color="NOEAT" />
          </StyledTitle>
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
      </StyledListWrapper>
    </StyledCartWrapper>
  );
}

export default CartModal;

const StyledCartWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 9.2rem;
  height: 68.9rem;
  width: 100%;
  background-color: #f4f5f6;
  font-size: 8rem;
  color: black;
  overflow: scroll;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  border: 0;
  background-color: transparent;
`;

const StyledTitle = styled.header`
  display: flex;
  flex-direction: column;
  font-size: 2.8rem;
  line-height: 2.2rem;
  margin-right: 2.1rem;
  color: black;
`;

const StyledUnderLine = styled.div`
  width: 10rem;
  height: 0.8rem;
  background: ${(prop) => (prop.color == 'COEAT' ? '#ff912d' : 'black')};
  margin-top: 0.4rem;
`;

const StyledListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 50%;
  width: 30%;
  background-color: #f4f5f6;
  border-right: 1px solid #e6e6e6;

  & > div {
    display: flex;
    font-size: 2.4rem;
    text-align: center;
    margin-top: 4.6rem;
    color: ${(prop) => (prop.color == 'COEAT' ? '#ff912d' : 'black')};
  }
`;
