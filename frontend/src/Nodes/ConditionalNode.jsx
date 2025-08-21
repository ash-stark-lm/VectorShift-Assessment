import BaseNode from './BaseNode'

export default function ConditionNode({ id }) {
  return (
    <BaseNode
      id={id}
      type="condition"
      label="Condition Node"
      inputs={['value']}
      outputs={['true', 'false']}
      content={<p className="text-sm text-gray-400">Checks condition</p>}
    />
  )
}
