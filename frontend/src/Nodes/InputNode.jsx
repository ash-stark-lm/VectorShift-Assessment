// InputNode.jsx
import { createNode } from './NodeAbstraction'
import { CustomDropdown } from '../Components/ui/CustomSelect'

export const InputNode = createNode({
  id: 'customInput', // base id prefix
  title: 'Input',
  initialData: {
    inputName: 'input_1',
    inputType: 'Text',
  },
  outputs: ['value'],
  height: 220,
  contentBuilder: (nodeData, updateField) => (
    <div className="flex flex-col gap-4">
      {/* Name Field */}
      <label className="flex flex-col text-sm text-white mb-2">
        <span className="mb-2">Name:</span>
        <input
          type="text"
          value={nodeData.inputName}
          onChange={(e) => updateField('inputName', e.target.value)}
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

      {/* Type Field */}
      <label className="flex flex-col text-sm text-white mb-2">
        <span className="mb-1">Type:</span>
        <CustomDropdown
          value={nodeData.inputType}
          onChange={(e) => updateField('inputType', e.target.value)}
          options={['Text', 'File']}
        />
      </label>
    </div>
  ),
})
