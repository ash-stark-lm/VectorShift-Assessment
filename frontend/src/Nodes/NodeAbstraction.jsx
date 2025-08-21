import { useState } from 'react'
import BaseNode from './BaseNode'

export const createNode = ({
  id,
  title,
  initialData = {},
  inputs = [],
  outputs = [],
  height = 140,
  contentBuilder, // function to build content given state and setters
}) => {
  // Wrapper component
  return function NodeComponent({ data = {} }) {
    const [nodeData, setNodeData] = useState({ ...initialData, ...data })

    const updateField = (field, value) => {
      setNodeData((prev) => ({ ...prev, [field]: value }))
    }

    return (
      <BaseNode
        id={id}
        title={title}
        inputs={inputs}
        outputs={outputs}
        height={height}
        content={contentBuilder(nodeData, updateField)}
        data={nodeData}
      />
    )
  }
}
