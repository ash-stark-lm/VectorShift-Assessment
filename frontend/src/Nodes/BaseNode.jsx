// BaseNode.jsx
import { Handle, Position } from 'reactflow'

const BaseNode = ({
  id,
  title,
  content,
  inputs = [],
  outputs = [],
  height = 240,
}) => {
  return (
    <div
      className="
        w-[300px]
        rounded-2xl
        border border-purple-700
        bg-gradient-to-br from-gray-900 to-purple-950
        p-4
        flex flex-col
        hover:scale-[1.03] transition-transform duration-200
      "
      style={{ height }}
    >
      {/* Title */}
      <div className="font-bold text-white text-lg mb-2 text-center">
        {title}
      </div>

      {/* Content */}
      <div className="text-sm text-white flex-1">{content}</div>

      {/* Input Handles */}
      {inputs.map((input, i) => (
        <Handle
          key={input}
          type="target"
          position={Position.Left}
          id={`${id}-${input}`}
          className="!bg-purple-500 !w-4 !h-4 !border !border-purple-300"
          style={{ top: `${(i + 1) * 25}%` }}
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output, i) => (
        <Handle
          key={output}
          type="source"
          position={Position.Right}
          id={`${id}-${output}`}
          className="!bg-white !w-4 !h-4 !border !border-pink-300"
          style={{ top: `${(i + 1) * 25}%` }}
        />
      ))}
    </div>
  )
}

export default BaseNode
