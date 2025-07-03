import React from 'react'
import { useSelector } from 'react-redux'

import LoaderComponent from 'src/components/organisms/Loader'

const Loader = () => {
  const { status } = useSelector(state => state.loader)

  return <LoaderComponent isLoading={status} />
}

export default Loader
