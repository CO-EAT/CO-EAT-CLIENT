import { ReactComponent as Sticker } from 'assets/sticker.svg';
import { ReactComponent as GoIcon } from 'assets/go.svg';
import CloseImg from 'assets/close.png';
import {
  StyledContainer,
  StyledMainHeader,
  StyledTitle,
  StyledContent,
  StyledMainButton,
  CustomLogo,
} from 'pages/MainPage';
import { StyledAlertBox } from 'components/LinkCopy';
import styled from 'styled-components';
import { colors } from 'constants/colors';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import anime from 'animejs/lib/anime.es.js';
import { client } from 'libs/api';
import useRoomInfo from 'cores/hooks/useRoomInfo';
import { applyMediaQuery } from 'styles/mediaQueries';

const Setting = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [user, setUser] = useState('');
  const [isTextEmpty, setIsTextEmpty] = useState(false);
  const [isMaxLength, setIsMaxLength] = useState(false);
  const navigate = useNavigate();
  const outerInputRef = useRef();
  const innerInputRef = useRef();
  const warnRefs = useRef(outerInputRef, innerInputRef);
  const { roomStateContext, setUserInfo } = useRoomInfo();
  const isHost = roomStateContext.userInfo.isHost;
  const inviteCode = roomStateContext.inviteCode;

  useEffect(() => {
    // input 미입력시, shake animation
    const xMax = 16;
    warnRefs.current = [
      anime({
        targets: outerInputRef.current,
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
        targets: innerInputRef.current,
        border: '1px solid orange',
        easing: 'linear',
        duration: 500,
        autoplay: false,
      }),
    ];
    return () => {
      warnRefs.current = null;
    };
  }, []);

  const createUser = async () => {
    if (isHost) {
      //Host 유저 생성
      const hostUser = await client.post(`/group`, { hostName: user });
      return hostUser.data.data[0].inviteCode;
    } else {
      // 일반 유저 생성
      await client.post(`/user/${inviteCode}`, { nickname: user });
    }
  };
  //   maxLength가 적용되지 않는 경우를 위한 filter
  const isUserValid = () => {
    return !isTextEmpty && !isMaxLength;
  };

  const handleChange = (e) => {
    setIsMaxLength(false);

    if (e.target.value.length > 5) {
      setIsMaxLength(true);
    }
    setIsTextEmpty(false);
    setUser(e.target.value);
  };

  const handleAdd = async () => {
    if (!user) {
      warnRefs.current.forEach((a) => a.restart());
      setIsTextEmpty(true);
      return;
    }

    if (isUserValid()) {
      setUserInfo({
        nickname: user,
        isHost: isHost,
      });

      if (isHost) {
        // Host 유저를 생성한다.
        const newInviteCode = await createUser();
        navigate('/create', { state: newInviteCode });
      } else {
        // 일반 유저 생성
        await createUser();
        navigate('/pick');
      }
      setUser('');
    } else {
      warnRefs.current.forEach((a) => a.restart());
      setIsMaxLength(true);
      return;
    }
  };

  return (
    <StyledContainer>
      <StyledMainHeader>
        <CustomStyledTitle>
          <Sticker />
          <CustomLogo />
        </CustomStyledTitle>
        <CustomStyledContent>
          <p className="bold">사용하실 닉네임을 입력해주세요</p>
          <p>이름이든, 별칭이든 다 괜찮아요</p>
        </CustomStyledContent>
      </StyledMainHeader>
      <StyledInputContainer>
        <StyledInputField isFocus={isFocus} ref={outerInputRef}>
          <input
            type="text"
            placeholder="코잇쟁이"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            value={user}
            onChange={handleChange}
            ref={innerInputRef}
          />
          {isMaxLength && <p>*닉네임은 최대 다섯자까지만 가능해요 </p>}
        </StyledInputField>
        <StyledWarnContainer>
          {isTextEmpty && (
            <CustomStyledAlertBox>
              <p>닉네임을 입력해주세요!</p>
              <img src={CloseImg} alt="Close Img" />
            </CustomStyledAlertBox>
          )}
        </StyledWarnContainer>
      </StyledInputContainer>
      <CustomStyledMainButton onClick={handleAdd}>
        <span>Let`s COEAT!</span>
        <GoIcon />
      </CustomStyledMainButton>
    </StyledContainer>
  );
};

export default Setting;

const CustomStyledTitle = styled(StyledTitle)`
  ${applyMediaQuery('mobile')} {
    margin-right: 0;
    margin-bottom: 0;

    & > svg:first-child {
      display: none;
    }
  }
`;

const CustomStyledContent = styled(StyledContent)`
  margin-top: 16rem;
  font-weight: 400;
  .bold {
    font-weight: 700;
  }

  ${applyMediaQuery('mobile')} {
    margin-top: 4.8rem;
    margin-bottom: 7.2rem;
  }
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  margin-bottom: 9rem;
`;

const StyledInputField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50rem;
  height: 8rem;
  background-color: ${colors.gray};
  border-radius: 2rem;
  position: relative;

  & > input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: ${(prop) => (prop.isFocus ? `1px solid ${colors.orange}` : 0)};
    outline: none;
    padding: 2.3rem 3.8rem;
    margin-bottom: 3.3rem;
    border-radius: 2rem;

    &:focus {
      -webkit-appearance: none;
      box-shadow: 0 0 0 1pt ${colors.orange};
    }
  }

  & > p {
    font-size: 2rem;
    color: ${colors.orange};
  }

  ${applyMediaQuery('mobile')} {
    display: inline;
    width: calc(100% - 2rem);
    height: 6rem;

    & > input {
      padding: 2rem 2.4rem;
      font-size: 16px;
    }

    & > p {
      font-size: 15px;
      margin-right: 20%;
    }
  }
`;

const StyledWarnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 7.6rem;
  width: 100%;
  height: 5rem;
  position: relative;
  top: -10rem;

  ${applyMediaQuery('mobile')} {
    width: 80%;
    top: 2rem;
  }
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
  top: -15rem;

  ${applyMediaQuery('mobile')} {
    width: fit-content;
    height: fit-content;
    padding: 1.7rem 4.9rem;

    & > svg {
      display: none;
    }

    & > span {
      font-size: 16px;
    }
  }
`;
