import { createNode } from './NodeAbstraction'

export const LoggerNode = createNode({
  id: 'logger',
  title: 'Logger',
  initialData: { message: '' },
  inputs: ['input'],
  outputs: [],
  contentBuilder: (data, setField) => (
    <div className="space-y-2">
      <input
        type="text"
        value={data.message}
        onChange={(e) => setField('message', e.target.value)}
        placeholder="Message to log"
        className="w-full bg-gray-900 text-white border border-purple-600 rounded px-2 py-1 text-sm"
      />
    </div>
  ),
})
