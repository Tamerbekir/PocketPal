import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Calendar from './Pages/Calendar'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='calendar' element={<Calendar />} />
    </Routes>
  )
}

export default App
