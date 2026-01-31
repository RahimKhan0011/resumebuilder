import React from 'react';
import { Plus } from 'lucide-react';
import { COMMON_CLASSES } from '../utils/constants';

const SectionHeader = ({ title, onAdd }) => (
  <div className="flex justify-between items-center mb-4 mt-8 pb-2 border-b border-slate-200">
    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    {onAdd && (
      <button
        onClick={onAdd}
        className={COMMON_CLASSES.addButton}
      >
        <Plus size={16} /> Add New
      </button>
    )}
  </div>
);

export default SectionHeader;
