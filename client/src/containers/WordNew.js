import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'

import { resourceCreateRequest } from '../store/word/actions'
import router from '../config/createRouter'
import WordNewComponent from '../components/pages/WordNew'

class WordNew extends Component {
  handleSubmit = () => {
    const { createWord, wordForm } = this.props

    createWord(wordForm.values)
      .then(() => router.navigate('word'))
  }

  render() {
    const { valid } = this.props

    return (
      <WordNewComponent
          isValidForm={valid}
          onSubmit={this.handleSubmit} />
    )
  }
}

const mapStateToProps = state => ({
  isCreating: state.word.isCreating,
  wordForm: state.form.word
})

const mapDispatchToProps = dispatch => ({
  createWord: data => dispatch(resourceCreateRequest({ data }))
})

WordNew.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  wordForm: PropTypes.object,
  valid: PropTypes.bool.isRequired
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'word' })
)(WordNew)
