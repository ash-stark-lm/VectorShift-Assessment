// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing'
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      className={`p-2 cursor-grab min-w-[80px] h-[60px] flex items-center justify-center flex-col rounded-lg bg-[#1C2536] hover:bg-[#243048] active:cursor-grabbing transition-colors ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <span className="text-white font-medium">{label}</span>
    </div>
  )
}
