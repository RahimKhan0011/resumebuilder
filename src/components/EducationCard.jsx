import React from 'react';
import { Trash2 } from 'lucide-react';
import { COMMON_CLASSES } from '../utils/constants';
import InputGroup from './InputGroup';

const EducationCard = ({ edu, onUpdate, onRemove }) => {
  return (
    <div className={`${COMMON_CLASSES.card} fade-in`}>
      <button 
        onClick={() => onRemove(edu.id)}
        className={COMMON_CLASSES.deleteButton}
        title="Remove education"
      >
        <Trash2 size={16} />
      </button>
      <InputGroup 
        label="Degree" 
        value={edu.degree} 
        onChange={(v) => onUpdate(edu.id, 'degree', v)} 
        placeholder="BS Computer Science" 
      />
      <div className="grid grid-cols-2 gap-3 mt-3">
        <InputGroup 
          label="School" 
          value={edu.school} 
          onChange={(v) => onUpdate(edu.id, 'school', v)} 
          placeholder="University of X" 
        />
        <InputGroup 
          label="Year" 
          value={edu.year} 
          onChange={(v) => onUpdate(edu.id, 'year', v)} 
          placeholder="2018" 
        />
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <InputGroup 
          label="GPA (optional)" 
          value={edu.gpa || ''} 
          onChange={(v) => onUpdate(edu.id, 'gpa', v)} 
          placeholder="3.8/4.0" 
        />
        <InputGroup 
          label="CGPA (optional)" 
          value={edu.cgpa || ''} 
          onChange={(v) => onUpdate(edu.id, 'cgpa', v)} 
          placeholder="8.5/10" 
        />
      </div>
    </div>
  );
};

export default EducationCard;
