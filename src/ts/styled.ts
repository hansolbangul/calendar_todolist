import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const PostForm = styled.div`
  width: 600px;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  place-items: center;
`;

export const Flex = styled.div<{ position: string }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.position};
`;

export const Title = styled.div`
  font-size: 1.4rem;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;

export const LinkTitle = styled(Link)`
  font-size: 1.4rem;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;

export const Tag = styled.span`
  padding: 6px 8px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
`;

export const CreateAt = styled.div``;

export const Button = styled.button<{ color: string }>`
  padding: 6px 8px;
  background-color: #12b886;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  color: ${(props) => props.theme.bgColor};
`;
