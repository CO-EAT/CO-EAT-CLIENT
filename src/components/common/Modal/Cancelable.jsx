import { colors } from 'constants/colors';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQueries';
import Basic from './Basic';

function Cancelable({ modalTitle, modalBody, buttonList }) {
  return <Basic modalTitle={modalTitle} modalBody={modalBody} buttonList={buttonList} />;
}

export const ConfirmButton = styled.button`
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
  ${applyMediaQuery('mini')} {
    width: 80px;
    height: 30px;

    & > span {
      font-family: 'Pretendard Variable';

      font-size: 16px;
      line-height: 19px;
    }
  }
`;

export const PrevButton = styled(ConfirmButton)`
  background-color: ${colors.prevBtnGray};
`;

export default Cancelable;
