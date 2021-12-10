import styled, { css } from 'styled-components';

import { colors } from 'constants/colors';

function PickInfo(props) {
  const { resultInfo } = props;
  const { nickName, likedMenu, unlikedMenu } = resultInfo;

  return (
    <StyledPickInfo>
      <StyledNickname>{nickName}</StyledNickname>
      <Delimiter />
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
  justify-content: space-evenly;

  border: 1px solid ${colors.cardBorder};
`;

const StyledNickname = styled.div`
  font-size: 2.8rem;
  line-height: 3.4rem;
  letter-spacing: -0.01rem;

  font-weight: bold;
  font-family: 'Pretendard Variable';
`;

const PickList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
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
  align-items: center;
  justify-content: center;
`;

const PickWrapper = styled.div`
  display: flex;
  align-items: center;
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
  border-bottom: 1rem solid ${colors.orange};
`;

const NoEatTitle = styled(Title)`
  border-bottom: 1rem solid ${colors.noEatProgress};
`;

const Delimiter = styled.div`
  border: 1px solid #e6e6e6;
  height: 50%;
`;

export default PickInfo;
