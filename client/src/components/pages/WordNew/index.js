import React from 'react'

import DefaultReduxFormButton from '../../atoms/DefaultReduxFormButton'
import WordNewForm from '../WordNewForm'

import './styles.scss'

const WordNew = ({ isValidForm, onSubmit }) => (
  <>
    <h1 className='title'>Word new</h1>

    <div className='word'>
      <div className='form'>
        <WordNewForm />
      </div>

      <div className='button'>
        <DefaultReduxFormButton
            isValidForm={isValidForm}
            onSubmit={onSubmit}>
          Create word
        </DefaultReduxFormButton>
      </div>
    </div>
  </>
)

export default WordNew
