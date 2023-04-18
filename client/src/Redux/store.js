import { legacy_createStore,compose,applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./user/reducer";

const composer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers=combineReducers({
    user:userReducer
});

const store=legacy_createStore(rootReducers,composer(applyMiddleware(thunk)))
export {store}
