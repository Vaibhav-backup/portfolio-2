import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { INITIAL_NODES, RESUME_DATA } from './constants';
import { NodeData } from './types';
import WorkflowNode from './components/WorkflowNode';
import DetailDrawer from './components/DetailDrawer';
import ChatWidget from './components/ChatWidget';
import { Play, ZoomIn, ZoomOut, MousePointer2, Plus, Download } from 'lucide-react';

const App: React.FC = () => {
  const [nodes, setNodes] = useState<NodeData[]>(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Drag handling for canvas panning (simplified)
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleNodeSelect = (node: NodeData) => {
    setSelectedNode(node);
  };

  const handleNodeMove = (id: string, x: number, y: number) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, x, y } : n));
  };

  const handleExecute = () => {
    setIsExecuting(true);
    // Reset execution state after animation duration
    setTimeout(() => setIsExecuting(false), 3000);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click
      setIsPanning(true);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      setPan(p => ({ x: p.x + dx, y: p.y + dy }));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleCanvasMouseUp = () => {
    setIsPanning(false);
  };

  // Generate SVG paths for connections
  const renderConnections = () => {
    const connections: ReactElement[] = [];
    
    nodes.forEach(source => {
      if (source.outputs) {
        source.outputs.forEach(targetId => {
          const target = nodes.find(n => n.id === targetId);
          if (target) {
            // Calculate connection points
            const startX = source.x + 250; // Width of node roughly (offset for output dot)
            const startY = source.y + 40; // Approx middle height of body
            const endX = target.x - 10;
            const endY = target.y + 40;

            const c1x = startX + 50;
            const c1y = startY;
            const c2x = endX - 50;
            const c2y = endY;

            const pathData = `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
            
            // Draw path
            connections.push(
              <g key={`${source.id}-${target.id}`}>
                <path 
                  d={pathData} 
                  stroke="#555" 
                  strokeWidth="2" 
                  fill="none" 
                  className="opacity-60"
                />
                {isExecuting && (
                  <path 
                    d={pathData} 
                    stroke="#4ade80" 
                    strokeWidth="3" 
                    fill="none"
                    strokeDasharray="10 5"
                    className="animate-pulse"
                  >
                    <animate 
                      attributeName="stroke-dashoffset" 
                      from="100" 
                      to="0" 
                      dur="1s" 
                      repeatCount="indefinite" 
                    />
                  </path>
                )}
              </g>
            );
          }
        });
      }
    });
    return connections;
  };

  return (
    <div className="h-screen w-screen bg-n8n-canvas overflow-hidden flex flex-col font-sans text-gray-100">
      
      {/* Top Navbar */}
      <div className="h-14 bg-n8n-panel border-b border-n8n-border flex items-center justify-between px-4 z-40 shadow-sm relative">
        <div className="flex items-center space-x-4">
           <div className="flex items-center justify-center w-8 h-8 rounded bg-n8n-primary text-white font-bold">
             n8n
           </div>
           <div>
             <h1 className="text-sm font-bold text-white">{RESUME_DATA.name} <span className="text-gray-500 font-normal">/ Workflow Resume</span></h1>
             <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Active</span>
                <span>•</span>
                <span>Last saved: Just now</span>
             </div>
           </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white bg-n8n-node hover:bg-gray-700 rounded border border-gray-600 transition-colors">
            <Download className="w-3.5 h-3.5 mr-2" />
            PDF
          </button>
          <button 
            onClick={handleExecute}
            disabled={isExecuting}
            className={`flex items-center px-4 py-1.5 text-sm font-bold text-white rounded shadow-sm transition-all
              ${isExecuting ? 'bg-green-600 cursor-wait' : 'bg-green-500 hover:bg-green-600 hover:shadow-md'}
            `}
          >
            <Play className={`w-3.5 h-3.5 mr-2 ${isExecuting ? 'animate-spin' : 'fill-white'}`} />
            {isExecuting ? 'Executing...' : 'Execute Workflow'}
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing bg-n8n-canvas"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
      >
        {/* Grid Background */}
        <div 
          className="absolute inset-0 dot-grid pointer-events-none opacity-20"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '0 0'
          }}
        />

        {/* Workflow Layer */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '0 0'
          }}
        >
          {/* SVG Lines */}
          <svg className="absolute top-0 left-0 w-[4000px] h-[4000px] pointer-events-none z-0 overflow-visible">
            {renderConnections()}
          </svg>

          {/* Nodes */}
          {nodes.map(node => (
            <WorkflowNode 
              key={node.id} 
              data={node} 
              isSelected={selectedNode?.id === node.id}
              isExecuting={isExecuting}
              onSelect={handleNodeSelect}
              onPositionChange={handleNodeMove}
            />
          ))}
        </div>

        {/* Floating Controls */}
        <div className="absolute top-4 left-4 z-30 flex flex-col space-y-2">
           <div className="bg-n8n-panel border border-n8n-border rounded shadow-lg p-1.5 flex flex-col space-y-1">
             <button 
               onClick={() => setScale(s => Math.min(s + 0.1, 2))}
               className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
             >
               <ZoomIn className="w-4 h-4" />
             </button>
             <button 
                onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}
               className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
             >
               <ZoomOut className="w-4 h-4" />
             </button>
             <div className="h-px bg-gray-700 my-1"></div>
             <button 
               onClick={() => { setPan({x: 0, y: 0}); setScale(1); }}
               className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
             >
               <MousePointer2 className="w-4 h-4" />
             </button>
           </div>
        </div>
        
        {/* Node Palette (Simulated) */}
        <div className="absolute right-4 top-4 z-30 w-12 bg-n8n-panel border border-n8n-border rounded shadow-lg flex flex-col items-center py-3 space-y-3">
          <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-gray-400 cursor-not-allowed" title="Add Trigger">
             <Plus className="w-5 h-5" />
          </div>
          <div className="w-6 h-px bg-gray-700"></div>
          {/* Just visual icons */}
          <div className="w-8 h-8 rounded-full bg-n8n-primary/20 flex items-center justify-center border border-n8n-primary/50">
             <div className="w-3 h-3 bg-n8n-primary rounded-full"></div>
          </div>
        </div>

      </div>

      {/* Details Drawer */}
      <DetailDrawer 
        node={selectedNode} 
        onClose={() => setSelectedNode(null)} 
      />

      {/* Chat Widget */}
      <ChatWidget />
      
    </div>
  );
};

export default App;