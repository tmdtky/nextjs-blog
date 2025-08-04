import { ComponentProps, ReactNode } from 'react';

// input要素のpropsを継承し、onChange をカスタマイズ
export interface InputProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  onChange: (value: string) => void;
}

// label要素のpropsを継承し、htmlFor と text を必須に
export interface LabelProps extends ComponentProps<'label'> {
  htmlFor: string;
  text: string;
}

// textarea要素のpropsを継承し、onChange をカスタマイズ
export interface TextareaProps extends Omit<ComponentProps<'textarea'>, 'onChange'> {
  onChange: (value: string) => void;
}

// div要素のpropsを継承し、children を必須に
export interface FormGroupProps extends ComponentProps<'div'> {
  children: ReactNode;
}

// p要素のpropsを継承し、message を必須に
export interface ErrorMessageProps extends ComponentProps<'p'> {
  message: string;
}