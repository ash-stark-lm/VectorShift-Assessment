// LLMNode.jsx
import { createNode } from './NodeAbstraction'

export const LLMNode = createNode({
  id: 'llm',
  title: 'LLM',
  inputs: ['system', 'prompt'],
  outputs: ['response'],
  initialData: {
    description: 'This is a LLM node.',
  },
  contentBuilder: (nodeData) => (
    <div className="flex flex-col gap-1 text-white text-sm">
      <span>{nodeData.description}</span>
    </div>
  ),
})
