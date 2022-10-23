import { useEffect } from 'react';
import { Center, Container } from '../ts/styled';
import Calendar from '../component/Calendar';

function Home() {

  useEffect(() => {
  }, []);

  return (
    <Center>
      <Calendar />
    </Center>
  );
}
export default Home;