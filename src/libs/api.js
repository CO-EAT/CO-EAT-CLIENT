import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://asia-northeast3-co-eat-server.cloudfunctions.net/api',
});

// 현재 사용가능한 초대링크(혹은 그룹)인지 확인하는 함수
export const requestEnterGroup = async (inviteCode) => {
  try {
    const group = await client.get(`/group/${inviteCode}`);
    let isDeleted = true;

    if (group.data.data.length > 0) {
      isDeleted = group.data.data[0].isDeleted;
    } else {
      // 초대코드가 존재하지 않은 경우
    }
    return isDeleted;
  } catch (error) {
    console.log(error);
  }
};

export const postMenuSelection = async (roomInfo, likedMenu, unlikedMenu) => {
  const { inviteCode, nickname } = roomInfo;
  try {
    const result = await client.post(
      `/menu/${inviteCode}/select`,
      {
        likedMenu,
        unlikedMenu,
      },
      {
        params: {
          nickname,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (result.status === 200) return true;
    return null;
  } catch (error) {
    return null;
  }
};

export const completeCoeat = async (inviteCode, nickname) => {
  try {
    const result = await client.put(`/result/${inviteCode}/complete`, {
      nickname,
    });

    if (result.status === 200) return true;
    return null;
  } catch (error) {
    return null;
  }
};
