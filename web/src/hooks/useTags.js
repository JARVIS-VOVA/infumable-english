import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

import Api from 'src/helpers/api'
import { loaderActions, tagActions } from 'src/store/actions'
import showToastError from 'src/helpers/showToastError'

const useTags = () => {
  const dispatch = useDispatch()
  const isTagsFetching = useSelector(state => state.tag.isTagsFetching)
  const tags = useSelector(state => state.tag.items)

  const isTagsFetched = tags !== undefined

  const fetchTagsIfNotFetched = async () => {
    if (isTagsFetched) {
      return
    }

    try {
      dispatch(loaderActions.changeStatus({ status: true }))
      dispatch(tagActions.fetchRequest())
      const response = await Api.Tags.fetch()
      dispatch(tagActions.fetchSuccess(response.data));
    } catch (error) {
      dispatch(tagActions.fetchFailed())
    } finally {
      dispatch(loaderActions.changeStatus({ status: false }))
    }
  }

  const createTag = async data => {
    try {
      dispatch(loaderActions.changeStatus({ status: true }))
      dispatch(tagActions.createRequest())
      const response = await Api.Tags.create(data)
      dispatch(tagActions.createSuccess(response.data))
    } catch (error) {
      dispatch(tagActions.createFailed())
      showToastError(error)
    } finally {
      dispatch(loaderActions.changeStatus({ status: false }))
    }
  }

  const updateTag = async data => {
    try {
      dispatch(loaderActions.changeStatus({ status: true }))
      dispatch(tagActions.updateRequest())
      const response = await Api.Tags.update(data)
      dispatch(tagActions.updateSuccess(response.data))
    } catch (error) {
      dispatch(tagActions.updateFailed())
      showToastError(error)
    } finally {
      dispatch(loaderActions.changeStatus({ status: false }))
    }
  }

  const deleteTag = async data => {
    try {
      dispatch(loaderActions.changeStatus({ status: true }))
      dispatch(tagActions.deleteRequest())
      const response = await Api.Tags.delete(data)
      dispatch(tagActions.deleteSuccess(data))
    } catch (error) {
      dispatch(tagActions.deleteFailed())
      showToastError(error)
    } finally {
      dispatch(loaderActions.changeStatus({ status: false }))
    }
  }

  return {
    fetchTagsIfNotFetched,
    tags,
    isTagsFetching,
    isTagsFetched,
    createTag,
    deleteTag,
    updateTag,
  }
}

export default useTags
