"use client";

import React from 'react';
import { InputProps } from '@/types';

export const Input: React.FC<InputProps> = ({ onChange, className = '', ...props }) => {
  return (
    <input
      {...props}
      onChange={(e) => onChange(e.target.value)}
      className={`border border-gray-300 rounded-lg p-4 w-full text-black ${
        props.disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'
      } ${className}`}
    />
  );
};