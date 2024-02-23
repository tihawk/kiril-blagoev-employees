import logo from './logo.svg'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import FileSelect from './component/FileSelect'
import { Box, Container, Toolbar } from '@mui/material'
import Copyright from './component/Footer'
import NavBar from './component/Navbar'

function App() {
  return (
    <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          backgroundColor: 'gray',
          flexGrow: 1,
          height: '100vh',
          width: '100vw',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <FileSelect />
        </Container>
      </Box>
      <Box component="footer">
        <Copyright />
      </Box>
    </Box>
  )
}

export default App
