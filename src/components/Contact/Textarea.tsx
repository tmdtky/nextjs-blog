"use client";

import React from 'react';
import { TextareaProps } from '@/types';

export const Textarea: React.FC<TextareaProps> = ({ onChange, className = '', rows = 8, ...props }) => {
  return (
    <textarea
      {...props}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border border-gray-300 rounded-lg p-4 text-black ${
        props.disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'
      } ${className}`}
    />
  );
};