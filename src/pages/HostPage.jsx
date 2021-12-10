import { ReactComponent as Coeat } from 'assets/logo.svg';
import { ReactComponent as Sticker } from 'assets/sticker.svg';
import { ReactComponent as GoIcon } from 'assets/go.svg';
import CheckImg from 'assets/check.png';
import CopyImg from 'assets/insert_link.png';
import CloseImg from 'assets/close.png';
import Papers from 'assets/img/index';
import { StyledContainer, StyledMainHeader, StyledTitle, StyledContent, StyledMainButton } from 'pages/MainPage';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Fade from 'react-reveal/Fade';

const HostPage = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const linkRef = useRef();
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate('/setting');
  };

  //   색종이를 랜덤으로 출력
  const paperArr = [
    Papers.paper1,
    Papers.paper2,
    Papers.paper3,
    Papers.paper4,
    Papers.paper5,
    Papers.paper6,
    Papers.paper7,
    Papers.paper8,
    Papers.paper9,
  ];

  const paperImgElArr = [];

  const randomPaperFlakes = () => {
    for (let i = 0; i < 20; i++) {
      const imgSrc = paperArr[Math.floor(Math.random() * 9)];
      paperImgElArr.push(<img key={i} src={imgSrc} alt="" />);
    }

    return paperImgElArr;
  };

  return (
    <StyledContainer>
      <StyledDecoration>{randomPaperFlakes()}</StyledDecoration>

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
      <Fade top>
        <StyledLinkContainer>
          <input ref={linkRef} readOnly value="www.coeat.com/roomid=123kjdl"></input>
          <button onClick={handleCopy}>
            <img src={CopyImg} alt="Copy Img" />
          </button>
        </StyledLinkContainer>
      </Fade>
      <StyledModalContainer>
        {copySuccess && (
          <StyledAlertBox onClick={handleClose}>
            <span>링크 복사가 완료되었어요 </span>
            <img src={CloseImg} alt="Close Img" />
          </StyledAlertBox>
        )}
      </StyledModalContainer>

      <CustomStyledMainButton onClick={handleClick}>
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
  padding: 2rem 2rem;
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
`;

const StyledDecoration = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  height: 80rem;
  position: absolute;
  top: -6rem;
  z-index: -1;

  & > img {
    width: 6rem;
    height: 6rem;
    display: inline-block;
    animation: paperflakes 2s linear 20;

    &:nth-child(3n) {
      animation-duration: 2s;
      animation-iteration-count: 30;
      transform-origin: right -45px;
    }

    &:nth-child(3n + 1) {
      animation-duration: 4s;
      animation-iteration-count: 45;
      transform-origin: right -30px;
    }

    &:nth-child(3n + 2) {
      animation-duration: 6s;
      animation-iteration-count: 60;
      transform-origin: right -15px;
    }

    /* 모두 같은 시간에 시작하지 않도록, 시간차이를 둔다. */
    &:nth-child(7n) {
      opacity: 0.3;
      animation-delay: 0s;
      animation-timing-function: ease-in;
    }
    &:nth-child(7n + 1) {
      opacity: 0.4;
      animation-delay: 0.1s;
      animation-timing-function: ease-out;
    }
    &:nth-child(7n + 2) {
      opacity: 0.5;
      animation-delay: 0.2s;
      animation-timing-function: linear;
    }
    &:nth-child(7n + 3) {
      opacity: 0.6;
      animation-delay: 0.3s;
      animation-timing-function: ease-in;
    }
    &:nth-child(7n + 4) {
      opacity: 0.7;
      animation-delay: 0.4s;
      animation-timing-function: linear;
    }
    &:nth-child(7n + 5) {
      opacity: 0.8;
      animation-delay: 0.5s;
      animation-timing-function: ease-out;
    }
    &:nth-child(7n + 6) {
      opacity: 0.9;
      animation-delay: 1s;
      animation-timing-function: ease-in;
    }
    @keyframes paperflakes {
      0% {
        transform: translate3d(0, 0, 0) rotate(0deg) scale(0.6);
      }
      100% {
        transform: translate3d(15px, 1200px, 0px) rotate(180deg) scale(0.6);
      }
    }
  }
`;
