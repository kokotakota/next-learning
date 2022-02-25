import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from "react-redux"
import { RootState } from 'store'

const sliceName = 'user'

export type User = {
  id?: string
  name?: string
}

export type UpdateNamePayload = string

const initialState: User = {}

export const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User>) {
      return payload
    },
    updateName(state, { payload }: PayloadAction<UpdateNamePayload>) {
      state.name = payload
    },
    reset(): User {
      return initialState
    },
  },
})

export const useUserSelector = () => useSelector((state: RootState) => state[sliceName])

/*
dispatchの手続きを一括で出力できないかやってみたが、actionの引数などの型情報がわからなくなるため断念
import { useDispatch } from "react-redux"
const dispatch = useDispatch()
export const useUserDispatches = () => {
  return Object.keys(userSlice.actions).reduce((result: any, key: string) => {
    type Keys = keyof typeof userSlice.actions
    result[key] = (args: any) => dispatch(userSlice.actions[key as Keys](args))
    return result
  }, {})
} */