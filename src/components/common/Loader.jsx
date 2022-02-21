import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/logo.svg';

function Loader({ overlay = false }) {
  return (
    <StyledLoader overlay={overlay}>
      <Logo />
    </StyledLoader>
  );
}

const StyledLoader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1010;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => (props.overlay ? 'rgba(0, 0, 0, 0.6)' : 'white')};

  & svg {
    animation: fadeInOut infinite 2s ease-in-out;
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

export default Loader;
