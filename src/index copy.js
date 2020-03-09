import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';


ReactDOM.render(
    <Provider store={store}>
<Routes />

, document.getElementById('root'));
