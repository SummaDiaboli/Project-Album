import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css';
import store from './store'
import App from './pages/App';
import Firebase, { FirebaseContext } from './utils/Firebase'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <Router >
                <App />
            </Router>
        </FirebaseContext.Provider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
