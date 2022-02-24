import { ReactComponent as Sticker } from 'assets/sticker.svg';
import { ReactComponent as GoIcon } from 'assets/go.svg';
import CheckImg from 'assets/check.png';
import Papers from 'assets/img/index';
import {
  StyledContainer,
  StyledMainHeader,
  StyledTitle,
  StyledContent,
  StyledMainButton,
  CustomLogo,
} from 'pages/MainPage';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router';
import LinkCopy from 'components/LinkCopy';
import useRoomInfo from 'cores/hooks/useRoomInfo';
import { applyMediaQuery } from 'styles/mediaQueries';

const HostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inviteCode = location.state;
  const { setInviteCode } = useRoomInfo();

  const handleClick = () => {
    setInviteCode(inviteCode);
    navigate('/pick');
  };

  //   색종이를 랜덤으로 출력
  const paperImgElArr = [];

  const randomPaperFlakes = () => {
    for (let i = 0; i < 20; i++) {
      const imgSrc = Papers[Math.floor(Math.random() * 9)];
      paperImgElArr.push(<img key={i} src={imgSrc} alt="" />);
    }

    return paperImgElArr;
  };

  return (
    <StyledContainer>
      <StyledDecoration>{randomPaperFlakes()}</StyledDecoration>
      <StyledMainHeader>
        <CustomStyledTitle>
          <Sticker />
          <CustomLogo />
        </CustomStyledTitle>
        <CustomStyledContent>
          <img src={CheckImg} alt="CheckImg" />
          <p>방이 만들어졌습니다!</p>
          <p className="big">링크를 공유해보세요!</p>
          <p className="small">오늘 같이 식사를 할 코잇러에게 링크를 공유하여</p>
          <p className="small">식사메뉴를 함께 정해보세요!</p>
        </CustomStyledContent>
      </StyledMainHeader>
      <LinkCopy inviteCode={inviteCode} />
      <CustomStyledMainButton onClick={handleClick}>
        <span>Let`s COEAT!</span>
        <GoIcon />
      </CustomStyledMainButton>
    </StyledContainer>
  );
};

export default HostPage;

const CustomStyledTitle = styled(StyledTitle)`
  ${applyMediaQuery('mobile')} {
    margin-right: 0;
    margin-bottom: 0;

    & > svg:first-child {
      display: none;
    }

    & > svg:last-child {
      width: 13.5rem;
      height: 8.86rem;
    }
  }
`;

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

  ${applyMediaQuery('mobile')} {
    & > img {
      width: 4rem;
      height: 4rem;
      margin-top: 3rem;
      margin-bottom: 4.7rem;
    }

    & > p {
      font-size: 18px;
    }

    .big {
      margin-bottom: 3rem;
      font-size: 22px;
    }

    .small {
      font-size: 13px;
    }
  }
`;

const CustomStyledMainButton = styled(StyledMainButton)`
  display: flex;
  align-items: center;
  padding: 2rem 2rem;

  ${applyMediaQuery('mobile')} {
    width: fit-content;
    padding: 1.7rem 4.9rem;

    & > svg {
      display: none;
    }

    & > span {
      font-size: 16px;
    }
  }
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
        transform: translate3d(15px, 100vh, 0px) rotate(180deg) scale(0.6);
      }
    }
  }
`;
