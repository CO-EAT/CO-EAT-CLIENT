import React from 'react';
import styled from 'styled-components';

export const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#FFFFFF',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    border: 'none',
    borderRadius: '2rem',
    outline: 'none',
    boxShadow: 'rgb(0,0,0, 0.4) 0 0 5rem 0',
    padding: '5rem 15rem',
    height: 'fit-content',
    width: 'fit-content',
  },
};

const WarnModal = ({ restrictModal, setRestrictModal, checkType }) => {
  return (
    <StyledWrapper>
      <div>{checkType} 한도 초과</div>
      <div>{checkType}은 5개까지만 가능해요!</div>
      <button onClick={() => setRestrictModal(!restrictModal)}>
        <span>확인</span>
      </button>
    </StyledWrapper>
  );
};

export default WarnModal;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > div:first-child {
    margin-top: 2.6rem;
    margin-bottom: 1rem;
    font-size: 2.8rem;
    font-weight: 700;
  }

  & > div:nth-child(2) {
    font-size: 2.2rem;
    margin-bottom: 4rem;
  }

  & > button {
    width: 16.3rem;
    height: 5.8rem;
    background-color: #ff7a00;
    border: none;
    font-size: 2.2rem;
    color: white;
    font-weight: 700;
  }
`;
