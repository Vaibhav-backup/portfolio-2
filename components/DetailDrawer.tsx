import React from 'react';
import { NodeData } from '../types';
import { X, ExternalLink, MapPin, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailDrawerProps {
  node: NodeData | null;
  onClose: () => void;
}

const DetailDrawer: React.FC<DetailDrawerProps> = ({ node, onClose }) => {
  return (
    <AnimatePresence>
      {node && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-n8n-panel border-l border-n8n-border z-50 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-n8n-border bg-n8n-dark">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-n8n-node rounded-lg border border-n8n-border text-n8n-primary">
                {node.icon}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{node.label}</h2>
                <span className="text-xs text-gray-400 font-mono uppercase">{node.type} Node</span>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Meta Info */}
            {node.details && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{node.details.title}</h3>
                  {node.details.subtitle && (
                    <p className="text-lg text-n8n-primary font-medium">{node.details.subtitle}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  {node.details.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{node.details.location}</span>
                    </div>
                  )}
                  {node.details.date && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{node.details.date}</span>
                    </div>
                  )}
                </div>

                {/* Main Content */}
                <div className="bg-n8n-node rounded-lg p-5 border border-n8n-border space-y-3">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Parameters / Details</h4>
                  <ul className="space-y-2">
                    {node.details.content?.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-gray-300 text-sm leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-n8n-primary rounded-full flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                {node.details.tags && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Output Data (Skills)</h4>
                    <div className="flex flex-wrap gap-2">
                      {node.details.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700 flex items-center space-x-1">
                          <Tag className="w-3 h-3" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Link */}
                {node.details.link && (
                  <a 
                    href={node.details.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-n8n-primary text-white text-sm font-bold rounded hover:bg-orange-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Resource</span>
                  </a>
                )}
              </div>
            )}

            {!node.details && (
               <div className="text-center py-10 text-gray-500">
                 <p>No additional configuration available for this node.</p>
               </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-n8n-border bg-n8n-dark text-center text-xs text-gray-500">
            Node ID: <span className="font-mono text-gray-400">{node.id}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DetailDrawer;
