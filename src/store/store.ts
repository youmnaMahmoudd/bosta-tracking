import { configureStore } from '@reduxjs/toolkit';
import { bostaApi } from './api/api';
import shipmentReducer from './slice/shipment.slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['shipment'],
};

const rootReducer = combineReducers({
  shipment: shipmentReducer,
  [bostaApi.reducerPath]: bostaApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(bostaApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
