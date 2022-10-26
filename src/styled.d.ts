import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    calColor: string;
    btnColor: string;
    backColor: string;
    modalBtnColor: string;
    colorOpacity: number;
    prevNextColor: string;
  }
}
