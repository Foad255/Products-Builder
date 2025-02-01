
import {BrowserRouter , Routes, Route } from 'react-router-dom'
// built in hoook
import { useColorModeValue} from "@/components/ui/color-mode"
import {Box} from '@chakra-ui/react'
import Home from './Home.jsx'
import Create from './Create.jsx'
import NavBar from './NavBar.jsx'
function App() {
  return (
    <>
    <Box minH={'100vh'} bg={useColorModeValue('gray.100', ' #1a1a1a')} >
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<Create />}></Route>
        </Routes>
      </BrowserRouter>
      
      </Box>

    </>
  )
}

export default App
