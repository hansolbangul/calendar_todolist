export interface IType {
  id: number;
  color: string;
  title: string;
}

export interface ITodo {
  id: number;
  startDate: string;
  dateTime: string;
  title: string;
  type: number;
}

export interface ITime { year: number; month: number; date: number; }

export type IDate = ITime & ITodo