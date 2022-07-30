import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';


const persistConfig = {
	key: 'root',
	storage,
};

// persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// export store , persistor
let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };
