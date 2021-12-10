import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ResultCard from 'components/ResultCard';
import PickInfo from 'components/PickInfo';
import Logo from 'assets/logo.svg';
import CuteLogo from 'assets/cute-meal-logo.png';
import { ReactComponent as Tooltip } from 'assets/tooltip.svg';
import { ReactComponent as RefreshBtn } from 'assets/refresh.svg';
import { ReactComponent as CloseBtn } from 'assets/close.svg';
import { ReactComponent as Clipboard } from 'assets/insert_link.svg';
import { colors } from 'constants/colors';
import { LESS_NOEAT } from 'constants/noeat-tooltip-text';
import useAPI from 'cores/hooks/useAPI';

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
  const { data, loading } = useAPI({
    method: 'GET',
    url: '/result',
  });

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const toggleTooltip = () => setIsTooltipOpen(!isTooltipOpen);
  const closeTooltip = () => setIsTooltipOpen(false);

  if (!data || loading) {
    return <Container>loading ...</Container>;
  }

  return (
    <Container>
      <img src={Logo} alt="" />
      <ResultHeader>
        <img src={CuteLogo} alt="" />
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
        <StyledTooltip>
          <TooltipBtn onClick={toggleTooltip}>
            <Tooltip />
          </TooltipBtn>
          {isTooltipOpen && (
            <TooltipText>
              <h5>LESS NOEAT</h5>
              <p>{parseFontWeightFromString(LESS_NOEAT)}</p>
              <StyledCloseBtn onClick={closeTooltip}>
                <CloseBtn />
              </StyledCloseBtn>
            </TooltipText>
          )}
        </StyledTooltip>
      </SecondaryResult>
      <ResultCardWrapper>
        <ColumnWrapper>
          <ResultCardHeader orange>MOST COEAT</ResultCardHeader>
          <ResultCard
            coEatCount={data.mostCoeatCount}
            noEatCount={data.mostNoeatCount}
            imgSrc={data.mostCoeatMenuImg}
            foodName={data.mostCoeatMenuName}
          />
        </ColumnWrapper>
        <ColumnWrapper>
          <ResultCardHeader>LESS NOEAT</ResultCardHeader>
          <ResultCard
            coEatCount={data.lessCoeatCount}
            noEatCount={data.lessNoeatCount}
            imgSrc={data.lessNoeatMenuImg}
            foodName={data.lessNoeatMenuName}
          />
        </ColumnWrapper>
      </ResultCardWrapper>
      <RefreshWrapper>
        <RefreshText>아직 결과가 안나왔나요? 새로고침을 눌러보세요!</RefreshText>
        <StyeldRefreshBtn>
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
            <label>링크공유</label>
            <button>
              <Clipboard />
            </button>
          </RightBox>
        </TotalEatHeader>
        <TotalEatGrid>
          {data.resultList.map((result) => (
            <PickInfo key={result.nickName} resultInfo={result} />
          ))}
        </TotalEatGrid>
      </TotalEatWrapper>
      {data.isHost && <CompleteBtn>COEAT COMPLETE</CompleteBtn>}
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
`;

const ResultHeader = styled.header`
  position: relative;
  padding: 8rem 0 0 0;

  & > img {
    width: 80%;
    position: absolute;
    top: 0;
    z-index: -1;
    opacity: 0.7;
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

  & b,
  & strong {
    font-weight: bold;
    font-family: 'Pretendard Variable';
  }

  & strong {
    color: ${colors.orange};
  }
`;

const SecondaryResult = styled.p`
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
`;

const ResultCardHeader = styled.h4`
  color: ${(props) => (props.orange ? colors.orange : colors.black)};
  font-family: 'Montserrat';
  font-size: 2.3rem;
  font-weight: bold;
`;

const ResultCardWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const StyledTooltip = styled.div`
  & > svg {
    width: 3rem;
    height: 3rem;
  }
  position: absolute;
  right: -5rem;
  top: 50%;

  transform: translateY(-50%);
`;

const TooltipBtn = styled.button`
  background-color: transparent;
  border: none;
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
`;

const RefreshWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RefreshText = styled.p`
  font-size: 2.2rem;
  line-height: 2.6rem;
  letter-spacing: -0.01rem;

  color: ${colors.subText};
`;

const StyeldRefreshBtn = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;

  & > svg {
    width: 2.6rem;
    height: 2.6rem;
  }
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
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;

  & > label {
    font-weight: bold;
    font-size: 2.4rem;
    letter-spacing: -0.01rem;
  }

  & > button {
    background-color: transparent;
    border: none;
  }
`;

const TotalEatTitle = styled.h5`
  font-size: 2.8rem;
  font-weight: bold;
`;

const TotalEatHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 2rem;
`;

const TotalMembers = styled.span`
  color: ${colors.subText};
  font-size: 2.4rem;
  letter-spacing: -0.01rem;

  & > b {
    color: ${colors.black};
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
  letter-spacing: -0.01rem;
`;

const StyledCloseBtn = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;

  background-color: transparent;
  border: none;
`;
