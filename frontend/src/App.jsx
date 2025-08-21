import { PipelineToolbar } from './Components/Toolbar'
import Pipelines from './Components/Pipeline'
import { SubmitButton } from './Components/ui/SubmitButton'
import Lenis from 'lenis'
import { useEffect } from 'react'
import Hero from './Components/Hero'
import { Routes, Route } from 'react-router'
import { ToastContainer } from 'react-toastify'

function App() {
  //  Lenis Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/pipeline" element={<Pipelines />} />
      </Routes>

      <ToastContainer
        position="top-center"
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  )
}

export default App
