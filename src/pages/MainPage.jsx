import styled from 'styled-components';
import Logo from 'assets/logo.svg';
import LogoPic from 'assets/logo-pic.svg';
import Arrow from 'assets/arrow.png';

function MainPage() {
  return (
    <StyledContainer>
      <img className="logo_img" src={Logo} alt="logo" />
      <img className="logo_pic_img1" src={LogoPic} alt="logoPic1" />
      <img className="logo_pic_img2" src={LogoPic} alt="logoPic2" />
      <img className="arrow_img" src={Arrow} alt="arrow" />
      <div className="title">
        <span>함께 정하는 우리 메뉴</span>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  position: relative;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 19.9rem;
    left: 50%;
    transform: translate(-50%);
  }
  .title span {
    font-size: 2.8rem;
  }
  .logo_img,
  .logo_pic_img1,
  .logo_pic_img2,
  .arrow_img {
    position: absolute;
    transform: translate(-50%);
  }
  .logo_img {
    width: 20.9rem;
    height: 7.1rem;
    top: 10.3rem;
    left: 50%;
  }

  .logo_pic_img1 {
    width: 11.898rem;
    height: 11.898rem;
    top: 16.536rem;
    left: 33.814rem;
  }

  .logo_pic_img2 {
    width: 16.291rem;
    height: 16.291rem;
    top: 3.579rem;
    right: 33.043rem;
  }

  .arrow_img {
    width: 7.1rem;
    height: 7.1rem;
    top: 12.9rem;
    left: 55.4rem;
  }
`;

export default MainPage;
