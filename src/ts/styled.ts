import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Center = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`

export const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
`;

export const TitleForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 800px;
`

export const Flex = styled.div`
  display: flex;
`

export const Div = styled.div``

export const Color = styled.div<{ color?: string }>`
  width: 10px;
  height: 10px;
  background-color: ${props => props.color};
`