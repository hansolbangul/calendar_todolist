import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isTodoAtom } from "../atoms";
import { TypeList } from "../DB/TypeDb";
import eventBus from "../eventBus/bus";
import { ITime, ITodo } from "../ts/interface";
import { Flex } from "../ts/styled";
import { Todo } from "./Todo";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";

interface IItem extends ITime { dateTime: string }

interface IProps { item: IItem, prevMonth: () => void, nextMonth: () => void, now: { year: number, month: number } }

export const TodoList = ({ item, prevMonth, nextMonth, now }: IProps) => {
  const isTodo = useRecoilValue<ITodo[]>(isTodoAtom)
  const typeList = TypeList

  const modal = () => {
    eventBus.emit('modal', { visible: true, today: item, edit: false })
  }

  const listTodo = useCallback(() => {
    const tagArr = (isTodo.filter(value => {
      const dateList = value.startDate.split('-').map(Number)
      return new Date(dateList[0], dateList[1] - 1, dateList[2]).getTime() === new Date(item.year, item.month - 1, item.date).getTime()
    })
      .sort((a, b) => new Date(`${a.startDate} ${a.dateTime}`).getTime() - new Date(`${b.startDate} ${b.dateTime}`).getTime())
      .map(_item => {
        const type = typeList.find(value => value.id === _item.type)
        return <Todo key={_item.id} color={'#' + type?.color} type={type?.title} item={_item} ></Todo>
      }))

    return tagArr.length > 0 ? tagArr : <Todo none={true} ></Todo>

  }, [item, isTodo])

  return (
    <ListForm>
      <TopForm>
        <Prev onClick={prevMonth} />
        <Title>{now.year}년 {now.month}월</Title>
        <Next onClick={nextMonth} />
      </TopForm>
      <ColumnFlex>
        <Today>TODAY</Today>
        {listTodo()}
      </ColumnFlex>
      <Btn onClick={modal} ><BiPlusMedical /></Btn>
    </ListForm>
  )
}

const Prev = styled(BsChevronLeft)`
  cursor: pointer;

  &:hover{
    color: red;
  }
`

const Next = styled(BsChevronRight)`
  cursor: pointer;

  &:hover{
    color: red;
  }
`

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 0 10px;
`

const TopForm = styled(Flex)`
  align-items: center;
  height: 80px;
  justify-content: center;
`

const Today = styled.h2`
  font-size: 16px;
  margin-bottom: 24px;

`

const ListForm = styled.div`
  width: 300px;
  background-color: ${props => props.theme.backColor}; 
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 99;
  color: ${props => props.theme.textColor};

  @media screen and (max-width: 500px) {
    width: 100%;
  }
  `

const ColumnFlex = styled(Flex)`
  margin-top: 10px;
  flex-direction: column;
  padding: 40px;
  flex: 1 1 auto;
  height: 400px;
  border-radius: 6px;
  overflow: scroll;
`

const Btn = styled.button`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${props => props.theme.btnColor}; 
  color: ${props => props.theme.textColor};
  opacity: 0.5;

  cursor: pointer;

  &:hover {
    color: red;
  }
  `