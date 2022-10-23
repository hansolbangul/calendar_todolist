import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isTodoAtom } from "../atoms";
import { TypeList } from "../DB/TypeDb";
import eventBus from "../eventBus/bus";
import { IDate, ITodo } from "../ts/interface";
import { Flex } from "../ts/styled";
import { Todo } from "./Todo";

interface IProps { item: IDate }

export const TodoList = ({ item }: IProps) => {
  const [isTodo, setIsTodo] = useRecoilState<ITodo[]>(isTodoAtom)
  const [typeList, setTypeList] = useState(TypeList)

  const modal = () => {
    eventBus.emit('modal', { visible: true, today: item })
  }

  const listTodo = useCallback(() => {
    const tagArr = (isTodo.filter(value => new Date(value.startDate).getTime() === new Date(`${item.year}-${item.month}-${item.date}`).getTime())
      .sort((a, b) => new Date(`${a.startDate} ${a.dateTime}`).getTime() - new Date(`${b.startDate} ${b.dateTime}`).getTime())
      .map(_item => {
        const type = typeList.find(value => value.id === _item.type)
        return <Todo key={_item.id} color={type?.color} type={type?.title} item={_item} ></Todo>
      }))

    return tagArr.length > 0 ? tagArr : <NoneData>일정이 없습니다.</NoneData>

  }, [item, isTodo])

  return (
    <ListForm>
      <Btn onClick={modal} >일정 추가 </Btn>
      <ColumnFlex>
        {listTodo()}
      </ColumnFlex>
    </ListForm>
  )
}

const NoneData = styled.div`
  padding: 20px;
  text-align: center;
  border: 1px black dashed;
  border-radius: 10px;
`

const ListForm = styled.div`
  width: 300px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 99;
  `

const ColumnFlex = styled(Flex)`
  margin-top: 10px;
  flex-direction: column;
  flex: 1 1 auto;
  border-radius: 6px;
  max-height: 500px;
  
  overflow: scroll;
`


const Input = styled.input`
  padding: 4px 6px;
  font-size: 14px;
  `

const Btn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 20px;
  background-color: #f59649;
  color: #fff;

  cursor: pointer;
  `