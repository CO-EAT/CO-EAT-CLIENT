import styled from 'styled-components';
import Logo from 'assets/logo.svg';
import CuteLogo from 'assets/cute-meal-logo.png';

function ResultMealPage() {
  return (
    <StyledMealWrapper>
      <img src={Logo} alt="" />
      <div>
        <img src={CuteLogo} alt="" />
        <p>
          <b>오늘 코잇하실 식사</b>는 <span>불고기</span>에요. <br />
          <br />
          <b>다함께 코잇</b>하러 가보실까요?
        </p>

        <div>
          <b>스파게티, 피자</b>는 또 어떠세요?
        </div>
      </div>
    </StyledMealWrapper>
  );
}

export default ResultMealPage;

const StyledMealWrapper = styled.div`
  & > img {
    width: 10.9rem;
  }

  & > div {
    position: relative;

    & > img {
      width: 46.22rem;
    }

    & > p {
      position: relative;
      top: -25rem;
      font-size: 3.4rem;

      & > b {
        font-weight: bolder;
      }

      & > span {
        color: #ff912d;
        font-weight: bolder;
      }
    }

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      width: 30.7rem;
      height: 5.7rem;
      border: 0;
      border-radius: 2.65rem;
      background-color: #f4f5f6;
      position: absolute;
      top: 23rem;

      & > b {
        font-weight: bolder;
      }
    }
  }
`;
