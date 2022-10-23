import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isTodoAtom } from "../atoms";
import { TypeList } from "../DB/TypeDb";
import eventBus from "../eventBus/bus";
import { IDate } from "../ts/interface";
import { Flex } from "../ts/styled";

interface IProps { item: IDate }

export const TodoList = ({ item }: IProps) => {
  const [isTodo, setIsTodo] = useRecoilState(isTodoAtom)
  const [typeList, setTypeList] = useState(TypeList)

  const modal = () => {
    eventBus.emit('modal', { visible: true, today: item })
  }

  const listTodo = useCallback(() => {


  }, [item, isTodo])

  return (
    <ListForm>
      <Btn onClick={modal} >일정 추가 </Btn>
      <ColumnFlex>
        {/* {listTodo()} */}
      </ColumnFlex>
    </ListForm>
  )
}

const ListForm = styled.div`
  width: 300px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  z-index: 99;
  `

const ColumnFlex = styled(Flex)`
  margin-top: 10px;
  border: 1px black dashed;
  flex-direction: column;
  flex: 1 1 auto;
  border-radius: 6px;
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
  `