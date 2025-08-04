"use client";

import React from 'react';
import { LabelProps } from '../../_types';

export const Label: React.FC<LabelProps> = ({ text, className = '', ...props }) => {
  return (
    <label
      {...props}
      className={`w-60 text-left ${className}`}
    >
      {text}
    </label>
  );
};