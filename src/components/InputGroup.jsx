import React from 'react';
import { COMMON_CLASSES } from '../utils/constants';

const InputGroup = ({ label, value, onChange, placeholder, type = "text", multiline = false }) => (
  <div className="mb-4 slide-in">
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    {multiline ? (
      <textarea
        className={COMMON_CLASSES.input}
        rows="4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        className={COMMON_CLASSES.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
);

export default InputGroup;
