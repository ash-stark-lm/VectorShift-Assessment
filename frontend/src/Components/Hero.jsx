import ShaderBackground from './ui/Shader-Background'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useNavigate } from 'react-router'

function Hero() {
  const h1Ref = useRef(null)
  const contentRef = useRef(null)
  const navigate = useNavigate()

  // Handle button click
  const handleButtonClick = () => {
    navigate('/pipeline')
  }

  // Animate all hero content using GSAP
  useGSAP(() => {
    if (!h1Ref.current || !contentRef.current) return

    const words = h1Ref.current.querySelectorAll('span')
    const [p, button] = contentRef.current.children

    // Animate h1 words
    gsap.fromTo(
      words,
      {
        y: 50,
        opacity: 0,
        filter: 'blur(10px)',
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      }
    )

    // Animate paragraph and button after h1 animation
    gsap.from([p, button], {
      y: 50,
      opacity: 0,
      filter: 'blur(10px)',
      stagger: 0.3,
      duration: 1,
      ease: 'power3.out',
      delay: words.length * 0.15, // wait until h1 finishes
    })
  })

  // Split H1 text into words wrapped in spans
  const h1Text = 'Build and Visualize Your Pipelines'
  const h1Words = h1Text.split(' ').map((word, i) => (
    <span key={i} className="inline-block mr-2">
      {word}
    </span>
  ))

  return (
    <div className="w-full min-h-screen">
      <div className="relative w-full h-screen">
        <ShaderBackground />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1
            ref={h1Ref}
            className="text-5xl font-bold mb-4 flex flex-wrap justify-center"
          >
            {h1Words}
          </h1>

          <div ref={contentRef} className="flex flex-col items-center">
            <h3 className="text-4xl max-w-2xl mt-2">Welcome To VectorShift</h3>{' '}
            <button
              onClick={handleButtonClick}
              className="mt-5 relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Get Started
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
