// OutputNode.jsx
import { createNode } from './NodeAbstraction'
import { CustomDropdown } from '../Components/ui/CustomSelect'

export const OutputNode = createNode({
  id: 'outputNode',
  title: 'Output',
  initialData: {
    outputName: 'output_1',
    outputType: 'Text',
  },
  inputs: ['value'],
  height: 220,
  contentBuilder: (nodeData, updateField) => (
    <div className="flex flex-col gap-4">
      {/* Name input */}
      <label className="flex flex-col text-sm text-white mb-2">
        <span className="mb-1">Name:</span>
        <input
          type="text"
          value={nodeData.outputName}
          onChange={(e) => updateField('outputName', e.target.value)}
          className="
            bg-gray-900
            text-white
            border border-purple-600
            px-2 py-1
            rounded
            focus:outline-none
            focus:ring-2 focus:ring-purple-500
          "
        />
      </label>

      {/* Type dropdown */}
      <label className="flex flex-col text-sm text-white mb-2">
        <span className="mb-1">Type:</span>
        <CustomDropdown
          value={nodeData.outputType}
          onChange={(val) => updateField('outputType', val)}
          options={['Text', 'Image']}
        />
      </label>
    </div>
  ),
})
