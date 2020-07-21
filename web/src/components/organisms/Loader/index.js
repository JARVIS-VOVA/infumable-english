import React from 'react'

import StyledLoader from './styled'

const Loader = ({ isLoading }) => {
  const renderChildren = () => {
    if (!isLoading) return null

    return (
      <div className='ease'>
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      </div>
    )
  }

  return (
    <StyledLoader>
      {renderChildren()}
    </StyledLoader>
  )
}

export default Loader
