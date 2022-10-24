import React from "react";
import styled from "styled-components";
import { ITodo } from "../ts/interface";
import { Color, Flex } from "../ts/styled";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { isTodoAtom } from "../atoms";
import { useRecoilState } from "recoil";
import eventBus from "../eventBus/bus";

interface IProps { item?: ITodo, color?: string | undefined, type?: string | undefined, none?: boolean }

export const Todo = ({ item, color, type, none }: IProps) => {
  const [isTodo, setIsTodo] = useRecoilState<ITodo[]>(isTodoAtom)

  if (none) return <Form><Title>일정이 없습니다.</Title></Form>

  const editTodo = () => {
    if (item) {
      const timeArr = item?.startDate.split('-').map(Number)
      eventBus.emit('modal', { visible: true, today: { year: timeArr[0], month: timeArr[1], date: timeArr[2], ...item }, edit: true })
    }
  }

  const delTodo = () => {
    setIsTodo(isTodo.filter(_value => _value.id !== item?.id))
  }

  return (
    <Flip id={item?.id ? `?${item?.id}` : '0'}>
      <Form className="card">
        <Front>
          <Color style={{ marginRight: '10px' }} color={color} title={`${type} 카테고리`} />
          <Title>{item?.title}</Title>
          <Date>{item?.dateTime}</Date>
        </Front>
        <Back>
          <Title>{item?.title}</Title>
          <Edit onClick={editTodo}></Edit>
          <Del onClick={delTodo}></Del>
        </Back>
      </Form>
    </Flip>
  )
}

const Edit = styled(AiOutlineEdit)`
  cursor: pointer;
  &:hover {
    color: red;
  }
  margin-right: 4px;
`
const Del = styled(AiOutlineDelete)`
  cursor: pointer;
  &:hover {
    color: red;
  }
`

const Flip = styled(Flex)`
  width: 100%;
  height: 10px;
  position: relative; 
  margin-bottom: 20px;
  &:hover .card{
    transform: rotateY(180deg);
  }
`

const Card = styled(Flex)`
  width: 100%;
  align-items: center;
  height: 100%;

  position: absolute;
  backface-visibility: hidden;
  display: flex;
`

const Front = styled(Card)`
`

const Back = styled(Card)`
  transform: rotateY(180deg);
`

const Form = styled(Flex)`
  width: 100%;
  height: 100%;
  position: relative;
  transition: .4s;
  transform-style: preserve-3d;

`

const Title = styled.h2`
  font-size: 14px;
  flex: 1 1 auto;
  white-space : nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Date = styled.div`
  font-size: 12px;
`