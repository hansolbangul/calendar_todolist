import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isTodoAtom } from '../atoms';
import { TypeList } from '../DB/TypeDb';
import eventBus from '../eventBus/bus';
import { IDate, ITodo } from '../ts/interface';
import { Flex } from '../ts/styled';

const Header = styled.div`
font-size: 1.5em;
`

const Body = styled.div`
  min-height: 160px;
  padding: 30px 0;
`
interface IModal { detail: { visible: boolean, today: IDate } }

export const AddModal = () => {
  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };
  const [typeList, setTypeList] = useState(TypeList)
  const [isTodo, setIsTodo] = useRecoilState<ITodo[]>(isTodoAtom)
  const [type, setType] = useState<number>(0)
  const [start, setStart] = useState<string>(`${today.year}-${today.month}-${today.date}`)
  const [time, setTime] = useState<string>(`${today.year}-${today.month}-${today.date}`)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const [show, setShow] = useState(false)

  useEffect(() => {
    eventBus.on('modal', setting)

    return () => {
      eventBus.remove('modal')
    }
  })


  const addTodo = () => {
    let id = 0 as number | undefined
    if (isTodo.length > 0) {
      id = isTodo.at(-1)?.id
    }
    setIsTodo(item => [...item, {
      id: id ? id + 1 : 0,
      startDate: start,
      dateTime: time,
      title: title,
      content: content,
      type: type
    }])
    handleClose()
  }
  console.log('type', type)

  const typeSelect = useCallback(() => {
    return (<Flex>
      {typeList.map(item => <Label
        htmlFor={'chk' + item.id}
        color={item.color} key={item.id} >
        <Input id={'chk' + item.id} type={'radio'} checked={type === item.id} value={item.id} onChange={() => setType(item.id)} />{item.title}
      </Label>)}
    </Flex>
    )
  }, [type, typeList])

  const dataForm = useCallback(() => {
    return (
      <Flex style={{ flexDirection: 'column' }}>
        <CenterFlex>
          <Text>시작 날짜</Text>
          <TextInput type={'date'} value={start} onChange={(e) => setStart(e.target.value)} />
        </CenterFlex>
        <CenterFlex>
          <Text>종료 날짜</Text>
          <TextInput type={'time'} value={time} onChange={(e) => setTime(e.target.value)} />
        </CenterFlex>
        <CenterFlex>
          <Text>제목</Text>
          <TextInput placeholder="이름없는 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        </CenterFlex>
        <CenterFlex>
          <Text>내용</Text>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </CenterFlex>
        <CenterFlex>
          <Btn onClick={addTodo}>저장</Btn>
        </CenterFlex>
      </Flex>
    )
  }, [start, time, title, content, type])

  const setting = (value: IModal) => {
    const { detail: { today, visible } } = value

    setStart(`${today.year}-${today.month < 10 ? '0' + today.month : today.month}-${today.date < 10 ? '0' + today.date : today.date}`)
    setTime(today.time)
    setShow(visible)

  }

  const handleClose = () => {
    setShow(false)
    setType(0)
    setTitle('')
    setContent('')
  };



  return (
    <ModalForm onClick={handleClose} bottom={show}>
      <Modal onClick={e => e.stopPropagation()} bottom={show}>
        {typeSelect()}
        {dataForm()}
      </Modal>
    </ModalForm>
  );
}

const Span = styled.span`
  margin-left: 20px;
`

const ModalForm = styled.div<{ bottom: boolean }>`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  bottom: ${props => props.bottom ? '0' : '-1200px'};
  background-color: transparent;
  overflow: hidden;
  transition: all ease-out 0.6s;
  z-index: 101;
`

const Modal = styled.div<{ bottom?: boolean }>`
  width: 370px;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  color: black;
  z-index: 999999;

  transition: all ease-out 0.3s;
`

const Input = styled.input`
  padding: 4px 6px;
  font-size: 14px;
  `

const TextInput = styled(Input)`
  width: 180px;
  margin-left: 10px;
  `

const Text = styled.div`
  flex: 1 1 auto;
  `

const CenterFlex = styled(Flex)`
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  `

const Label = styled.label<{ color: string }>`
  background-color: ${props => props.color};
  padding: 4px 10px 4px 0;
  border-radius: 30px;
  font-size: 14px;
  margin-right: 6px;
  color: #fff;
  margin-bottom: 10px;
  `

const Textarea = styled.textarea`
  resize: none;
  width: 180px;
  height: 200px;
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