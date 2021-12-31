import { createStore, combineReducers } from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userSlice } from 'store/user'

const rootReducer = combineReducers({
  user: userSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
  key: 'test',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)