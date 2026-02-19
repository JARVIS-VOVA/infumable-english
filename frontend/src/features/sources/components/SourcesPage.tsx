import React from 'react'
import { Navigate } from 'react-router-dom'
import ROUTES from 'src/constants/routes'

const SourcesPage: React.FC = () => {
  return <Navigate to={ROUTES.mySources} replace />
}

export default SourcesPage
