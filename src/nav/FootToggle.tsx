import { useSetRecoilState } from 'recoil';
import { FaRegMoon } from 'react-icons/fa';
import styled from 'styled-components';
import { isDarkAtom } from '../atoms';

const Footer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  font-size: 15px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  box-shadow: 1px 1px 1px 1px gray;
  background-color: ${(props) => props.theme.bgColor};
  cursor: pointer;
`;

function FootToggle() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Footer onClick={toggleDarkAtom}>
      <FaRegMoon />
    </Footer>
  );
}
export default FootToggle;
