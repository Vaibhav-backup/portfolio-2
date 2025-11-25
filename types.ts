import React from 'react';

export enum NodeType {
  TRIGGER = 'TRIGGER',
  ACTION = 'ACTION',
  NOTE = 'NOTE',
  ROUTER = 'ROUTER'
}

export interface NodeData {
  id: string;
  type: NodeType;
  label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  description?: string;
  category?: string;
  details?: {
    title?: string;
    subtitle?: string;
    content?: string[];
    tags?: string[];
    link?: string;
    date?: string;
    location?: string;
  };
  outputs?: string[]; // IDs of nodes this connects TO
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}