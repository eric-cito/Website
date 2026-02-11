import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { VisitedNodesProvider } from './context/VisitedNodesContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/home/HomePage'
import ProjectPage from './pages/project/ProjectPage'
import CVPage from './pages/cv/CVPage'

// Vite sets BASE_URL from config base (e.g. /Website/ on GitHub Pages)
const basename = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '')

function App() {
  return (
    <BrowserRouter basename={basename}>
      <VisitedNodesProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="project/:id" element={<ProjectPage />} />
            <Route path="cv" element={<CVPage />} />
          </Route>
        </Routes>
      </VisitedNodesProvider>
    </BrowserRouter>
  )
}

export default App
