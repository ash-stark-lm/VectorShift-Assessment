import { useState, useEffect, useRef } from 'react'
import { Handle, Position } from 'reactflow'
import BaseNode from './BaseNode'

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}')
  const [variables, setVariables] = useState(['input'])
  const textRef = useRef(null)

  // Node size state
  const [nodeSize, setNodeSize] = useState({ width: 300, height: 120 })
  const MIN_WIDTH = 300
  const MAX_WIDTH = 600
  const MIN_HEIGHT = 120
  const MAX_HEIGHT = 400

  const handleTextChange = (e) => {
    const value = e.target.value
    setCurrText(value)

    //  Extract variables {{var}}
    const regex = /{{\s*(\w+)\s*}}/g
    const matches = [...value.matchAll(regex)].map((m) => m[1])
    setVariables([...new Set(matches)])

    //  Adjust node size
    if (textRef.current) {
      const textarea = textRef.current
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      context.font = '14px monospace'

      const lines = value.split('\n')
      const maxLineWidth = Math.max(
        ...lines.map((line) => context.measureText(line).width),
        0
      )

      const newHeight = Math.min(
        Math.max(MIN_HEIGHT, textarea.scrollHeight + 60),
        MAX_HEIGHT
      )

      const newWidth = Math.min(
        Math.max(MIN_WIDTH, maxLineWidth + 80),
        MAX_WIDTH
      )

      setNodeSize({ width: newWidth, height: newHeight })
    }
  }

  // Initialize variables once
  useEffect(() => {
    const regex = /{{\s*(\w+)\s*}}/g
    const matches = [...currText.matchAll(regex)].map((m) => m[1])
    setVariables([...new Set(matches)])
  }, [])

  return (
    <div className="relative">
      <BaseNode
        id={id}
        title="Text Node"
        width={nodeSize.width}
        height={nodeSize.height}
        content={
          <textarea
            ref={textRef}
            value={currText}
            onChange={handleTextChange}
            className="
              w-full
              bg-gray-900 text-white
              border border-purple-600
              rounded
              p-2
              resize-none
              focus:outline-none focus:ring-2 focus:ring-purple-500
              overflow-auto
              flex-1
              font-mono
              text-sm
            "
            style={{
              maxHeight: `${MAX_HEIGHT - 60}px`,
              minHeight: '60px',
              height: `${nodeSize.height - 60}px`,
            }}
            placeholder="Enter text here. Use {{variableName}} to create input handles."
          />
        }
        outputs={['output']}
      />

      {/* Variable Handles with Hover Labels  */}
      {variables.map((v, i) => (
        <div
          key={v}
          className="group absolute left-[-6px]"
          style={{
            top: `${((i + 1) / (variables.length + 1)) * 100}%`,
          }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${v}`}
            className="!bg-purple-500 !w-4 !h-4 !border !border-purple-300"
          />
          <span
            className="
              absolute left-[-100%] top-1/2 -translate-y-1/2
              px-2 py-1 rounded-md
              bg-gray-800 text-purple-300 text-xs
              opacity-0 group-hover:opacity-100
              pointer-events-none
              transition-all duration-200 scale-90 group-hover:scale-100
            "
          >
            {v}
          </span>
        </div>
      ))}
    </div>
  )
}
