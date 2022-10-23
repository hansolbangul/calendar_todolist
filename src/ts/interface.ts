export interface IType {
  id: number;
  color: string;
  title: string;
}

export interface ITodo {
  id?: number;
  startDate: string;
  endDate: string;
  title: string;
  content: string;
  type: number;
}

export interface IDate { year: number; month: number; date: number; }