import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
  id: string
  name?: string
}

export type UpdateUserPayload = User
export type UpdateNamePayload = string

const initialState: User = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UpdateUserPayload>) {
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