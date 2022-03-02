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
    zIndex: 9999,
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

export const mobileModalStyles = {
  ...modalStyles,
  content: {
    ...modalStyles.content,
    padding: '10px 68px',
  },
};

const Modal = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Modal;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;
`;
