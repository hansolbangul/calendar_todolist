import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isTodoAtom } from '../atoms';
import { TypeList } from '../DB/TypeDb';
import eventBus from '../eventBus/bus';
import { IDate, ITodo } from '../ts/interface';
import { Flex, intFrameWidth } from '../ts/styled';

interface IModal { detail: { visible: boolean, today: IDate, edit: boolean } }

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
  const [id, setId] = useState<number>(0)

  const [isEdit, setIsEdit] = useState<boolean>(false)

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
      type: type
    }])
    handleClose()
  }

  const typeSelect = useCallback(() => {
    return (<Flex style={{ flexWrap: 'wrap' }}>
      {typeList.map(item => <Label
        htmlFor={'chk' + item.id}
        color={item.color} key={item.id} >
        <Input id={'chk' + item.id} type={'radio'} checked={type === item.id} value={item.id} onChange={() => setType(item.id)} />{item.title}
      </Label>)}
    </Flex>
    )
  }, [type, typeList])

  const dateForm = useCallback(() => {
    return (
      <>
        <Text>DATE</Text>
        <TextInput type={'date'} value={start} onChange={(e) => setStart(e.target.value)} />
      </>
    )

  }, [start])

  const timeForm = useCallback(() => {
    return (
      <>
        <Text>TIME</Text>
        <TextInput type={'time'} value={time} onChange={(e) => setTime(e.target.value)} />
      </>
    )

  }, [time])

  const titleForm = useCallback(() => {
    return (
      <>
        <Text>TITLE</Text>
        <TextInput placeholder="이름없는 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      </>
    )

  }, [title])

  const setting = (value: IModal) => {
    const { detail: { today, visible, edit } } = value

    setStart(`${today.year}-${today.month < 10 ? '0' + today.month : today.month}-${today.date < 10 ? '0' + today.date : today.date}`)
    setTime(today.dateTime)

    if (edit && today.title && today.type !== undefined) {
      setTitle(today.title)
      setIsEdit(edit)
      setType(today.type)
      setId(today.id)
    }

    setShow(visible)
  }

  const editTodo = () => {
    setIsTodo(item => item.map(_item => _item.id === id ? {
      id: id,
      startDate: start,
      dateTime: time,
      title: title,
      type: type
    } : { ..._item }))
    handleClose()
  }

  const handleClose = () => {
    setShow(false)
    setType(0)
    setTitle('')
    setIsEdit(false)
    setType(0)
    setId(0)
  };

  return (
    <ModalForm onClick={handleClose} bottom={show}>
      <Modal onClick={e => e.stopPropagation()} bottom={show}>
        {typeSelect()}
        <Flex style={{ flexDirection: 'column' }}>
          {dateForm()}
          {timeForm()}
          {titleForm()}
        </Flex>
        {isEdit ? <Btn onClick={editTodo} >
          <Text>수정</Text>
        </Btn> : <Btn onClick={addTodo} >
          <Text>생성</Text>
        </Btn>}
        <CBtn onClick={handleClose} >
          <Text>닫기</Text>
        </CBtn>
      </Modal>
    </ModalForm>
  );
}

const ModalForm = styled.div<{ bottom: boolean }>`
  position: fixed;
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
  position: absolute;
  width: 370px;
  background-color: ${props => props.theme.backColor};
  border-radius: 10px;
  padding: 30px;
  color: ${props => props.theme.textColor};
  z-index: 999999;

  transition: all ease-out 0.3s;


  @media screen and (max-width: 500px) {
    /* width: ${intFrameWidth - 50}px; */
    width: calc(100% - 50px);
    flex-wrap: wrap;
    border: 1px solid ${props => props.theme.textColor};
  }

`

const Input = styled.input`
  font-size: 14px;
  `

const TextInput = styled(Input)`
  flex: 1 1 auto;
  margin: 10px 0;
`

const Text = styled.div`
  flex: 1 1 auto;
  `

const Label = styled.label<{ color: string }>`
  padding: 4px 10px 4px 0;
  border-radius: 30px;
  font-size: 14px;
  margin-right: 6px;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.colorOpacity === 1 ? '#' + props.color : `rgba(${parseInt(props.color.substring(0, 2), 16)}, ${parseInt(props.color.substring(2, 4), 16)}, ${parseInt(props.color.substring(4, 6), 16)}, ${props.theme.colorOpacity} )`}; // 배경만 투명
  margin-bottom: 20px;
  `

const Btn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 20px;
  background-color: ${props => props.theme.modalBtnColor};
  color: ${props => props.theme.textColor};
  cursor: pointer;
  margin-top: 10px;
  `

const CBtn = styled(Btn)`
  background-color: ${props => props.theme.calColor};
  color: ${props => props.theme.textColor};

`