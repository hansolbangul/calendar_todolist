import React, { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isTodoAtom } from "../atoms";
import { TypeList } from "../DB/TypeDb";
import { ITodo } from "../ts/interface";
import { Color, Flex } from "../ts/styled";
import { TodoList } from "./TodoList";

const Calendar = () => {
  const isTodo = useRecoilValue<ITodo[]>(isTodoAtom)
  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };
  const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; //일주일
  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜
  const [props, setProps] = useState({
    year: today.year,
    month: today.month,
    date: today.date,
    dateTime: '10:00'
  })

  const prevMonth = useCallback(() => {
    //이전 달 보기 보튼
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth]);

  const nextMonth = useCallback(() => {
    //다음 달 보기 버튼
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth]);

  const dayChange = (month: number, date: number) => {
    setProps({
      year: selectedYear,
      month: month,
      date: date,
      dateTime: '10:00'
    })
  }

  const returnWeek = useCallback(() => {
    //요일을 반환하는 함수
    let weekArr: object[] = [];
    week.forEach((v, index) => {
      weekArr.push(
        <CalDay week
          key={v}
        >
          <Day>
            <Today sun={index === 0}>
              {v}
            </Today>

          </Day>
        </CalDay>
      );
    });
    return weekArr;
  }, []);

  const returnDay = useCallback(() => {
    //선택된 달의 날짜들 반환 함수
    let dayArr = [];
    let prev = 0
    let month = 0
    let date = 0
    const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    for (const nowDay of week) {
      if (week[day] === nowDay) {
        for (let i = 0; i < dateTotalCount; i++) {
          date = i + 1
          const tagArr = isTodo.filter(item => new Date(item.startDate).getTime() === new Date(`${selectedYear}-${selectedMonth}-${date}`).getTime())
          dayArr.push(
            <CalDay
              onClick={() => dayChange(selectedMonth, i + 1)} sun={(day + i + 1) % 7 === 1 || (day + i + 1) % 7 === 0}
              key={i + 1}
            >
              <Day>
                <Today
                  sun={(day + i + 1) % 7 === 1 || (day + i + 1) % 7 === 0}
                  select={selectedMonth === props.month && props.date === i + 1}>
                  {date === 1 ? selectedMonth + '월 ' : ''}{date}일
                </Today>
              </Day>
              {tagArr.length > 0 && <ColorTag>{tagArr.map(item => {
                const type = TypeList.find(value => value.id === item.type)
                return <Color key={item.id} color={'#' + type?.color} title={`${type?.color} 카테고리`} />
              })}</ColorTag>}
            </CalDay>
          );
        }

        // 다음 달 미리 몇개 넣기
        for (let i = 0; (1 + dayArr.length) % 7 !== 1; i++) {
          date = i + 1
          month = selectedMonth === 12 ? 1 : selectedMonth + 1
          dayArr.push(
            <CalDay
              key={i + 200}
            >
              <Day>
                <Today type={1}>
                  {date === 1 ? month + '월 ' : ''}{date}일
                </Today>
              </Day>
            </CalDay>
          );
        }
        break
      } else {
        if (dayArr.length === 0) {
          if (selectedMonth === 1) {
            prev = new Date(selectedYear - 1, 12, 0).getDate();
          } else {
            prev = new Date(selectedYear, selectedMonth - 1, 0).getDate();
          }
          for (let i = 0; i < week.indexOf(week[day]); i++) {
            date = prev - week.indexOf(week[day]) + i + 1
            dayArr.push(
              <CalDay
                key={i + 300}
              >
                <Day>
                  <Today type={1}>
                    {date}일
                  </Today>
                </Day>
              </CalDay>
            );
          }
        }
      }
    }

    return dayArr;
  }, [selectedYear, selectedMonth, dateTotalCount, props, isTodo]);

  return (
    <Contain>
      <CalLine>
        <MainTitle>TODO LIST</MainTitle>
        <CalRows bottom='2px'>
          {returnWeek()}
        </CalRows>
        <CalRows>
          {returnDay()}
        </CalRows>
      </CalLine>
      <TodoList prevMonth={prevMonth} nextMonth={nextMonth} item={props} now={{ year: selectedYear, month: selectedMonth }} />
    </Contain>
  );
};

export default Calendar;

const MainTitle = styled.div`
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  

  @media screen and (max-width: intFrameWidth) {
    margin-top: 20px;
    flex-wrap: wrap;
    /* font-size: 12px; */
  }

`

const Contain = styled(Flex)`
  display: flex;
  margin-top: 40px;

  @media screen and (max-width: 500px) {
    margin-top: 0;
    flex-wrap: wrap;
    font-size: 12px;
  }
`;

const CalLine = styled.div`
  padding: 20px 6px 6px 6px;
  width: 800px;
  background-color: ${props => props.theme.calColor}; 
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 500px) {
    padding: 20px;
    width: 100%;
  }
`

const CalRows = styled.div<{ bottom?: string }>`
  width: 100%;
  margin-bottom: ${props => props.bottom};
  display: flex;
  flex-wrap: wrap;
  row-gap: 2px;
  column-gap: 2px;
`

const CalDay = styled.div<{ week?: boolean, sun?: boolean }>`
  width: calc((100% - 12px) / 7);
  padding: 5px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: ${props => props.week ? '30px' : '100px'};
  
  &:hover{
    opacity: 0.3;
    cursor: pointer;
  }
`

const Day = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Today = styled.div<{ select?: boolean, sun?: boolean, type?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 30px;
  background-color: ${props => props.select ? '#f59649': 'none'}; 

  color: ${props => props.type === 1 ? props.theme.prevNextColor : props.theme.textColor};
`

const ColorTag = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  row-gap: 6px;
  column-gap: 6px;
  flex-wrap: wrap;
  overflow: hidden;
`