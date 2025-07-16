import _ from 'lodash'
import toast from 'react-hot-toast'

const showToastError = error => {
  const errorMessage = _.get(error, 'data.error')
  const errorMessages = _.get(error, 'data.errors')

  if (errorMessage) {
    toast.error(errorMessage)
  } else if (errorMessages) {
    errorMessages.map(error => toast.error(error))
  } else {
    toast.error('Something went wrong')
  }
}

export default showToastError
