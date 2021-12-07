import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/cute-logo.svg';
import tada from 'assets/img/tada.png';
import hot from 'assets/hot.png';
import ice from 'assets/ice.png';
import logo from 'assets/log-pic-white.png';
import { colors } from 'constants/colors';

function ResultPage() {
  return (
    <Container>
      <ResultView>
        <BackgroundImage>
          <img src={tada} alt="background-tada" />
        </BackgroundImage>
        <Logo />
        <ResultTitle>
          <b>모두가 만족</b>하는 <strong>카페 코잇!</strong>
        </ResultTitle>
        <ResultDate>2021-11-10</ResultDate>
        <ResultOrder>
          <ul>
            <li>
              <ReslutItem>
                <span>아메리카노</span>
                {/* 카페 데이터에서 받아오는 데이터 따라 img 렌더링 */}
                {/* {iceFrag ? <img /> : <img />}  */}
                <img src={ice} alt="" />
                <ResultCount>
                  COEAT
                  <span>6</span>
                </ResultCount>
              </ReslutItem>
            </li>
            <li>
              <ReslutItem>
                <span>아메리카노</span>
                {/* 카페 데이터에서 받아오는 데이터 따라 img 렌더링 */}
                {/* {iceFrag ? <img /> : <img />}  */}
                <img src={hot} alt="" />
                <ResultCount>
                  COEAT
                  <span>2</span>
                </ResultCount>
              </ReslutItem>
            </li>
            <li>
              <ReslutItem>
                <span>카페 라떼</span>
                {/* 카페 데이터에서 받아오는 데이터 따라 img 렌더링 */}
                {/* {iceFrag ? <img /> : <img />}  */}
                <img src={ice} alt="" />
                <ResultCount>
                  COEAT
                  <span>1</span>
                </ResultCount>
              </ReslutItem>
            </li>
          </ul>
          <ResultTotal>
            <span>TOTAL</span>
            <ResultCountTotal>
              COEAT
              <span>9</span>
            </ResultCountTotal>
          </ResultTotal>
        </ResultOrder>
        <ResultCompleteBtn>COEAT COMPLETE</ResultCompleteBtn>
      </ResultView>
      <img src={logo} alt="" />
    </Container>
  );
}

const Container = styled.main`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  & > img {
    width: 16.73rem;
    position: absolute;
    top: 71rem;
    left: 60rem;
  }
`;

const ResultView = styled.div`
  padding: 4rem;
  position: relative;
  border: 1px solid ${colors.cardBorder};
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 80%;
`;

const ResultTitle = styled.h2`
  margin-top: 2rem;
  font-size: 3.4rem;
  line-height: 5.3rem;
  letter-spacing: -0.01rem;
  font-weight: 400;

  & > strong {
    color: ${colors.orange};
    font-weight: bolder;
  }

  & > b {
    font-weight: bolder;
  }
`;

const ResultDate = styled.span`
  font-size: 1.8rem;

  letter-spacing: -0.01rem;

  color: #b0b0b0;
`;

const BackgroundImage = styled.div`
  width: 100%;
  position: absolute;
  top: -3%;
  left: 50%;
  transform: translateX(-80%);
  z-index: -10;

  & > img {
    max-width: 130%;
  }
`;

const ResultOrder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8.5rem;
  padding-bottom: 9rem;
  border-bottom: 1px dotted ${colors.cardBorder};

  & > ul {
    & > li {
      padding: 2.7rem 0;
      border-bottom: 1px dotted ${colors.cardBorder};
    }

    & > li:last-child {
      border-bottom: 1px solid ${colors.darkOrange};
    }
  }
`;

const ReslutItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2.2rem;
  line-height: 2rem;
  position: relative;

  & > img {
    width: 4rem;
    position: absolute;
    left: 10.5rem;
  }
`;

const ResultCount = styled.div`
  display: flex;
  position: relative;

  & > span {
    margin-left: 1.1rem;
    color: ${colors.darkOrange};
    font-weight: bolder;
    font-size: 2.4rem;
    line-height: 2rem;
  }
`;

const ResultTotal = styled.div`
  display: flex;
  margin-top: 5.5rem;
  font-size: 2.2rem;
  position: relative;
  right: 30px;

  & > span {
    position: absolute;
    right: 7rem;
    font-size: 3.4rem;
    font-weight: bolder;
  }
`;

const ResultCountTotal = styled.div`
  position: absolute;
  right: -4.5rem;

  & > span {
    margin-left: 1.1rem;
    color: ${colors.darkOrange};
    font-weight: bolder;
    font-size: 2.4rem;
    line-height: 3.8rem;
  }
`;

const ResultCompleteBtn = styled.button`
  position: relative;
  left: 28rem;
  width: 28rem;
  height: 7.1rem;
  border: 0;
  margin-top: 6rem;
  background-color: ${colors.darkOrange};
`;

export default ResultPage;
