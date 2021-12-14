import styled from 'styled-components';
import PickedCard from 'components/PickedCard';

const COEAT = 'COEAT';
const NOEAT = 'NOEAT';

function CartModal({ coEatList, noEatList, onRemoveFood, toggleModal }) {
  const getFoodInfo = (foodInfoList) => {
    return {
      name: foodInfoList.name,
      img: foodInfoList.img,
      id: foodInfoList.id,
    };
  };

  return (
    <StyledCartWrapper>
      <CloseButton onClick={toggleModal}>X</CloseButton>
      <StyledListWrapper COEAT>
        <div>
          <StyledTitle>
            <span>COEAT</span>
            <StyledUnderLine COEAT />
          </StyledTitle>
          <span>{coEatList.length}</span>
        </div>
        <StyledList>
          {coEatList.map((coEatFood) => (
            <PickedCard
              type={COEAT}
              foodInfo={getFoodInfo(coEatFood)}
              key={coEatFood.id}
              onRemoveFood={onRemoveFood(COEAT)}
            />
          ))}
        </StyledList>
      </StyledListWrapper>
      <StyledListWrapper>
        <div>
          <StyledTitle>
            <span>NOEAT</span>
            <StyledUnderLine NOEAT />
          </StyledTitle>
          <span>{noEatList.length}</span>
        </div>
        <StyledList>
          {noEatList.map((noEatFood) => (
            <PickedCard
              type={NOEAT}
              foodInfo={getFoodInfo(noEatFood)}
              key={noEatFood.id}
              onRemoveFood={onRemoveFood(NOEAT)}
            />
          ))}
        </StyledList>
      </StyledListWrapper>
    </StyledCartWrapper>
  );
}

export default CartModal;

const StyledCartWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 9.2rem;
  height: 107rem;
  width: 100%;
  background-color: #f4f5f6;
  font-size: 8rem;
  color: black;
  overflow: scroll;
  border-radius: 20px 20px 0 0;
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
  font-family: 'Montserrat';
`;

const StyledUnderLine = styled.div`
  width: 10rem;
  height: 0.8rem;
  background: ${(prop) => (prop.COEAT ? '#ff912d' : 'black')};
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
    color: ${(prop) => (prop.COEAT ? '#ff912d' : 'black')};

    margin-bottom: 5.2rem;
  }
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
