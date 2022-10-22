import React from 'react';
import ReactDOM from 'react-dom';

// recoil로 감싸야 사용 가능
import { RecoilRoot } from 'recoil';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
        <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
