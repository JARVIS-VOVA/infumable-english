import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import { ReduxField } from '../../atoms'
import { required } from '../../../validations/fieldLevelValidation'

const WordNewForm = ({ isValidForm, handleSubmit }) => (
  <>
    <Field
      name='word'
      label='Word'
      type='text'
      component={ReduxField}
      validate={required} />

    <Field
      name='translate'
      label='Translate'
      type='text'
      component={ReduxField}
      validate={required} />
  </>
)

export default WordNewForm
