import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "@/lib/features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { reportReducer } from "../features/report/reportSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["isAuthenticated", "user", "token"],
};

const reportPersistConfig = {
  key: "report",
  storage: storage,
  whitelist: ["report"],
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  report: persistReducer(reportPersistConfig, reportReducer),
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
