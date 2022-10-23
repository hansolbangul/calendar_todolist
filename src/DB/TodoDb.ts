import { ITodo } from "../ts/interface";

export const TodoList: ITodo[] = [
  {
    id: 0,
    startDate: '2022-10-21',
    dateTime: '10:10',
    title: '배포하기',
    content: '만들어둔 사이트 배포하는 날',
    type: 2,
  },
  {
    id: 1,
    startDate: '2022-10-21',
    dateTime: '10:10',
    title: '정규회의',
    content: '12C 에서 회의하기',
    type: 1,
  },
  {
    id: 2,
    startDate: '2022-10-10',
    dateTime: '12:10',
    title: '개발하는 날',
    content: '개발',
    type: 2,
  },
  {
    id: 3,
    startDate: '2022-10-20',
    dateTime: '14:23',
    title: '코딩테스트 공부하기',
    content: '개발',
    type: 2,
  }
]