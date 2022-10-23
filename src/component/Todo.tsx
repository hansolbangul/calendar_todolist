import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ITodo, IType } from "../ts/interface";
import { Color, Flex } from "../ts/styled";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";

interface IProps { item: ITodo, color: string | undefined, type: string | undefined }

export const Todo = ({ item, color, type }: IProps) => {
  const [show, setShow] = useState(false)
  const [opacity, setOpacity] = useState(false)

  useEffect(() => {
    if (show) {
      setTimeout(() => { setOpacity(true) }, 400)
    } else {
      setOpacity(false)
    }
  }, [show])

  return (
    <Column>
      <Contain>
        <Form>
          <Section style={{ justifyContent: 'space-between' }}>
            <Title>{item.title}</Title>
            <Flex>
              <Edit />
              <Del />
            </Flex>
          </Section>
          <Section style={{ justifyContent: 'space-between', padding: '0 4px' }}>
            <Date>{item.startDate} | {item.dateTime}</Date>
            <Color color={color} title={`${type} 카테고리`} />
          </Section>

        </Form>
        <Flex style={{ marginLeft: '6px' }}>{show ? <None onClick={() => setShow(false)}></None> : <More onClick={() => setShow(true)} />}</Flex>
      </Contain>
      {show && <ContentForm opacity={opacity ? 1 : 0} >
        <br />
        <Content>{item.content}</Content>
      </ContentForm>}
    </Column>
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

const More = styled(BsChevronDoubleDown)`
  cursor: pointer;
  &:hover {
    color: red;
  }
`
const None = styled(BsChevronDoubleUp)`
  cursor: pointer;
  &:hover {
    color: red;
  }
  
`

const ContentForm = styled(Flex) <{ opacity: number }>`
  flex-direction: column;
  opacity: ${props => props.opacity ? 1 : 0};
  visibility: ${props => props.opacity ? "visible" : "hidden"};
  transition: 0.4s all ease-in;
`

const Column = styled(Flex)`
  flex-direction: column;
  padding: 10px;
  box-shadow: 1px 1px 1px 1px #a5a5a5;
  border-radius: 10px;
  margin-bottom: 10px;
`

const Contain = styled(Flex)`
  align-items: center;
  justify-content: center;
`

const Form = styled(Flex)`
  flex-direction: column;

  cursor: pointer;
  flex: 1 1 auto;
  padding-right: 6px;
  border-right: 1px dashed black;
`

const Section = styled(Flex)`
  margin-bottom: 6px;
`

const Title = styled.h2`
  font-size: 20px;
`

const Date = styled.div`
  font-size: 12px;
`

const Content = styled.div`
  font-size: 12px
`