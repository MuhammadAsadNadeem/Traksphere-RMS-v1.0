import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispathchType, RootStateType } from './index'

export const useAppDispatch = () => useDispatch<AppDispathchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
