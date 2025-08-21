// PipelineSummaryModal.jsx
import React from 'react'
import { X } from 'lucide-react'

export const PipelineSummaryModal = ({ data, closeToast }) => {
  return (
    <div className="p-4 w-80 bg-gradient-to-br from-gray-900 to-purple-950 rounded-2xl shadow-lg flex flex-col gap-3 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">Pipeline Summary</h2>
        <button
          onClick={closeToast}
          className="text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Summary Info */}
      <div className="flex justify-between">
        <span>Nodes:</span>
        <span className="text-purple-400 font-semibold">{data.num_nodes}</span>
      </div>
      <div className="flex justify-between">
        <span>Edges:</span>
        <span className="text-purple-400 font-semibold">{data.num_edges}</span>
      </div>
      <div className="flex justify-between">
        <span>DAG:</span>
        <span
          className={
            data.is_dag
              ? 'text-purple-400 font-semibold'
              : 'text-red-400 font-semibold'
          }
        >
          {data.is_dag ? 'Yes ✅' : 'No ❌'}
        </span>
      </div>
    </div>
  )
}
