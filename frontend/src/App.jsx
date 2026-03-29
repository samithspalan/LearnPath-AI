import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Assessments from './pages/Assessments'
import LearningPlans from './pages/LearningPlans'
import Progress from './pages/Progress'
import AiAssistant from './pages/AiAssistant'
import StrokeLogoLoader from './components/StrokeLogoLoader'
import StarBackground from './components/StarBackground'
import Footer from './components/Footer'
import './App.css';
import './styles/uiSystem.css';

function AppContent({ theme, onToggleTheme }) {
  const location = useLocation();
  const [showPageLoader, setShowPageLoader] = useState(true);
  const initialLoadRef = useRef(true);

  useEffect(() => {
    const isFirstLoad = initialLoadRef.current;
    setShowPageLoader(true);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setShowPageLoader(false);
      initialLoadRef.current = false;
    }, isFirstLoad ? 1400 : 350);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`app-container theme-${theme}`}>
      <StarBackground />
      <div className="bg-beam bg-beam-1"></div>
      <div className="bg-beam bg-beam-2"></div>
      <div className="bg-beam bg-beam-3"></div>

      {!(initialLoadRef.current && showPageLoader) && (
        <div className="app-content-wrapper">
          <Navbar theme={theme} onToggleTheme={onToggleTheme} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/assessments" element={<ProtectedRoute><Assessments theme={theme} /></ProtectedRoute>} />
          <Route path="/learning-plans" element={<ProtectedRoute><LearningPlans /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          <Route path="/ai-assistant" element={<ProtectedRoute><AiAssistant /></ProtectedRoute>} />
        </Routes>

        <Footer />
        </div>
      )}

      {showPageLoader && (
        <div className="route-loader-overlay" aria-live="polite" aria-label="Loading page">
          {initialLoadRef.current ? (
            <StrokeLogoLoader size={180} label="learning and beyond ..." fade="in" gradient={true} />
          ) : (
            <div className="fast-spinner"></div>
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('learnpath-theme') || 'dark')

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    localStorage.setItem('learnpath-theme', theme)
    document.body.classList.remove('theme-dark', 'theme-light')
    document.body.classList.add(`theme-${theme}`)
  }, [theme])

  return (
    <Router>
      <AppContent theme={theme} onToggleTheme={handleThemeToggle} />
    </Router>
  )
}

export default App
