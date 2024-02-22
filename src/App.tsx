import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Button, Typography } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import styled from '@emotion/styled'
import { CloudUpload } from '@mui/icons-material'

const StyledButton = styled(Button)`
  color: #61dafb;
`

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  whitespace: nowrap;
  width: 1;
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography>
          Upload a <code>CSV</code> file to display data.
        </Typography>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
        >
          Upload File
          <VisuallyHiddenInput type="file" />
        </Button>
      </header>
    </div>
  )
}

export default App
