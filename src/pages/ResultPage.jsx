import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/cute-logo.svg';
import tada from 'assets/img/tada.png';

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
      </ResultView>
    </Container>
  );
}

const Container = styled.main`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultView = styled.div`
  padding: 4rem;
  position: relative;
  border: 1px solid #dddddd;
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
    color: #ff7a00;
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

  & > img {
    max-width: 130%;
  }
`;

export default ResultPage;
