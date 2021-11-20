import { useState } from 'react';
import styled from 'styled-components';
import Logo from 'assets/logo.svg';
import LogoPic from 'assets/logo-pic.svg';
import Arrow from 'assets/arrow.png';
import { ReactComponent as GoIcon } from 'assets/go.svg';
import FoodCard from 'components/FoodCard';
import { useNavigate } from 'react-router';

function MainPage() {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedCard, setSelectedCard] = useState('rrr');
  const [user, setUser] = useState('');
  const navigator = useNavigate();

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const mealCtgs = ['한식', '중식', '일식', '양식', '기타'];
  const coffeeCtgs = ['Coffee', 'Non-coffee', '기타'];

  const handleAdd = () => {
    if (!user) return;
    window.localStorage.setItem('user', user);
    setUser('');
    {
      selectedCard === 'meal'
        ? navigator('pick', { state: { selectedCard: selectedCard, categories: mealCtgs } })
        : navigator('pick', { state: { selectedCard: selectedCard, categories: coffeeCtgs } });
    }
  };

  return (
    <StyledContainer>
      <img className="logo_img" src={Logo} alt="logo" />
      <img className="logo_pic_img1" src={LogoPic} alt="logoPic1" />
      <img className="logo_pic_img2" src={LogoPic} alt="logoPic2" />
      <img className="arrow_img" src={Arrow} alt="arrow" />
      <div className="title">
        <span>함께 정하는 우리 메뉴</span>
      </div>

      <CardWrapper>
        <FoodCard type="meal" selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
        <FoodCard type="coffee" selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
      </CardWrapper>
      <StyledInput isFocus={isFocus}>
        <p>사용하실 닉네임을 입력해주세요.</p>
        <input
          type="text"
          placeholder="닉네임 입력"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={user}
          onChange={handleChange}
        />
      </StyledInput>
      <StyledButton>
        <GoIcon />
        <button onClick={handleAdd}>Let’s COEAT!</button>
      </StyledButton>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
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

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > p {
    font-size: 2rem;
    margin-top: 5.939rem;
    margin-bottom: 1.8rem;
  }

  & > input {
    width: 50rem;
    height: 6.4rem;
    border: ${(prop) => (prop.isFocus ? '1px solid #ff912d' : 0)};
    border-radius: 1.2rem;
    outline: 0;
    background-color: ${(prop) => (prop.isFocus ? '#fff' : '#f4f5f6')};
    padding: 2rem 2.5rem;
    margin-bottom: 8.4rem;
    font-size: 2rem;
    color: ${(prop) => (prop.isFocus ? '#ff912d' : '#989898')};
  }

  & > input::placeholder {
    font-size: 2rem;
    color: ${(prop) => (prop.isFocus ? '#ff912d' : '#989898')};
  }
`;

const StyledButton = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  & > button {
    border: 0;
    border-radius: 0.2rem;
    outline: 0;
    width: 28.1rem;
    height: 7.8rem;
    background-color: #ff912d;
    margin-bottom: 9.8rem;
    font-size: 2.4rem;
    font-weight: 700;
  }

  & > svg {
    position: absolute;
    top: -3rem;
    right: -2rem;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export default MainPage;
