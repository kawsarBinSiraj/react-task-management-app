import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import memberReducer from './memberReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	taskReducer,
	memberReducer,
	userReducer
});

export default rootReducer;
