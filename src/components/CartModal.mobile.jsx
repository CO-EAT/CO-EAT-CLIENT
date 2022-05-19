import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PickedCard from 'components/PickedCard';
import usePickInfo from 'cores/hooks/usePickInfo';
import { applyMediaQuery } from 'styles/mediaQueries';

const COEAT = 'COEAT';
const NOEAT = 'NOEAT';

function CartModal() {
  const { coEatList, noEatList } = usePickInfo();
  const [windowHeight, setwindowHeight] = useState(window?.innerHeight || 667);

  useEffect(() => {
    function handleHeightResize() {
      if (window) setwindowHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleHeightResize);

    return () => {
      window.removeEventListener('resize', handleHeightResize);
    };
  }, []);

  return (
    <MobileModalWrapper vh={windowHeight || 667}>
      <MobileHeader>
        <h2>나의 코잇/노잇</h2>
      </MobileHeader>
      <StyledCartWrapper>
        <StyledListWrapper COEAT>
          <div>
            <StyledTitle COEAT>
              <span>COEAT</span>
            </StyledTitle>
          </div>
          <StyledList>
            {coEatList.map((coEatFood) => (
              <PickedCard type={COEAT} foodInfo={coEatFood} key={coEatFood.id} />
            ))}
          </StyledList>
        </StyledListWrapper>
        <StyledListWrapper>
          <div>
            <StyledTitle NOEAT>
              <span>NOEAT</span>
            </StyledTitle>
          </div>
          <StyledList>
            {noEatList.map((noEatFood) => (
              <PickedCard type={NOEAT} foodInfo={noEatFood} key={noEatFood.id} />
            ))}
          </StyledList>
        </StyledListWrapper>
      </StyledCartWrapper>
    </MobileModalWrapper>
  );
}

export default CartModal;

const StyledCartWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f4f5f6;
  font-size: 8rem;
  color: black;
  overflow: scroll;
`;

const StyledTitle = styled.header`
  display: flex;
  flex-direction: column;
  font-size: 2.8rem;
  line-height: 2.2rem;
  margin-right: 2.1rem;
  color: black;
  font-family: 'Montserrat';

  border-bottom: 0.8rem solid ${(prop) => (prop.COEAT ? '#ff912d' : 'black')};
`;

const StyledListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 15px);
  background-color: #f4f5f6;
  gap: 12px;
  padding: 15px;
  ${applyMediaQuery('mini')} {
    padding: 10px;
  }

  & > div {
    width: 150px;
    display: flex;
    justify-content: flex-start;
    font-size: 2.4rem;
    color: ${(prop) => (prop.COEAT ? '#ff912d' : 'black')};
  }
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MobileHeader = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;

  & > h2 {
    font-size: 22px;
    line-height: 26px;
    letter-spacing: -0.1px;
    font-weight: bold;
    color: black;
  }

  & > button {
    background-color: transparent;
    border: none;
    font-size: 22px;
    line-height: 26px;
  }
`;

const MobileModalWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  position: absolute;
  height: ${(props) => `calc(${props.vh}px - 80px - 116px)`};

  bottom: 116px;
`;
