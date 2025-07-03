import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import {
  Box,
  Button,
  IconButton,
  Link as MUILink,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import styled from '@emotion/styled'

import { useSession, useCurrentUser } from 'src/hooks'
import ROUTES from 'src/constants/routes'
import { ThemeModeContext } from 'src/contexts'
import { THEME_MODES } from 'src/theme'

const SIGNED_PAGES = [
  {
    path: ROUTES.root,
    pageName: 'Home',
  },
  {
    path: ROUTES.terms,
    pageName: 'Terms',
  },
  {
    path: ROUTES.addTerms,
    pageName: 'Add Terms',
  },
  {
    path: ROUTES.importTerms,
    pageName: 'Import Terms',
  },
  {
    path: ROUTES.tags,
    pageName: 'Tags',
  },
]

const StyledButton = styled(Button)({
  color: 'white',
  textTransform: 'none'
})

const Header = () => {
  const isDeleting = useSelector(state => state.session.isDeleting)
  const { themeMode, toggleThemeMode } = React.useContext(ThemeModeContext)
  const { onLogout } = useSession()
  const { currentUser } = useCurrentUser()

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', gap: 3 }}>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
      >
        <MenuIcon />
      </IconButton>

      <Box sx={{ flexGrow: 1 }}>
        <MUILink variant='contained' color='primary'
          component={Link}
          to={ROUTES.root}
        >
          Infumable English
        </MUILink>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <IconButton onClick={toggleThemeMode} aria-label='change theme'>
          {themeMode === THEME_MODES.light ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {_.isEmpty(currentUser) ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MUILink component={Link} to={ROUTES.signIn} color='secondary'>Sing In</MUILink>
            <MUILink component={Link} to={ROUTES.signUp}>Sing Up</MUILink>
          </Box>
        ) : (
          <>
            {SIGNED_PAGES.map(({ path, pageName }) => (
              <StyledButton variant='contained' color='primary' key={pageName} component={Link} to={path}>
                {pageName}
              </StyledButton>
            ))}

            <StyledButton variant='contained' color='primary' disabled={isDeleting} onClick={onLogout}>
              {isDeleting ? 'Logging out...' : 'Logout'}
            </StyledButton>
          </>
        )}
      </Box>
    </Box>
  )
}

export default Header
