import React from 'react'
import { useStore } from '../../store'
import { toast } from 'react-toastify'
import { PipelineSummaryModal } from '../PipelineResultModal'

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes)
  const edges = useStore((state) => state.edges)

  const handleSubmit = async () => {
    const payload = {
      nodes: nodes.map((n) => ({ id: n.id })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
    }

    console.log('Payload to backend:', JSON.stringify(payload, null, 2))

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      console.log('Backend response:', data)

      toast(
        ({ closeToast }) => (
          <PipelineSummaryModal data={data} closeToast={closeToast} />
        ),
        {
          autoClose: 3500, // Auto-close after 3.5 seconds
          closeButton: false,
          position: 'top-right',
        }
      )
    } catch (err) {
      console.error(err)
      toast.error('Failed to submit pipeline.', { autoClose: 3000 })
    }
  }

  return (
    <div className="flex items-center justify-center mt-6">
      <button
        onClick={handleSubmit}
        className="p-[3px] relative cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white ">
          Submit
        </div>
      </button>
    </div>
  )
}
