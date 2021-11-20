import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as GoIcon } from 'assets/go.svg';

function MainPage() {
  const [isFocus, setIsFocus] = useState(false);
  const [user, setUser] = useState();

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleAdd = () => {
    if (!user) return;
    window.localStorage.setItem('user', user);
    setUser('');
  };

  return (
    <StyledContainer>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    width: 75rem;
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
    width: 281px;
    height: 78px;
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

export default MainPage;
