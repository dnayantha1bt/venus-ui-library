import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer
});

const appReducer = (state, action) => {
    if (action.type === 'DO_LOGOUT_SUCCESS') {
        state = undefined;
    }
    return rootReducer(state, action);
};

export default appReducer;
