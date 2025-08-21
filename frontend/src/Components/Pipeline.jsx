// src/pages/Pipelines.jsx
import React from 'react'
import { PipelineUI } from './ui/Ui'
import { Link } from 'react-router'
import { PipelineToolbar } from './Toolbar'
import { SubmitButton } from './ui/SubmitButton'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Pipelines = () => {
  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('.header > *', {
      opacity: 0,
      y: -50,
      stagger: 0.25,
      duration: 0.5,
      ease: 'sine.inOut',
    })
      .from(
        '.pipeline-toolbar',
        { opacity: 0, x: -60, ease: 'power3.out' },
        '<0.6'
      )
      .from(
        '.pipeline-wrapper',
        { opacity: 0, duration: 0.8, ease: 'power3.out' },
        '<0.2'
      )
  })

  return (
    <div className="w-full min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <div className="header flex items-center justify-between px-6 py-2 border-b border-gray-800">
        <h1 className="text-3xl font-bold">VectorShift </h1>
        <SubmitButton />
      </div>

      {/* Pipeline Toolbar */}
      <div className="pipeline-toolbar">
        <PipelineToolbar />
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 pipeline-wrapper">
        <PipelineUI />
      </div>
    </div>
  )
}

export default Pipelines
