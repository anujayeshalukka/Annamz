import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SplitHome from './pages/SplitHome'
import BakeryLanding from './pages/BakeryLanding'
import ClothingApp from './pages/ClothingApp'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplitHome />} />
        <Route path="/bakery" element={<BakeryLanding />} />
        <Route path="/clothing/*" element={<ClothingApp />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App
