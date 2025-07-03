import { useSelector } from 'react-redux'

const useCurrentUser = () => {
  const currentUser = useSelector(state => state.currentUser.item)

  return {
    currentUser,
  }
}

export default useCurrentUser
