import { createNode } from './NodeAbstraction'

export const RandomNumberNode = createNode({
  id: 'randomNumber',
  title: ' Random Number',
  initialData: { min: 0, max: 100 },
  inputs: [],
  outputs: ['number'],
  contentBuilder: (data, setField) => (
    <div className="space-y-2">
      <input
        type="number"
        value={data.min}
        onChange={(e) => setField('min', e.target.value)}
        className="w-1/2 bg-gray-800 text-white border border-purple-600 rounded px-2 py-1 text-sm"
        placeholder="Min"
      />
      <input
        type="number"
        value={data.max}
        onChange={(e) => setField('max', e.target.value)}
        className="w-1/2 bg-gray-800 text-white border border-purple-600 rounded px-2 py-1 text-sm"
        placeholder="Max"
      />
    </div>
  ),
})
