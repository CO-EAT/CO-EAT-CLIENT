import { ReactComponent as Coeat } from 'assets/logo.svg';
import { ReactComponent as Sticker } from 'assets/sticker.svg';
import { ReactComponent as GoIcon } from 'assets/go.svg';
import CheckImg from 'assets/check.png';
import CopyImg from 'assets/insert_link.png';
import { StyledContainer, StyledMainHeader, StyledTitle, StyledContent, StyledMainButton } from 'pages/MainPage';
import styled from 'styled-components';

const HostPage = () => {
  return (
    <StyledContainer>
      <StyledMainHeader>
        <StyledTitle>
          <Sticker />
          <Coeat />
        </StyledTitle>
        <CustomStyledContent>
          <img src={CheckImg} alt="CheckImg" />
          <p>방이 만들어졌습니다!</p>
          <p className="big">링크를 공유해보세요!</p>
          <p className="small">오늘 같이 식사를 할 코잇러에게 링크를 공유하여</p>
          <p className="small">식사메뉴를 함께 정해보세요!</p>
        </CustomStyledContent>
      </StyledMainHeader>
      <StyledLinkContainer>
        <span>www.coeat.com/roomid=123kjdl</span>
        <button>
          <img src={CopyImg} alt="Copy Img" />
        </button>
      </StyledLinkContainer>
      <CustomStyledMainButton>
        <button>
          <span>Let`s COEAT!</span>
        </button>
        <GoIcon />
      </CustomStyledMainButton>
    </StyledContainer>
  );
};

export default HostPage;

const CustomStyledContent = styled(StyledContent)`
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

const CustomStyledMainButton = styled(StyledMainButton)`
  & > button {
    padding: 0;
  }
`;

const StyledLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 5rem 4rem 3rem;
  margin-top: 4.3rem;
  width: 50rem;
  height: 8rem;
  border-radius: 2rem;
  background-color: #f4f5f6;

  & > span {
    font-size: 2.8rem;
    margin-right: 2rem;
    color: #5b5b5b;
  }

  & > button {
    border: 0;
    background-color: transparent;
    cursor: pointer;

    & > img {
      width: 4.5rem;
      height: 4.5rem;
    }
  }
`;
