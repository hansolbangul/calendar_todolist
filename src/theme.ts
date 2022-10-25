import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  bgColor: 'black',
  textColor: '#fff',
  calColor: '#23243B', // 캘린더 색상
  btnColor: '#2A2B44', // 추가 버튼 색상
  backColor: '#35364e', // 할일 리스트 색상
  modalBtnColor: '#2f2f3f95', // 모달 버튼 색상
  colorOpacity: 1,
};

export const lightTheme: DefaultTheme = {
  bgColor: '#F8F9FA',
  textColor: 'black',
  calColor: '#fff',
  btnColor: '#FBF7DD',
  backColor: '#FAF7F0',
  modalBtnColor: '#EDDBC0',
  colorOpacity: 0.6,
};
