import { ReactComponent as Coeat } from 'assets/logo.svg';
import { ReactComponent as Sticker } from 'assets/sticker.svg';
import { ReactComponent as GoIcon } from 'assets/go.svg';
import CheckImg from 'assets/check.png';
import CopyImg from 'assets/insert_link.png';
import CloseImg from 'assets/close.png';

import { StyledContainer, StyledMainHeader, StyledTitle, StyledContent, StyledMainButton } from 'pages/MainPage';
import styled from 'styled-components';
import { useRef, useState } from 'react';

const HostPage = () => {
  const [copySuccess, setCopySuccess] = useState(false);
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
    <StyledContainer>
      <StyledMainHeader>
        <StyledTitle>
          <Sticker />
          <Coeat />
        </StyledTitle>
        <CustomStyledContent>
          <img src={CheckImg} alt="CheckImg" />
          <p>방이 만들어졌습니다!</p>
          <p className="big">링크를 공유해보세요!</p>
          <p className="small">오늘 같이 식사를 할 코잇러에게 링크를 공유하여</p>
          <p className="small">식사메뉴를 함께 정해보세요!</p>
        </CustomStyledContent>
      </StyledMainHeader>
      <StyledLinkContainer>
        <input ref={linkRef} readOnly value="www.coeat.com/roomid=123kjdl"></input>
        <button onClick={handleCopy}>
          <img src={CopyImg} alt="Copy Img" />
        </button>
      </StyledLinkContainer>
      <StyledModalContainer>
        {copySuccess && (
          <StyledCopySuccess onClick={handleClose}>
            <span>링크 복사가 완료되었어요 </span>
            <img src={CloseImg} alt="Close Img" />
          </StyledCopySuccess>
        )}
      </StyledModalContainer>

      <CustomStyledMainButton>
        <span>Let`s COEAT!</span>
        <GoIcon />
      </CustomStyledMainButton>
    </StyledContainer>
  );
};

export default HostPage;

const CustomStyledContent = styled(StyledContent)`
  & > img {
    margin-top: 10rem;
    margin-bottom: 7rem;
  }

  & > p {
    font-size: 3.2rem;
  }

  & > p:last-child {
    font-weight: normal;
  }

  .big {
    margin-top: 1.8rem;
    margin-bottom: 4.3rem;
    font-size: 4rem;
    font-weight: 700;
  }

  .small {
    font-size: 2.2rem;
    font-weight: normal;
    color: #5b5b5b;
  }
`;

const CustomStyledMainButton = styled(StyledMainButton)`
  display: flex;
  align-items: center;
  padding: 0;
`;

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

  & > input {
    border: 0;
    outline: 0;
    width: 100%;
    background-color: transparent;
    font-size: 2.8rem;
    margin-right: 2rem;
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

const StyledCopySuccess = styled.button`
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
`;
