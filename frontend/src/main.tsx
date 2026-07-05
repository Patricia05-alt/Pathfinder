import React from 'react'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Hero from './components/Hero'
import Features from './components/Features'
import FAQ from './components/FAQ'
import HowItWorks from './components/HowItWorks'
import LogoCloud from './components/LogoCloud'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Assessment from './components/Assessment'
import './style.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showAssessment, setShowAssessment] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, 900)

    return () => window.clearTimeout(timer)
  }, [])

  const handleStartAssessment = () => {
    setShowAssessment(true)
  }

  return (
    <>
      <Navbar onStartAssessment={handleStartAssessment} />
      <main>
        {showAssessment ? (
          <Assessment />
        ) : (
          <>
            <Hero isLoading={isLoading} onStartAssessment={handleStartAssessment} />
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
    <App />
  </React.StrictMode>,
)