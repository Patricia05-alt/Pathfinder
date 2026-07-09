import React from 'react'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Features from './components/Features'
import FAQ from './components/FAQ'
import HowItWorks from './components/HowItWorks'
import LogoCloud from './components/LogoCloud'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Assessment from './components/Assessment'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import './style.css'

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showAssessment, setShowAssessment] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Navbar onStartAssessment={() => setShowAssessment(true)} />
      <main>
        {showAssessment ? (
          <Assessment />
        ) : (
          <>
            <Hero isLoading={isLoading} onStartAssessment={() => setShowAssessment(true)} />
            <LogoCloud isLoading={isLoading} />
            <HowItWorks />
            <Features />
            <FAQ />
            <Footer />
          </>
        )}
      </main>
    </>
  )
}

ReactDOM.createRoot(document.querySelector<HTMLDivElement>('#app')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
