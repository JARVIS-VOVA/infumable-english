import React from 'react'

import { notFound } from '../../../assets/img'

import './styles.scss'

const NotFound = () => (
  <div id='not-found'>
    <h1 className='title'>404</h1>
    <img src={notFound} />
  </div>
)

export default NotFound
