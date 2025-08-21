// DataTransformerNode.jsx
import { createNode } from './NodeAbstraction'
import { CustomDropdown } from '../Components/ui/CustomSelect'

export const DataTransformerNode = createNode({
  id: 'data-transformer',
  title: 'Data Transformer',
  inputs: ['data'],
  outputs: ['transformed'],
  height: 180,
  initialData: {
    transformType: 'uppercase',
  },
  contentBuilder: (nodeData, updateField) => (
    <div className="space-y-2">
      <label className="text-xs text-purple-300">Transform Type:</label>
      <CustomDropdown
        value={nodeData.transformType}
        onChange={(e) => updateField('transformType', e.target.value)}
        options={['uppercase', 'lowercase', 'reverse', 'capitalize']}
      />
      <div className="text-xs text-gray-400 mt-2">
        Transforms input data using {nodeData.transformType} operation
      </div>
    </div>
  ),
})
