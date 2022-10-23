import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Container, Flex, TitleForm } from "../ts/styled";
import { TodoList } from "./TodoList";

const Calendar = () => {
  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };
  const week = ["일", "월", "화", "수", "목", "금", "토"]; //일주일
  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜
  const [props, setProps] = useState({
    year: today.year,
    month: today.month,
    date: today.date
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
      date: date
    })
  }

  const returnWeek = useCallback(() => {
    //요일 반환 함수
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
    console.log(week)
    const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    for (const nowDay of week) {
      console.log(day, week[day], nowDay)
      if (week[day] === nowDay) {
        for (let i = 0; i < dateTotalCount; i++) {
          date = i + 1
          dayArr.push(
            <CalDay
              onClick={() => dayChange(selectedMonth, i + 1)} sun={(day + i + 1) % 7 === 1 || (day + i + 1) % 7 === 0}
              key={i + 1}
            >
              <Day>
                <Today
                  sun={(day + i + 1) % 7 === 1 || (day + i + 1) % 7 === 0}
                  select={selectedMonth === props.month && props.date === i + 1}
                  today={selectedMonth === today.month && today.date === i + 1}>
                  {date === 1 ? selectedMonth + '월 ' : ''}{date}일
                </Today>
              </Day>
            </CalDay>
          );
        }

        // 다음 달 미리 몇개 넣기
        for (let i = 0; (1 + dayArr.length) % 7 !== 1; i++) {
          date = i + 1
          console.log(month)
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
          console.log(week.indexOf(week[day]))
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
  }, [selectedYear, selectedMonth, dateTotalCount, props]);

  return (
    <Container>
      <TitleForm>
        <Title>{selectedYear}년 {selectedMonth}월</Title>
        <div className="pagination">
          <button onClick={prevMonth}>◀︎</button>
          <button onClick={nextMonth}>▶︎</button>
        </div>
      </TitleForm>
      <Flex>
        <CalLine>
          <CalRows bottom='2px'>
            {returnWeek()}
          </CalRows>
          <CalRows>
            {returnDay()}
          </CalRows>
        </CalLine>
        <TodoList item={props} />
      </Flex>
    </Container>
  );
};

export default Calendar;

const CalLine = styled.div`
  padding: 6px;
  width: 800px;
  background-color: #404040;
  display: flex;
  flex-direction: column;
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
  background-color: ${props => props.sun ? '#1d1f2197' : '#1D1F21'};
  display: flex;
  flex-direction: column;
  align-items: center;

  height: ${props => props.week ? '30px' : '100px'};
  
  &:hover{
    background-color: ${props => props.sun ? '#1d1f2135' : '#1d1f2199'};
    cursor: pointer;
  }
`

const Day = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const Today = styled.div<{ today?: boolean, sun?: boolean, type?: number, select?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 30px;
  background-color: ${props => props.today ? '#f59649' : props.select ? '#5cefec' : 'none'};

  color: ${props => props.type === 1 ? '#ffffff6c' : props.sun ? '#ffffff6c' : '#fff'};
`

const Title = styled.div`
  font-size: 46px;
  font-weight: bold;
`