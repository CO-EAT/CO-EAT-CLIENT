import { ReactComponent as Coeat } from 'assets/logo.svg';
import { ReactComponent as Sticker } from 'assets/sticker.svg';
import { ReactComponent as GoIcon } from 'assets/go.svg';
import CloseImg from 'assets/close.png';
import { StyledContainer, StyledMainHeader, StyledTitle, StyledContent, StyledMainButton } from 'pages/MainPage';
import { StyledAlertBox } from 'pages/HostPage';
import styled from 'styled-components';
import { colors } from 'constants/colors';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import anime from 'animejs/lib/anime.es.js';

const Setting = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [user, setUser] = useState('');
  const [isTextEmpty, setIsTextEmpty] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();
  const inputRef2 = useRef();

  useEffect(() => {
    // input 미입력시, shake animation
    const xMax = 16;
    inputRef.current = [
      anime({
        targets: inputRef.current,
        easing: 'easeInOutSine',
        duration: 550,
        translateX: [
          {
            value: xMax * -1,
          },
          {
            value: xMax,
          },
          {
            value: xMax / -2,
          },
          {
            value: xMax / 2,
          },
          {
            value: 0,
          },
        ],
        autoplay: false,
      }),
      anime({
        targets: inputRef2.current,
        border: '1px solid red',
        easing: 'linear',
        duration: 500,
        autoplay: false,
      }),
    ];
  }, []);

  const handleChange = (e) => {
    setIsTextEmpty(false);
    setUser(e.target.value);
  };

  const handleAdd = () => {
    if (!user) {
      inputRef.current.forEach((a) => a.restart());
      setIsTextEmpty(true);
      //   setTimeout(() => {
      //     setIsTextEmpty(false);
      //   }, 2000);
      return;
    }
    setUser('');
    navigate('/pick');
  };

  return (
    <StyledContainer>
      <StyledMainHeader>
        <StyledTitle>
          <Sticker />
          <Coeat />
        </StyledTitle>
        <CustomStyledContent>
          <p className="bold">사용하실 닉네임을 입력해주세요</p>
          <p>이름이든, 별칭이든 다 괜찮아요</p>
        </CustomStyledContent>
      </StyledMainHeader>
      <StyledInput isFocus={isFocus} ref={inputRef}>
        <input
          type="text"
          maxLength="5"
          placeholder="코잇쟁이"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={user}
          onChange={handleChange}
          ref={inputRef2}
        />
        {!isTextEmpty && <p>*닉네임은 최대 다섯자까지만 가능해요 </p>}
      </StyledInput>
      <StyledWarnContainer>
        {isTextEmpty && (
          <CustomStyledAlertBox>
            <p>닉네임을 입력해주세요!</p>
            <img src={CloseImg} alt="Close Img" />
          </CustomStyledAlertBox>
        )}
      </StyledWarnContainer>
      <CustomStyledMainButton onClick={handleAdd}>
        <span>Let`s COEAT!</span>
        <GoIcon />
      </CustomStyledMainButton>
    </StyledContainer>
  );
};

export default Setting;

const CustomStyledContent = styled(StyledContent)`
  margin-top: 16rem;
  font-weight: 400;
  .bold {
    font-weight: 700;
  }
`;

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50rem;
  height: 8rem;
  background-color: ${colors.gray};
  border-radius: 2rem;

  & > input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: ${(prop) => (prop.isFocus ? `1px solid ${colors.orange}` : 0)};
    outline: ${(prop) => (prop.isFocus ? `1px solid ${colors.orange}` : 0)};
    padding: 2.3rem 3.8rem;
    margin-bottom: 3.3rem;
    border-radius: 2rem;
  }

  & > p {
    font-size: 2rem;
    color: ${colors.orange};
  }
`;

const StyledWarnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  position: relative;
  top: -10rem;
`;

const CustomStyledAlertBox = styled(StyledAlertBox)`
  animation: fadeInOut 2s forwards;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const CustomStyledMainButton = styled(StyledMainButton)`
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;
  top: -13rem;
`;