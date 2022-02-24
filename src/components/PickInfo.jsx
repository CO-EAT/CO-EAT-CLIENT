import styled, { css } from 'styled-components';

import { colors } from 'constants/colors';
import { applyMediaQuery } from 'styles/mediaQueries';
import useMedia from 'cores/hooks/useMedia';

function PickInfo(props) {
  const { isMobile } = useMedia();
  const { resultInfo } = props;
  const { nickname, likedMenu, unlikedMenu } = resultInfo;

  return (
    <StyledPickInfo>
      <NameWrapper>
        <StyledNickname>{nickname}</StyledNickname>
        {!isMobile && <Delimiter />}
      </NameWrapper>
      <PickWrapper>
        <CoEatTitle>COEAT</CoEatTitle>
        <PickList>
          {likedMenu.map((coeat) => (
            <PickElement coeat key={coeat}>
              {coeat}
            </PickElement>
          ))}
        </PickList>
      </PickWrapper>
      <PickWrapper>
        <NoEatTitle>NOEAT</NoEatTitle>
        <PickList>
          {unlikedMenu.map((noeat) => (
            <PickElement key={noeat}>{noeat}</PickElement>
          ))}
        </PickList>
      </PickWrapper>
    </StyledPickInfo>
  );
}

const StyledPickInfo = styled.li`
  width: 100%;
  height: 12.9rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;

  padding: 0 5rem;
  border: 1px solid ${colors.cardBorder};

  ${applyMediaQuery('mobile')} {
    flex-direction: column;
    align-items: flex-start;
    height: unset;
    min-height: 289px;

    padding: 17px 24px;
  }
`;

const StyledNickname = styled.div`
  width: 60%;
  text-align: center;
  font-size: 2.8rem;
  line-height: 3.4rem;
  letter-spacing: -0.01rem;

  font-weight: bold;
  font-family: 'Pretendard Variable';

  ${applyMediaQuery('mobile')} {
    font-size: 18px;
    line-height: 22px;
    width: unset;
  }
`;

const PickList = styled.ul`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 1rem;

  ${applyMediaQuery('mobile')} {
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    flex: unset;
  }
`;

const PickElement = styled.li`
  border-radius: 23.5px;
  ${(props) =>
    props.coeat
      ? css`
          background-color: ${colors.lightOrange};
          color: ${colors.orange};
        `
      : css`
          background-color: ${colors.gray};
          color: ${colors.subText};
        `};

  padding: 1rem 1.5rem;
  font-size: 1.8rem;
  line-height: 2.2rem;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  min-width: fit-content;

  ${applyMediaQuery('mobile')} {
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.03rem;
  }
`;

const PickWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
  flex: 2.5;

  ${applyMediaQuery('mobile')} {
    width: 100%;
    flex-direction: column;
    gap: 16px;
  }
`;

const NameWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
  gap: 3.5rem;
`;

const Title = styled.div`
  font-family: 'Montserrat';
  font-size: 1.8rem;
  line-height: 2.2rem;
  letter-spacing: -0.01rem;
  font-weight: bold;
`;

const CoEatTitle = styled(Title)`
  margin: 0 2.5rem;
  border-bottom: 1rem solid ${colors.orange};

  ${applyMediaQuery('mobile')} {
    margin: 0;
    margin-right: auto;
    border-bottom: 4px solid ${colors.orange};

    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.01rem;
  }
`;

const NoEatTitle = styled(Title)`
  margin: 0 2.5rem;
  border-bottom: 1rem solid ${colors.noEatProgress};

  ${applyMediaQuery('mobile')} {
    margin: 0;
    margin-right: auto;
    border-bottom: 4px solid ${colors.noEatProgress};

    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.01rem;
  }
`;

const Delimiter = styled.div`
  border: 1px solid #e6e6e6;
  height: 50%;
`;

export default PickInfo;
