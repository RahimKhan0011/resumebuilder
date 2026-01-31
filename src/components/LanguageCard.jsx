import React from 'react';
import { Trash2 } from 'lucide-react';
import { COMMON_CLASSES } from '../utils/constants';
import InputGroup from './InputGroup';

const LanguageCard = ({ lang, onUpdate, onRemove }) => {
  return (
    <div className={`${COMMON_CLASSES.card} fade-in`}>
      <button 
        onClick={() => onRemove(lang.id)}
        className={COMMON_CLASSES.deleteButton}
        title="Remove language"
      >
        <Trash2 size={16} />
      </button>
      <div className="grid grid-cols-2 gap-3">
        <InputGroup 
          label="Language" 
          value={lang.language} 
          onChange={(v) => onUpdate(lang.id, 'language', v)} 
          placeholder="English" 
        />
        <div>
          <label className="block text-xs text-slate-600 mb-1">Proficiency</label>
          <select
            value={lang.proficiency}
            onChange={(e) => onUpdate(lang.id, 'proficiency', e.target.value)}
            className={COMMON_CLASSES.input}
          >
            <option value="Native">Native</option>
            <option value="Fluent">Fluent</option>
            <option value="Advanced">Advanced</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Basic">Basic</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LanguageCard;
