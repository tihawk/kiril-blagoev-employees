import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import { IconButton, Link } from '@mui/material'

export default function NavBar() {
  return (
    <AppBar sx={{ textAlign: 'unset' }} position="absolute">
      <Toolbar>
        <Link
          variant="h6"
          underline="none"
          color="inherit"
          href="/"
          sx={{ flexGrow: 1 }}
        >
          EMPLOYEES
        </Link>
      </Toolbar>
    </AppBar>
  )
}
