"use client";

import React from 'react';
import { FormGroupProps } from '../_types/components';

export const FormGroup: React.FC<FormGroupProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      {...props}
      className={`flex items-center mb-6 gap-6 ${className}`}
    >
      {children}
    </div>
  );
};