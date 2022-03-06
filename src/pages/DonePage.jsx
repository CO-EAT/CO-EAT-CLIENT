import { StyledContainer, StyledMainHeader, StyledTitle, StyledMainButton, CustomLogo } from 'pages/MainPage';
import { ReactComponent as Sticker } from 'assets/sticker.svg';
import Announcement from 'assets/announcement.jpg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { applyMediaQuery } from 'styles/mediaQueries';

function DonePage() {
  const navigator = useNavigate();
  const handleClick = () => {
    if (window) {
      const ls = window.localStorage;
      ls.removeItem('roomInfo');
    }

    navigator('/');
  };

  return (
    <StyledDoneContainer>
      <StyledMainHeader>
        <StyledTitle>
          <Sticker />
          <CustomLogo />
        </StyledTitle>
      </StyledMainHeader>
      <CustomStyledContent>
        <img src={Announcement} alt="CheckImg" />
        <p className="big">COEAT COMPLETE</p>
        <p className="small">오늘의 코잇이 종료되었습니다</p>
        <p className="small">다음에 또 코잇하러 오세요~!</p>
      </CustomStyledContent>
      <StyledMainButton onClick={handleClick}>
        <span>확인</span>
      </StyledMainButton>
    </StyledDoneContainer>
  );
}

const StyledDoneContainer = styled(StyledContainer)`
  justify-content: space-around;
`;

const CustomStyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    margin-top: 10rem;
    margin-bottom: 7rem;
  }

  & > p {
    font-size: 3.2rem;
  }

  p.big {
    margin-top: 1.8rem;
    margin-bottom: 4.3rem;
    font-size: 4rem;
    font-weight: 700;
  }

  p.small {
    font-size: 2.2rem;
    font-weight: normal;
    color: #5b5b5b;
    line-height: 160%;
  }

  ${applyMediaQuery('mobile')} {
    & > img {
      width: 45px;
      height: 45px;

      /* margin-top: 140px;
      margin-bottom: 31px; */
      margin: 0;
    }
  }
`;

export default DonePage;
