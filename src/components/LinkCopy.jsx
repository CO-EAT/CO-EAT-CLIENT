import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import CopyImg from 'assets/insert_link.png';
import CloseImg from 'assets/close.png';


const LinkCopy = ({ inviteCode, removeStyle = false }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const coeatLink = window.location.origin + `/?inviteCode=${inviteCode}`;
  const linkRef = useRef();

  const handleCopy = () => {
    const link = linkRef.current.value;
    navigator.clipboard.writeText(link);
    setCopySuccess(true);

    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  const handleClose = () => {
    setCopySuccess(false);
  };
  return (
    <>
      <StyledLinkContainer removeStyle={removeStyle}>
        <input ref={linkRef} readOnly value={coeatLink}></input>
        <button onClick={handleCopy}>
          <img src={CopyImg} alt="Copy Img" />
        </button>
      </StyledLinkContainer>
      <StyledModalContainer removeStyle={removeStyle}>
        {copySuccess && (
          <StyledAlertBox onClick={handleClose}>
            <span>링크 복사가 완료되었어요 </span>
            <img src={CloseImg} alt="Close Img" />
          </StyledAlertBox>
        )}
      </StyledModalContainer>
    </>
  );
};

export default LinkCopy;

const StyledLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 5rem 4rem 3rem;
  margin-top: 4.3rem;
  width: 50rem;
  height: 8rem;
  border-radius: 2rem;
  background-color: #f4f5f6;

  ${(props) =>
    props.removeStyle &&
    css`
      padding: 0;
      margin: 0;
      width: 100%;
    `}

  & > input {
    border: 0;
    outline: 0;
    width: 100%;
    background-color: transparent;
    font-size: 2.8rem;
    padding: 0 2rem;
    color: #5b5b5b;
  }

  & > button {
    border: 0;
    background-color: transparent;
    cursor: pointer;

    & > img {
      width: 4.5rem;
      height: 4.5rem;
    }
  }
`;

export const StyledAlertBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  border-radius: 2.8rem;
  width: 35rem;
  height: 5rem;
  font-size: 2.2rem;
  color: white;
  border: 0;
  padding: 1.2rem 3.7rem;
  margin-top: 1rem;

  animation: fadeInOut 2s forwards;

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

const StyledModalContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 7rem;

  ${(props) =>
    props.removeStyle &&
    css`
      position: absolute;
      top: calc(-8rem);
      right: 0;
      width: initial;
    `};
`;
