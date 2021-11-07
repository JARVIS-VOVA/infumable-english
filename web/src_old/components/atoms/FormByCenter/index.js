import React from 'react'
import PropTypes from 'prop-types'

import StyledFormByCenter from './styled'

const FormByCenter = ({ children }) => <StyledFormByCenter>{children}</StyledFormByCenter>

FormByCenter.propTypes = {
  children: PropTypes.any.isRequired,
}

export default FormByCenter
