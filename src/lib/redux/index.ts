import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import productReducer from "./slices/productSlice";

// Configuring redux-persist with TypeScript
const persistConfig = {
  key: "root",
  storage,
};

// Root reducer
const rootReducer = combineReducers({
  product: persistReducer(persistConfig, productReducer),
});

// Setup the store
const store = configureStore({
  reducer: rootReducer,
});

// Set up persistor
export const persistor = persistStore(store);

// Export store types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
