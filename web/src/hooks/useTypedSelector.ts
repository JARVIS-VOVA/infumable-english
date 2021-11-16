import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootState } from 'Store/reducers'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
