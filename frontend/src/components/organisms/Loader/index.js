import React from 'react'

// import './styles.scss'

const Loader = ({ loader }) => {
  if (!loader) return null

  return (
    <div id='loader'>
      <div className='ease'>
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      </div>
    </div>
  )
}

export default Loader
