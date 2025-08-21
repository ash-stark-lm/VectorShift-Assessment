import { useState, useRef, useCallback, useEffect } from 'react'
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useReactFlow,
} from 'reactflow'
import { useStore } from '../../store'
import { InputNode } from '../../Nodes/InputNode'
import { LLMNode } from '../../Nodes/LLMNode'
import { OutputNode } from '../../Nodes/OutputNode'
import { TextNode } from '../../Nodes/TextNode'
import { DataTransformerNode } from '../../Nodes/DataTransformerNode'

import 'reactflow/dist/style.css'
import { EmailNode } from '../../Nodes/EmailNode'
import { LoggerNode } from '../../Nodes/LoggerNode'
import { RandomNumberNode } from '../../Nodes/RandomNumberNodes'

const gridSize = 20
const proOptions = { hideAttribution: true }
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  dataTransform: DataTransformerNode,
  email: EmailNode,
  logger: LoggerNode,
  randomNumber: RandomNumberNode,
}

console.log('Node Types:', nodeTypes)
export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  // Zustand store state
  const nodes = useStore((state) => state.nodes)
  const edges = useStore((state) => state.edges)
  const getNodeID = useStore((state) => state.getNodeID)
  const addNode = useStore((state) => state.addNode)
  const onNodesChange = useStore((state) => state.onNodesChange)
  const onEdgesChange = useStore((state) => state.onEdgesChange)
  const onConnect = useStore((state) => state.onConnect)
  const removeNodes = useStore((state) => state.removeNodes)

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: `${type}`,
  })

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()

      const appData = JSON.parse(
        event.dataTransfer.getData('application/reactflow') || '{}'
      )
      const type = appData?.nodeType
      if (!type || !reactFlowInstance) return

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const nodeID = getNodeID(type)
      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      }

      addNode(newNode)
    },
    [reactFlowInstance, addNode, getNodeID]
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  // Enhanced node selection and navigation
  const onNodeClick = useCallback(
    (event, node) => {
      if (reactFlowInstance) {
        // Center the view on the clicked node
        reactFlowInstance.fitView({
          nodes: [node],
          duration: 500,
          padding: 3,
        })
      }
    },
    [reactFlowInstance]
  )

  // MiniMap node click handler
  const onMiniMapNodeClick = useCallback(
    (event, node) => {
      if (reactFlowInstance) {
        // Focus on the clicked node from minimap
        reactFlowInstance.fitView({
          nodes: [node],
          duration: 800,
          padding: 0.6,
        })

        // Also select the node
        reactFlowInstance.setNodes((nodes) =>
          nodes.map((n) => ({
            ...n,
            selected: n.id === node.id,
          }))
        )
      }
    },
    [reactFlowInstance]
  )

  // Handle Delete/Backspace key for selected nodes
  const onKeyDown = useCallback(
    (event) => {
      if (!reactFlowInstance) return
      if (event.key === 'Backspace') {
        const selectedNodes = reactFlowInstance.getSelectedNodes()
        const selectedEdges = reactFlowInstance.getSelectedEdges()

        selectedNodes.forEach((node) => removeNodes(node.id))

        if (selectedEdges.length) {
          reactFlowInstance.setEdges((eds) =>
            eds.filter((e) => !selectedEdges.includes(e))
          )
        }
      }

      // Add keyboard shortcuts for navigation
      if (event.key === 'f' && event.ctrlKey) {
        event.preventDefault()
        // Fit all nodes in view
        reactFlowInstance.fitView({ duration: 600 })
      }
    },
    [reactFlowInstance, removeNodes]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      id="pipeline"
      ref={reactFlowWrapper}
      className="w-screen h-[70vh] bg-gray-950 border-t border-gray-800 relative overflow-hidden shadow-lg"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
        fitViewOptions={{
          padding: 0.1,
          includeHiddenNodes: false,
        }}
      >
        <Background color="#444" gap={gridSize} size={1} />

        <Controls
          className="bg-gray-800 text-gray-300 shadow-md hover:shadow-gray-500/30 transition"
          showFitView={true}
          showZoom={true}
          showInteractive={true}
        />

        {/* Enhanced MiniMap with better interaction */}
        <MiniMap
          // Node styling for better visibility
          nodeStrokeColor={(n) => {
            if (n.selected) return '#fbbf24' // Highlight selected nodes
            if (n.type === 'customInput') return '#22c55e'
            if (n.type === 'llm') return '#3b82f6'
            if (n.type === 'customOutput') return '#a855f7'
            if (n.type === 'text') return '#ec4899'
            if (n.type === 'conditional') return '#f97316'
            return '#999'
          }}
          nodeColor={(n) => {
            if (n.selected) return '#fbbf24'
            return '#1f2937'
          }}
          nodeStrokeWidth={3} // Much thicker borders!
          nodeBorderRadius={8} // Sli
          // Enhanced interactivity
          nodeClickDistance={10} // Larger click area
          onNodeClick={onMiniMapNodeClick}
          pannable={true}
          zoomable={true}
          // Improved styling
          className="!bg-gray-800/90 !border !border-gray-600 !rounded-lg !shadow-lg"
          maskColor="rgba(17,24,39,0.6)"
          // Position and size
          position="bottom-right"
          style={{
            backgroundColor: 'rgba(31, 41, 55, 0.95)',
            border: '1px solid rgb(75, 85, 99)',
          }}
        />

        {/* Optional: Add a "Fit View" button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => reactFlowInstance?.fitView({ duration: 600 })}
            className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg shadow-md border border-gray-600 text-sm font-medium transition-colors duration-200"
            title="Fit all nodes in view (Ctrl+F)"
          >
            📍 Fit View
          </button>
        </div>

        {/* Optional: Add navigation info */}
        <div className="absolute bottom-4 left-4 text-xs text-gray-400 bg-gray-800/80 px-2 py-1 rounded backdrop-blur-sm">
          💡 Click MiniMap nodes to navigate • Ctrl+F to fit all
        </div>
      </ReactFlow>
    </div>
  )
}
