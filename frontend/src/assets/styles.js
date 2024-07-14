import { createTheme } from '@mui/material/styles'

const theme = createTheme()

const formStyles = {
  width: '100%',
  marginTop: theme.spacing(0),
}

const backdropStyles = {
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
}

const paperStyles = {
  margin: theme.spacing(0, 2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

export {
  formStyles, backdropStyles, paperStyles, theme
}