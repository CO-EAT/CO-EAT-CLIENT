import styled from 'styled-components';
import { ReactComponent as Coeat } from 'assets/logo.svg';
import { ReactComponent as Sticker } from 'assets/sticker.svg';
import { ReactComponent as Clip } from 'assets/clip.svg';
import { ReactComponent as RiceIcon } from 'assets/rice.svg';
import { ReactComponent as GoIcon } from 'assets/go.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { requestEnterGroup } from 'libs/api';
import useRoomInfo from 'cores/hooks/useRoomInfo';
import { applyMediaQuery } from 'styles/mediaQueries';

const MainPage = () => {
  const [isHost, setIsHost] = useState(false);
  const [searchParams] = useSearchParams();
  const { setInviteCode, setUserInfo } = useRoomInfo();

  const navigate = useNavigate();
  let inviteCode; // ** 테스트용 사용가능한 초대 코드 :  2F0-JV, wZ-GL- **

  useEffect(() => {
    if (window) window.sessionStorage.removeItem('roomInfo');
    inviteCode = searchParams.get('inviteCode');
    if (!inviteCode) setIsHost(true); // host인 경우
  }, []);

  const SetButtonValue = () => {
    if (isHost) {
      return '방 만들기';
    } else {
      return '참여하기';
    }
  };

  const handleClick = async () => {
    setUserInfo({
      nickname: '',
      isHost: isHost,
    });

    if (isHost) {
      navigate('/setting');
    } else {
      // 일반 참가자로 참여한 경우, 링크의 유효성 검사를 진행한다.
      if (!(await requestEnterGroup(inviteCode))) {
        // 링크가 유효한 경우, 다음 페이지로 이동
        setInviteCode(inviteCode);
        navigate('/setting');
      } else {
        // 링크가 유효하지 않은 경우
        navigate('/error');
      }
    }
  };

  return (
    <StyledContainer>
      <StyledMainHeader>
        <StyledTitle>
          <Sticker />
          <CustomLogo />
        </StyledTitle>
        <StyledContent>
          <p>우리 오늘 뭐 먹을래?</p>
          <p className="bold">이젠, 코잇으로 정해보세요</p>
        </StyledContent>
      </StyledMainHeader>
      <StyledMainBody>
        <Clip />
        <StyledBodyContent>
          <StyledBodyTitle>
            <RiceIcon />
            <span>HOW TO USE COEAT?</span>
          </StyledBodyTitle>
          <StyledBodyDesc>
            <StyledCoeat>
              <StyledLeft>
                <p>
                  오늘은 이 메뉴가 <em>먹고 싶다면?</em>
                </p>
                <p className="subtitle">최대 5개까지 코잇!</p>
              </StyledLeft>
              <StyledRight>COEAT</StyledRight>
            </StyledCoeat>
            <StyledCoeat>
              <StyledLeft>
                <p>
                  오늘 이 메뉴만큼은 <em>피하고 싶다면?</em>
                </p>
                <p className="subtitle">최대 5개까지 노잇!</p>
              </StyledLeft>
              <StyledRight noeat>NOEAT</StyledRight>
            </StyledCoeat>
          </StyledBodyDesc>
        </StyledBodyContent>
      </StyledMainBody>
      <StyledMainButton isHost={isHost} onClick={handleClick}>
        <span>
          <SetButtonValue />
        </span>
        <GoIcon />
      </StyledMainButton>
    </StyledContainer>
  );
};

export default MainPage;

export const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  ${applyMediaQuery('mobile')} {
    padding: 0 10%;
    justify-content: space-around;
  }
  height: 100%;
`;

export const StyledMainHeader = styled.header`
  margin-top: 10rem;

  ${applyMediaQuery('mobile')} {
    margin-top: 8rem;
  }
`;

export const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg:first-child {
    width: 15rem;
    height: 15rem;
  }

  ${applyMediaQuery('mobile')} {
    & > svg:first-child {
      display: none;
    }
  }
`;

export const CustomLogo = styled(Coeat)`
  ${applyMediaQuery('mobile')} {
    position: fixed;
    top: 8rem;
    left: 50%;
    transform: translateX(-50%);

    & {
      width: 13.5rem;
      height: 8.86rem;
    }
  }
`;
export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    font-size: 3rem;
    font-weight: 400;
    line-height: 4.5rem;
  }

  .bold {
    font-weight: 700;
  }

  ${applyMediaQuery('mobile')} {
    margin-top: 15.7rem;
    margin-bottom: 1rem;

    & > p {
      font-size: 20px;
      font-weight: 400;
      line-height: 30px;
    }
  }
`;

const StyledMainBody = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  position: relative;
  width: 100%;

  & > svg {
    position: relative;
    top: 1rem;
  }

  ${applyMediaQuery('mobile')} {
    margin-top: -4.5rem;

    & > svg {
      width: 25%;
      position: relative;
      top: 6%;
    }
  }
`;

const StyledBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 68rem;

  ${applyMediaQuery('mobile')} {
    width: calc(100% - 4.4rem);
  }

  border: 1.5rem solid #f5f5f5;
  border-radius: 4rem;
`;

const StyledBodyTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4.5rem;

  & > svg {
    width: 8rem;
    height: 8rem;
    margin-right: 2.5rem;
  }

  & > span {
    font-size: 3rem;
    font-weight: 700;
    margin-right: 10rem;
  }

  ${applyMediaQuery('mobile')} {
    margin-top: 3.7rem;

    & > svg {
      display: none;
    }

    & > span {
      display: none;
    }
  }
`;

const StyledBodyDesc = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6.1rem;

  ${applyMediaQuery('mobile')} {
    margin: 0;
  }
`;

const StyledCoeat = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4.3rem;

  ${applyMediaQuery('mobile')} {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 2.7rem;
  }

  font-size: 2.4rem;
  font-weight: 400;
  line-height: 2.8rem;
`;

const StyledLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-right: 7.4rem;

  .subtitle {
    font-size: 1.8rem;
    color: #888;
  }

  & > p {
    & > em {
      font-weight: 700;
    }
  }

  ${applyMediaQuery('mobile')} {
    margin: 0;

    & > p {
      font-size: 16px;
      text-align: center;
      line-height: 19.2px;
    }

    .subtitle {
      font-size: 14px;
      margin-bottom: 1.5rem;
    }
  }
`;

const StyledRight = styled.div`
  width: 16rem;
  height: 7.3rem;
  background-color: ${(props) => (props.noeat ? '#F5F5F5' : '#ffefe0')};
  color: ${(props) => (props.noeat ? '#888888' : '#ff7a00')};
  padding: 2.5rem 4.8rem;
  font-weight: 700;
  position: relative;
  top: -1rem;

  ${applyMediaQuery('mobile')} {
    width: fit-content;
    height: fit-content;
    text-align: center;
    font-size: 15px;
    padding: 0.8rem 2.4rem;
  }
`;

export const StyledMainButton = styled.button`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 6rem;
  margin-bottom: 11rem;
  width: 28rem;
  height: 7.8rem;
  padding: 2.4rem 9.3rem;
  background-color: #ff7a00;
  border: 0;

  & > span {
    font-size: 2.4rem;
    font-weight: 700;
    color: white;
  }
  & > svg {
    position: absolute;
    top: -5.8rem;
    right: -3rem;
    width: 10rem;
    height: 10rem;
  }

  ${applyMediaQuery('mobile')} {
    width: fit-content;
    height: fit-content;
    padding: 1.7rem 4.9rem;

    & > span {
      font-size: 16px;
    }

    & > svg {
      position: absolute;
      top: -3.3rem;
      right: -2rem;
      width: 6rem;
      height: 6rem;
    }
  }
`;
