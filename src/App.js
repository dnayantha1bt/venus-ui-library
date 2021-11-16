import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Container from './containers';

const App = () => (
    <Provider store={store}>
        <Container />
    </Provider>
);

export default App;
