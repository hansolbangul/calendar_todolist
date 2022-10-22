import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './nav/Header';
import Home from './routes/Home';

function Router() {
  return (
    <BrowserRouter>
      {/* <Header></Header> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
