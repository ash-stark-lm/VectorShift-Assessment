// Toolbar.js
import { DraggableNode } from './DraggableNode'

export const PipelineToolbar = () => {
  return (
    <div className="p-4 bg-gray-900 border-b border-gray-800 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-100 tracking-wide">
        Pipeline Components
      </h2>

      <div className="mt-4 flex flex-wrap gap-4">
        <DraggableNode
          type="customInput"
          label="Input"
          className="px-4 py-2 bg-gray-800 text-green-400 font-medium rounded-xl shadow-md hover:bg-gray-700 hover:shadow-green-500/40 transition duration-200 cursor-pointer"
        />
        <DraggableNode
          type="llm"
          label="LLM"
          className="px-4 py-2 bg-gray-800 text-blue-400 font-medium rounded-xl shadow-md hover:bg-gray-700 hover:shadow-blue-500/40 transition duration-200 cursor-pointer"
        />
        <DraggableNode
          type="customOutput"
          label="Output"
          className="px-4 py-2 bg-gray-800 text-purple-400 font-medium rounded-xl shadow-md hover:bg-gray-700 hover:shadow-purple-500/40 transition duration-200 cursor-pointer"
        />
        <DraggableNode
          type="text"
          label="Text"
          className="px-4 py-2 bg-gray-800 text-pink-400 font-medium rounded-xl shadow-md hover:bg-gray-700 hover:shadow-pink-500/40 transition duration-200 cursor-pointer"
        />

        {/* New Demo Nodes */}
        <DraggableNode
          type="dataTransform"
          label="Data Transform"
          className="px-4 py-2 bg-gray-800 text-pink-400 font-medium rounded-xl shadow-md hover:bg-gray-700 hover:shadow-pink-500/40 transition duration-200 cursor-pointer"
        />

        <DraggableNode
          type="email"
          label="Email"
          className="px-4 py-2 bg-gray-800 text-pink-400 font-medium rounded-xl shadow-md hover:bg-gray-700 hover:shadow-pink-500/40 transition duration-200 cursor-pointer"
        />
        <DraggableNode
          type="logger"
          label="Logger"
          className="px-4 py-2 bg-gray-800 text-pink-400 font-medium rounded-xl shadow-md hover:bg-gray-700 hover:shadow-pink-500/40 transition duration-200 cursor-pointer"
        />
        <DraggableNode
          type="randomNumber"
          label="Random Num"
          className="px-4 py-2 bg-gray-800 text-pink-400 font-medium rounded-xl shadow-md hover:bg-gray-700 hover:shadow-pink-500/40 transition duration-200 cursor-pointer"
        />
      </div>
    </div>
  )
}
