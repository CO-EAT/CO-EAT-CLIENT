import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQueries';

function Basic({ modalTitle, modalBody, closeModal }) {
  return (
    <>
      <WarnTitle>{modalTitle}</WarnTitle>
      <WarnContent>{modalBody}</WarnContent>
      <CloseButton onClick={closeModal}>
        <span>확인</span>
      </CloseButton>
    </>
  );
}

const WarnTitle = styled.div`
  margin-top: 2.6rem;
  margin-bottom: 1rem;
  font-size: 2.8rem;
  font-weight: 700;

  font-family: 'Pretendard Variable';

  ${applyMediaQuery('mobile')} {
    font-size: 20px;
    line-height: 24px;
  }
`;

const WarnContent = styled.div`
  font-size: 2.2rem;
  margin-bottom: 4rem;

  font-family: 'Pretendard Variable';

  ${applyMediaQuery('mobile')} {
    font-size: 16px;
    line-height: 19px;
    color: #606060;
  }
`;

const CloseButton = styled.button`
  width: 16.3rem;
  height: 5.8rem;
  background-color: #ff7a00;
  border: none;
  font-size: 2.2rem;
  color: white;
  font-weight: 700;

  ${applyMediaQuery('mobile')} {
    width: 120px;
    height: 48px;

    & > span {
      font-family: 'Pretendard Variable';

      font-size: 16px;
      line-height: 19px;
    }
  }
`;

export default Basic;
