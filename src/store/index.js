import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from './authReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    auth: authReducer,
});
const logger = store => {
    return next => {
        return action => {
            console.log('Dispatching actions', action);
            const result = next(action);
            console.log('next state', store.getState());
            return result;
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

export default store;