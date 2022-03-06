import { useState } from 'react';
import styled, { css } from 'styled-components';
import ResultCard from 'components/ResultCard';
import PickInfo from 'components/PickInfo';
import Logo from 'assets/logo.svg';
import SmallLogo from 'assets/small-logo.svg';
import CuteLogo from 'assets/cute-meal-logo.png';
import MobilePaper from 'assets/falling-paper.svg';
import { ReactComponent as Tooltip } from 'assets/tooltip.svg';
import { ReactComponent as RefreshBtn } from 'assets/refresh.svg';
import { ReactComponent as CloseBtn } from 'assets/close.svg';
import { colors } from 'constants/colors';
import { LESS_NOEAT, MOST_COEAT } from 'constants/tooltip-text';
import useAPI from 'cores/hooks/useAPI';
import useRoomInfo from 'cores/hooks/useRoomInfo';
import Loader from 'components/common/Loader';
import LinkCopy from 'components/LinkCopy';
import { completeCoeat } from 'libs/api';
import { useNavigate } from 'react-router-dom';
import { applyMediaQuery } from 'styles/mediaQueries';
import Responsive from 'components/common/Responsive';
import useMedia from 'cores/hooks/useMedia';

const parseFontWeightFromString = (string) => {
  const [before, toBeBold, ...rest] = string.split('__');
  return (
    <>
      {before}
      <b>{toBeBold}</b>
      {rest}
    </>
  );
};

function ResultPage() {
  const { isMobile } = useMedia();
  const navigator = useNavigate();
  const {
    roomStateContext: {
      inviteCode,
      userInfo: { isHost, nickname },
    },
  } = useRoomInfo();

  const { data, loading, mutate, error } = useAPI(
    {
      method: 'GET',
      url: `/result/${inviteCode}`,
    },
    {
      inviteCode,
    },
  );

  const [isCompleted, setIsCompleted] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const openTooltip = () => setIsTooltipOpen(true);
  const closeTooltip = () => setIsTooltipOpen(false);

  const handleClickCompleteBtn = async () => {
    const result = await completeCoeat(inviteCode, nickname);
    if (result) {
      setIsCompleted(true);
      if (window) window.localStorage.removeItem('roomInfo');
      navigator('/done');
    }
  };

  if (error) {
    return <div>Something Wrong</div>;
  }

  if (data === '종료된 링크입니다.') navigator('/done');

  if (!data || loading) {
    return (
      <Container>
        <Loader overlay />
      </Container>
    );
  }

  return (
    <Container>
      <Responsive mobile>
        <LogoWrapper>
          <img src={Logo} className="main-logo" alt="logo" />

          <div>
            <img src={SmallLogo} className="small-logo" alt="small-logo" />
            <span>{nickname}님</span>
          </div>
        </LogoWrapper>
      </Responsive>
      <Responsive tablet desktop>
        <img src={Logo} alt="logo" />
      </Responsive>
      <ResultHeader>
        <img src={isMobile ? MobilePaper : CuteLogo} alt="" />
        <ResultTitle>
          <p>
            <b>오늘 코잇하실 식사</b>는 <strong>{data.mostCoeatMenuName}</strong>에요.
          </p>
          <p>
            <b>다함께 코잇</b>하러 가보실까요?
          </p>
        </ResultTitle>
      </ResultHeader>
      <SecondaryResult>
        더 많은 사람이 함께할 수 있는 <b>{data.lessNoeatMenuName}</b> 어떠세요?
        <Responsive tablet desktop>
          <StyledTooltip>
            <TooltipBtn onMouseEnter={openTooltip} onMouseLeave={closeTooltip}>
              <Tooltip />
            </TooltipBtn>
            {isTooltipOpen && (
              <TooltipText>
                <h5>MOST COEAT</h5>
                <p>{MOST_COEAT}</p>
                <h5>LESS NOEAT</h5>
                <p>{parseFontWeightFromString(LESS_NOEAT)}</p>
                <StyledCloseBtn onClick={closeTooltip}>
                  <CloseBtn />
                </StyledCloseBtn>
              </TooltipText>
            )}
          </StyledTooltip>
        </Responsive>
      </SecondaryResult>
      <ResultCardWrapper>
        <ColumnWrapper>
          <ResultCardHeader orange>MOST COEAT</ResultCardHeader>
          <ResultCard
            coEatCount={data.mostCoeatCount || 0}
            noEatCount={data.mostNoeatCount || 0}
            imgSrc={data.mostCoeatMenuImg}
            foodName={data.mostCoeatMenuName}
          />
        </ColumnWrapper>
        <ColumnWrapper>
          <ResultCardHeader>LESS NOEAT</ResultCardHeader>
          {isMobile && (
            <StyledTooltip>
              <TooltipBtn onClick={() => setIsTooltipOpen((currentOpen) => !currentOpen)}>
                <Tooltip />
              </TooltipBtn>
              {isTooltipOpen && (
                <TooltipText>
                  <h5>MOST COEAT</h5>
                  <p>{MOST_COEAT}</p>
                  <h5>LESS NOEAT</h5>
                  <p>{parseFontWeightFromString(LESS_NOEAT)}</p>
                  <StyledCloseBtn onClick={closeTooltip}>
                    <CloseBtn />
                  </StyledCloseBtn>
                </TooltipText>
              )}
            </StyledTooltip>
          )}
          <ResultCard
            coEatCount={data.lessCoeatCount || 0}
            noEatCount={+data.lessNoeatCount || 0}
            imgSrc={data.lessNoeatMenuImg}
            foodName={data.lessNoeatMenuName}
          />
        </ColumnWrapper>
        <Responsive mobile>
          <ResultCardBackgroundWrapper />
        </Responsive>
      </ResultCardWrapper>
      <RefreshWrapper>
        <RefreshText>아직 결과가 안나왔나요? 새로고침을 눌러보세요!</RefreshText>
        <StyeldRefreshBtn onClick={mutate} isLoading={loading}>
          <RefreshBtn />
        </StyeldRefreshBtn>
      </RefreshWrapper>
      <TotalEatWrapper>
        <TotalEatHeader>
          <LeftBox>
            <TotalEatTitle>모든 코잇 확인하기</TotalEatTitle>
            <Delimiter />
            <TotalMembers>참여 인원수 {data.peopleCount}명</TotalMembers>
          </LeftBox>
          <RightBox>
            {!isMobile && <label>링크공유</label>}
            <LinkCopy removeStyle isResultPage />
          </RightBox>
        </TotalEatHeader>
        <TotalEatGrid>
          {data.resultList.map((result) => (
            <PickInfo key={result.nickname} resultInfo={result} />
          ))}
        </TotalEatGrid>
      </TotalEatWrapper>
      {isHost && (
        <CompleteBtn disabled={isCompleted} isCompleted={isCompleted} onClick={handleClickCompleteBtn}>
          {isCompleted ? 'Completed!' : 'COEAT COMPLETE'}
        </CompleteBtn>
      )}
    </Container>
  );
}

export default ResultPage;

const Container = styled.main`
  width: 100%;
  padding: 2.5% 20%;

  display: flex;
  flex-direction: column;
  gap: 8rem;
  align-items: center;

  & > img {
    width: 10.9rem;
    margin-right: auto;
  }

  ${applyMediaQuery('mobile')} {
    padding: 10% 5%;
    gap: 45px;
  }
`;

const ResultHeader = styled.header`
  position: relative;
  padding-top: 8rem;

  & > img {
    width: 80%;
    position: absolute;
    top: 0;
    z-index: -1;
    opacity: 0.7;
  }
  ${applyMediaQuery('mobile')} {
    & > img {
      width: 100%;
    }
    width: 100%;
    padding-top: 50px;
  }
`;

const ResultTitle = styled.h2`
  position: relative;

  text-align: center;
  font-size: 5.2rem;
  line-height: 8rem;
  letter-spacing: -0.01rem;
  white-space: pre-line;
  font-weight: 400;

  ${applyMediaQuery('mobile')} {
    font-size: 22px;
    line-height: 34px;
  }

  & b,
  & strong {
    font-weight: bold;
    font-family: 'Pretendard Variable';
  }

  & strong {
    color: ${colors.orange};
  }
`;

const SecondaryResult = styled.div`
  position: relative;
  width: fit-content;
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: -0.01rem;
  border-radius: 33.5px;
  background-color: ${colors.gray};
  padding: 2rem 3rem;

  & > b {
    font-weight: bold;
  }

  ${applyMediaQuery('mobile')} {
    font-size: 15px;
    letter-spacing: -0.3px;
    padding: 10px 20px;
  }
`;

const ResultCardHeader = styled.h4`
  color: ${(props) => (props.orange ? colors.orange : colors.black)};
  font-family: 'Montserrat';
  font-size: 2.3rem;
  font-weight: bold;

  ${applyMediaQuery('mobile')} {
    font-size: 14px;
    letter-spacing: -0.01rem;
    color: ${(props) => (props.orange ? colors.orange : colors.noEatProgress)};
  }
`;

const ResultCardWrapper = styled.div`
  display: flex;
  gap: 2rem;

  ${applyMediaQuery('mobile')} {
    position: relative;
    width: 100%;
  }
`;

const ResultCardBackgroundWrapper = styled.div`
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  height: 140%;
  width: 100vw;
  background-color: ${colors.lightGray};
  z-index: -1;

  left: -5%;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  ${applyMediaQuery('mobile')} {
    position: relative;
    flex: 1;
  }
`;

const StyledTooltip = styled.div`
  & > svg {
    width: 3rem;
    height: 3rem;
  }
  position: absolute;
  right: -10%;
  top: 50%;

  transform: translateY(-50%);

  ${applyMediaQuery('mobile')} {
    & svg {
      width: 13px;
      height: 13px;
    }
    top: 0;
    right: 0;
    transform: unset;
  }
`;

const TooltipBtn = styled.button`
  background-color: transparent;
  border: none;

  ${applyMediaQuery('mobile')} {
    display: flex;
    align-items: center;
  }
`;

const TooltipText = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  transform: translate(calc(100% - 3rem), 100%);

  padding: 4rem;
  width: 56.2rem;
  background-color: ${colors.white};
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(143, 153, 163, 0.2);

  display: flex;
  flex-direction: column;
  gap: 2rem;

  & h5 {
    color: ${colors.noEatProgress};
    font-family: 'Montserrat';
    font-size: 2.3rem;
    font-weight: bold;
    letter-spacing: -0.01rem;
  }

  & p {
    font-size: 2rem;
    line-height: 154%;
    letter-spacing: -0.01rem;
    color: ${colors.black};
    white-space: pre-line;

    b {
      font-weight: bold;
    }
  }

  ${applyMediaQuery('mobile')} {
    width: 300px;
    position: absolute;

    bottom: 0;
    left: 100%;
    z-index: 1200;
    transform: translate(-100%, 100%);

    & h5 {
      font-size: 14px;
    }

    & p {
      font-size: 12px;
    }
  }
`;

const RefreshWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${applyMediaQuery('mobile')} {
    transform: translateY(-15px);
  }
`;

const RefreshText = styled.p`
  font-size: 2.2rem;
  line-height: 2.6rem;
  letter-spacing: -0.01rem;

  color: ${colors.subText};

  ${applyMediaQuery('mobile')} {
    font-size: 14px;
    line-height: 17px;
    color: ${colors.noEatProgress};
    letter-spacing: -0.1px;
  }
`;

const StyeldRefreshBtn = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;

  display: flex;
  align-items: center;

  & > svg {
    width: 2.6rem;
    height: 2.6rem;
    ${applyMediaQuery('mobile')} {
      & path {
        fill: ${colors.orange};
      }
      width: 15px;
      height: 15px;
    }
  }

  @keyframes rotate360 {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  ${(props) =>
    props.isLoading &&
    css`
      animation: rotate360 ease-in-out infinite 1s;
    `};
`;

const TotalEatWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  ${applyMediaQuery('mobile')} {
    width: 100%;
  }
`;

const RightBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;

  & > label {
    font-weight: bold;
    font-size: 2.4rem;
    letter-spacing: -0.01rem;
    min-width: fit-content;
  }

  & > button {
    background-color: transparent;
    border: none;
  }

  ${applyMediaQuery('mobile')} {
    width: 100%;
  }
`;

const TotalEatTitle = styled.h5`
  font-size: 2.8rem;
  font-weight: bold;

  ${applyMediaQuery('mobile')} {
    font-size: 20px;
    line-height: 24px;
  }
`;

const TotalEatHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 2rem;

  ${applyMediaQuery('mobile')} {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const TotalMembers = styled.span`
  color: ${colors.subText};
  font-size: 2.4rem;
  letter-spacing: -0.01rem;

  & > b {
    color: ${colors.black};
  }

  ${applyMediaQuery('mobile')} {
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0;
  }
`;

const TotalEatGrid = styled.ul`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const Delimiter = styled.div`
  border: 1px solid #c4c4c4;
  height: 2.4rem;
`;

const CompleteBtn = styled.button`
  background-color: ${colors.orange};
  color: ${colors.white};
  border: none;
  border-radius: 2px;
  padding: 3rem;

  font-size: 2.4rem;
  font-family: 'Montserrat';
  letter-spacing: -0.1px;

  &:disabled {
    cursor: auto;
  }

  ${(props) =>
    props.isCompleted &&
    css`
      background-color: ${colors.darkOrange};
    `};

  ${applyMediaQuery('mobile')} {
    font-size: 16px;
    line-height: 20px;

    padding: 19px 24px;
  }
`;

const StyledCloseBtn = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;

  background-color: transparent;
  border: none;
`;

export const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & img.main-logo {
    width: 107px;

    ${applyMediaQuery('mobile')} {
      width: 67px;
    }
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 8px;

    & > span {
      font-size: 14px;
      letter-spacing: -0.01rem;
    }
  }
`;
