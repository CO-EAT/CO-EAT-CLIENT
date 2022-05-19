import styled from 'styled-components';
import PickedCard from 'components/PickedCard';
import usePickInfo from 'cores/hooks/usePickInfo';
import { applyMediaQuery } from 'styles/mediaQueries';
import { GrFormClose } from 'react-icons/gr';

const COEAT = 'COEAT';
const NOEAT = 'NOEAT';

function CartModal({ toggleModal }) {
  const { coEatList, noEatList } = usePickInfo();

  return (
    <>
      <StyledCartWrapper>
        <CloseButton onClick={toggleModal}>
          <GrFormClose />
        </CloseButton>
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
              <PickedCard type={COEAT} foodInfo={coEatFood} key={coEatFood.id} />
            ))}
          </StyledList>
        </StyledListWrapper>
        <Delimiter />
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
              <PickedCard type={NOEAT} foodInfo={noEatFood} key={noEatFood.id} />
            ))}
          </StyledList>
        </StyledListWrapper>
      </StyledCartWrapper>
    </>
  );
}

export default CartModal;

const StyledCartWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 9.2rem;
  height: calc(100vh - 26rem - 9.2rem - 1.5rem);
  ${applyMediaQuery('mobile')} {
    height: calc(100vh - 26rem - 83px - 1.5rem);
    bottom: 83px;
  }
  width: 100%;
  background-color: #f4f5f6;
  font-size: 8rem;
  color: black;
  overflow: scroll;
  border-radius: 20px 20px 0 0;
  padding: 0 calc(calc(100% - 120rem) / 2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 3.5rem;
  right: 2rem;
  border: 0;
  background-color: transparent;

  font-size: 4.5rem;
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
  align-items: flex-start;
  flex: 1;
  background-color: #f4f5f6;
  padding-top: 5rem;

  & > div {
    display: flex;
    font-size: 2.4rem;
    text-align: center;
    color: ${(prop) => (prop.COEAT ? '#ff912d' : 'black')};
    margin-bottom: 5.2rem;
  }
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Delimiter = styled.div`
  width: 2px;
  height: 90%;
  background-color: #e6e6e6;
  margin: 5rem 10rem;
  margin-bottom: 0;
`;
