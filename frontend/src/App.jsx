import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Navbar } from './components/Navbar'
import Home from './pages/Home'
import { ThemeProvider } from "./components/theme-provider"
import SplitIt from './pages/SpliIt'
import Space from './pages/Space'
import AllSpaces from './pages/AllSpaces'

function App() {
 
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/" element={<Home />}/>
        <Route path='/splitit' element={<SplitIt />}/>
        <Route path='/space/:id' element={<Space />}/>
        <Route path='/my-spaces' element={<AllSpaces />}/>
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App