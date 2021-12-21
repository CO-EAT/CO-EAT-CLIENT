import { StyledContainer, StyledMainHeader, StyledTitle, StyledMainButton } from 'pages/MainPage';
import { ReactComponent as Coeat } from 'assets/logo.svg';
import { ReactComponent as Sticker } from 'assets/sticker.svg';
import Announcement from 'assets/announcement.jpg';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const NonExistLinkPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <StyledContainer>
      <StyledMainHeader>
        <StyledTitle>
          <Sticker />
          <Coeat />
        </StyledTitle>
        <CustomStyledContent>
          <img src={Announcement} alt="CheckImg" />
          <p>아쉽게도 해당 링크는</p>
          <p className="big">종료된 링크입니다!</p>
          <p className="small">방장이 해당 코잇방을 종료하여 참여가 불가능합니다. </p>
          <p className="small">다음 기회에도 꼭 코잇 참여바랄게요:)</p>
        </CustomStyledContent>
      </StyledMainHeader>
      <StyledMainButton onClick={handleClick}>
        <span>확인</span>
      </StyledMainButton>
    </StyledContainer>
  );
};

export default NonExistLinkPage;

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

  & > p:last-child {
    font-weight: normal;
  }

  .big {
    margin-top: 1.8rem;
    margin-bottom: 4.3rem;
    font-size: 4rem;
    font-weight: 700;
  }

  .small {
    font-size: 2.2rem;
    font-weight: normal;
    color: #5b5b5b;
  }
`;
