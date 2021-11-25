import styled from 'styled-components';

function CartModal() {
  return <StyledCartWrapper></StyledCartWrapper>;
}

export default CartModal;

const StyledCartWrapper = styled.div`
  overflow: auto;
  position: absolute;
  bottom: 9.2rem;
  height: 68.9rem;
  width: 100%;
  font-size: 8rem;
  background-color: #f4f5f6;
  color: black;
`;
