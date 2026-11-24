import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import InscriptionPage from './pages/InscriptionPage'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscription" element={<InscriptionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
