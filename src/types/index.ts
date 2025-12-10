import * as React from 'react';

export type InputProps = {
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onClick?: () => void;
  handleClear?: () => void;
  error?: boolean;
  helperText?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'>;
