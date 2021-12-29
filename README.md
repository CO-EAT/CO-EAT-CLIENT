# COEAT Client Repository
![Group 5 (1)](https://user-images.githubusercontent.com/22493971/147690053-bf98db71-4fdd-41fd-9f35-7c2cc6dd25de.png)


## 서비스 소개
**모두가 행복한, 메뉴 취합 서비스**

오늘 뭐 먹을래? 아무거나는 이제 그만! _Let's COEAT!_

    오늘 이 메뉴만큼은 피하고 싶다! 하면 NOEAT을 눌러주세요.
    하단바를 클릭하면 다른 팀원들의 선택지를 참고할 수 있습니다.

    팀원들의 선택을 바탕으로 오늘 코잇할 메뉴가 정해지면
    못 먹는 메뉴는 제외하고, 함께 먹고 싶은 메뉴를 최종 결정해주세요.

    이젠 간단하게 COEAT 할 메뉴만 선택해주세요, 
    커피 못 드시는 분들도 걱정 마세요! 맘편히 논커피메뉴 COEAT하세요~ 
    메뉴 쌓기는 코잇이 해드릴게요~ 
    모두의 취향을 반영한 코잇 명세서로 간편하게 모아서 주문하세요!
    
    
## 팀원 정보
<table>
    <tr align="center">
        <td style="min-width: 150px;">
            <a href="https://github.com/KimKwon">
              <img src="https://github.com/KimKwon.png" width="100">
              <br />
              <b>권혁진 <br> (jjinny)</b>
            </a>
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/q-bit-junior">
              <img src="https://github.com/q-bit-junior.png" width="100">
              <br />
              <b>김규민 <br> (q-bit-junior)</b>
            </a> 
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/younyikim">
              <img src="https://github.com/younyikim.png" width="100">
              <br />
              <b>김연이 <br> (Younyi)</b>
            </a> 
        </td>
    </tr>
    <tr align="center">
        <td>
            찌니
        </td>
        <td>
            귬니 
        </td>
        <td>
            여니
        </td>
    </tr>
</table>

---

## 프로젝트 구성 (라이브러리 * 기술스택)

1. React
2. ESLint
3. Prettier
4. axios
5. styled-components
6. ContextAPI
7. animejs
8. styled-react-modal

## 디렉토리 구조

변경될 수 있습니다 ~ !

```bash
// src directory structure
├── App.jsx
├── assets
├── components
│   ├── CartModal.jsx
│   ├── EntryFoodCard.jsx
│   ├── FoodSelectionCard.jsx
│   ├── LinkCopy.jsx
│   ├── PickCartNav.jsx
│   ├── PickInfo.jsx
│   ├── PickedCard.jsx
│   ├── ResultCard.jsx
│   └── common
│       ├── Loader.jsx
│       └── WarnModal.jsx
├── constants
│   ├── categories.js
│   ├── colors.js
│   └── noeat-tooltip-text.js
├── cores
│   ├── contexts
│   │   └── RoomProvider.jsx
│   └── hooks
│       ├── useAPI.jsx
│       └── useRoomInfo.jsx
├── index.jsx
├── libs
│   └── api.js
├── pages
│   ├── DeprecatedResultPage.jsx
│   ├── HostPage.jsx
│   ├── MainPage.jsx
│   ├── NonExistLinkPage.jsx
│   ├── PickPage.jsx
│   ├── ResultPage.jsx
│   └── SettingPage.jsx
├── router.jsx
└── styles
    └── globalStyle.js
``` 

## 컨벤션
### 커밋 컨벤션 
|   Commit type              | Emoji                                         | Situation |
|:---------------------------|:----------------------------------------------|:----|
| Initial commit             | :tada: `:tada:`                               | 따단~~~~~ |
| feat                | :sparkles: `:sparkles:`                       | 새로운 기능, UI 등 | 
| bug                     | :bug: `:bug:`                                 |  버그 수정/리포트  |
| Documentation              | :memo: `:memo:`                             | 문서화 |
| refactor             | :hammer: `:hammer:`                           | 구조 변경, 리팩토링 |
| style              | 🎨 : `:art:`                           | css 관련 |
| remove or edit        | :fire: `:fire:`                               |  파일 삭제 및 수정 |
| fix lint                       | :shirt: `:shirt:`                             | eslint 에러 수정 | 
| init           | :construction:  `:construction:`              | 브랜치 첫 커밋 | 



### 브랜치 컨벤션

- 기능 추가 : feat/foodCard
- 버그 수정 : fix/layout
- 긴급 수정 : hotfix

