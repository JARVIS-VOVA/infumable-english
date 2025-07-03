import { useDispatch, useSelector } from 'react-redux'

import Api from 'src/helpers/api'
import { loaderActions, termActions } from 'src/store/actions'
import showToastError from 'src/helpers/showToastError'

const useTerms = () => {
  const dispatch = useDispatch()

  const terms = useSelector(state => state.term.items)
  const isTermsFetching = useSelector(state => state.term.isFetching)

  const isTermsFetched = terms !== undefined

  const fetchTermsIfNotFetched = async () => {
    if (isTermsFetched) {
      return
    }

    try {
      dispatch(termActions.fetchRequest())
      dispatch(loaderActions.changeStatus({ status: true }))
      const response = await Api.Terms.fetch()
      dispatch(termActions.fetchSuccess(response.data))
    } catch (error) {
      showToastError(error)
    } finally {
      dispatch(loaderActions.changeStatus({ status: false }))
      dispatch(termActions.fetchFailed())
    }
  }

  const createTerms = async data => {
    try {
      dispatch(loaderActions.changeStatus({ status: true }))
      const response = await Api.Terms.create(data)
      dispatch(termActions.createSuccess(response.data))
    } catch (error) {
      showToastError(error)
    } finally {
      dispatch(loaderActions.changeStatus({ status: false }))
    }
  }

  const updateTerm = async data => {
    try {
      dispatch(loaderActions.changeStatus({ status: true }))
      const response = await Api.Terms.update(data)
      dispatch(termActions.updateSuccess(response.data))
    } catch (error) {
      showToastError(error)
    } finally {
      dispatch(loaderActions.changeStatus({ status: false }))
    }
  }

  const deleteTerm = async data => {
    try {
      dispatch(loaderActions.changeStatus({ status: true }))
      const response = await Api.Terms.delete(data)
      dispatch(termActions.deleteSuccess(data))
    } catch (error) {
      showToastError(error)
    } finally {
      dispatch(loaderActions.changeStatus({ status: false }))
    }
  }

  const importExcel = () => {
    alert('Excel import is not implemented')
  }

  return {
    fetchTermsIfNotFetched,
    terms,
    isTermsFetching,
    isTermsFetched,
    createTerms,
    updateTerm,
    importExcel,
    deleteTerm,
  }
}

export default useTerms
