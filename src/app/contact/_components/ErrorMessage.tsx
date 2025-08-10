"use client";

import React from 'react';
import { ErrorMessageProps } from '../_types/components';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '', ...props }) => {
  if (!message) return null;

  return (
    <p
      {...props}
      className={`text-sm text-red-700 ${className}`}
    >
      {message}
    </p>
  );
};