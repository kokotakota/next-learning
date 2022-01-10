import { createContext, useContext } from 'react'
export const CountContext = createContext<number>(0)
export const useCountContext = () => useContext(CountContext)
