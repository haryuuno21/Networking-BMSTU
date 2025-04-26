import { useDispatch } from 'react-redux';
import type { AppDispatch } from './index.types'

export const useAppDispatch: () => AppDispatch = useDispatch;