import { StyledContainer, StyledMainHeader, StyledTitle, StyledMainButton } from 'pages/MainPage';
import { ReactComponent as Coeat } from 'assets/logo.svg';
import { ReactComponent as Sticker } from 'assets/sticker.svg';
import Announcement from 'assets/announcement.jpg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function DonePage() {
  return (
    <StyledContainer>
      <StyledMainHeader>
        <StyledTitle>
          <Sticker />
          <Coeat />
        </StyledTitle>
        <CustomStyledContent>
          <img src={Announcement} alt="CheckImg" />
          <p className="big">COEAT COMPLETE</p>
          <p className="small">오늘의 코잇이 종료되었습니다</p>
          <p className="small">다음에 또 코잇하러 오세요~!</p>
        </CustomStyledContent>
      </StyledMainHeader>
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <StyledMainButton>
          <span>다시하기</span>
        </StyledMainButton>
      </Link>
    </StyledContainer>
  );
}

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
`;

export default DonePage;
