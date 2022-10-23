// react state 관리 라이브러리 recoil
// isDarkAtom 이란 state를 생성 키는 isDark 로 받아야 하며 값은 false

// recoil의 값을 받아올 땐 useRecoilValue(isDarkAtom)
// recoil의 값을 수정할땐 useSetRecoilState(isDarkAtom) 로 function 을 호출해서 사용

// recoil 값과 수정 둘다 하려면 useRecoilState(isDarkAtom) 를 사용 const [isDark, setIsDark] = useRecoilState(isDarkAtom)

import { recoilPersist } from 'recoil-persist'; // 리코일을 로컬 스토리지에 저장 (새로고침해도 안사라짐)
import { atom } from 'recoil';
const { persistAtom } = recoilPersist();

export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
  // effects_UNSTABLE: [persistAtom], // 새로고침 해도 안사라짐
});

export const isTodoAtom = atom({
  key: 'isTodo',
  default: [{
    id: 0,
    startDate: '2022-10-21',
    endDate: '2022-10-21',
    title: '배포하기',
    content: '만들어둔 사이트 배포하는 날',
    type: 2,
  },
  {
    id: 1,
    startDate: '2022-10-21',
    endDate: '2022-10-21',
    title: '정규회의',
    content: '12C 에서 회의하기',
    type: 1,
  },
  {
    id: 2,
    startDate: '2022-10-10',
    endDate: '2022-10-10',
    title: '개발하는 날',
    content: '개발',
    type: 2,
  },
  {
    id: 3,
    startDate: '2022-10-20',
    endDate: '2022-10-25',
    title: '코딩테스트 공부하기',
    content: '개발',
    type: 2,
  }],
  effects_UNSTABLE: [persistAtom], // 새로고침 해도 안사라짐
});