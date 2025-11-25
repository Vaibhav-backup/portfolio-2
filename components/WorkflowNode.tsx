import React, { useRef, useState, useEffect } from 'react';
import { NodeData, NodeType } from '../types';
import { MoreHorizontal, Play, AlertCircle } from 'lucide-react';
import { motion, useDragControls } from 'framer-motion';

interface WorkflowNodeProps {
  data: NodeData;
  isSelected: boolean;
  isExecuting: boolean;
  onSelect: (node: NodeData) => void;
  onPositionChange: (id: string, x: number, y: number) => void;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ 
  data, 
  isSelected, 
  isExecuting,
  onSelect, 
  onPositionChange 
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [executionState, setExecutionState] = useState<'idle' | 'running' | 'success'>('idle');

  useEffect(() => {
    if (isExecuting) {
      setExecutionState('running');
      const timer = setTimeout(() => {
        setExecutionState('success');
      }, 1000 + Math.random() * 1000); // Simulated delay
      return () => clearTimeout(timer);
    } else {
      setExecutionState('idle');
    }
  }, [isExecuting]);

  const handleDragEnd = (event: any, info: any) => {
    // Framer motion drag offset is relative to start.
    // We need to calculate absolute position based on previous + delta
    const newX = data.x + info.offset.x;
    const newY = data.y + info.offset.y;
    onPositionChange(data.id, newX, newY);
  };

  const getNodeColor = (type: NodeType) => {
    switch (type) {
      case NodeType.TRIGGER: return 'border-n8n-accent';
      case NodeType.ROUTER: return 'border-blue-500';
      case NodeType.ACTION: return 'border-white';
      default: return 'border-gray-500';
    }
  };

  const getHeaderColor = (type: NodeType) => {
    switch (type) {
      case NodeType.TRIGGER: return 'bg-n8n-accent'; // Greenish
      case NodeType.ROUTER: return 'bg-blue-600';
      case NodeType.ACTION: return 'bg-n8n-primary'; // Orange
      default: return 'bg-gray-600';
    }
  };

  return (
    <motion.div
      ref={nodeRef}
      drag
      dragControls={dragControls}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      initial={{ x: data.x, y: data.y }}
      // We don't animate x/y updates from parent props to avoid fighting drag state
      // Instead, parent updates rely on dragEnd to sync state, but visual is handled by framer's internal transform
      className={`absolute w-64 rounded-lg shadow-lg cursor-pointer transition-shadow duration-200 group
        ${isSelected ? 'ring-2 ring-n8n-primary shadow-xl z-50' : 'z-10'}
        ${executionState === 'running' ? 'ring-2 ring-yellow-400' : ''}
        ${executionState === 'success' ? 'ring-2 ring-green-500' : ''}
        bg-n8n-node border border-n8n-border
      `}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(data);
      }}
      style={{
        position: 'absolute',
        left: 0, 
        top: 0,
      }}
    >
      {/* Header */}
      <div className={`h-10 rounded-t-lg flex items-center px-3 justify-between ${getHeaderColor(data.type)}`}>
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-black/20 rounded">
            {data.icon}
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wider truncate max-w-[120px]">
            {data.type}
          </span>
        </div>
        
        <div className="flex space-x-1">
           {executionState === 'success' && (
             <div className="w-2 h-2 rounded-full bg-green-300 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
           )}
           <MoreHorizontal className="w-4 h-4 text-white/70 hover:text-white" />
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-200 mb-1 leading-snug">
          {data.label}
        </h3>
        {data.description && (
          <p className="text-xs text-gray-400 line-clamp-2">
            {data.description}
          </p>
        )}
        
        {/* Fake Inputs/Outputs Dots */}
        <div className="absolute -left-1.5 top-1/2 w-3 h-3 bg-gray-400 rounded-full border-2 border-n8n-node hover:bg-n8n-accent transition-colors" />
        <div className="absolute -right-1.5 top-1/2 w-3 h-3 bg-gray-400 rounded-full border-2 border-n8n-node hover:bg-n8n-accent transition-colors" />
      </div>

      {/* Execution Overlay */}
      {executionState === 'running' && (
        <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center pointer-events-none">
           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
      )}
    </motion.div>
  );
};

export default WorkflowNode;
