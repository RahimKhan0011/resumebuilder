import React from 'react';
import { Trash2 } from 'lucide-react';
import { COMMON_CLASSES } from '../utils/constants';
import InputGroup from './InputGroup';

const ExperienceCard = ({ job, onUpdate, onRemove }) => {
  return (
    <div className={`${COMMON_CLASSES.card} fade-in`}>
      <button 
        onClick={() => onRemove(job.id)}
        className={COMMON_CLASSES.deleteButton}
        title="Remove experience"
      >
        <Trash2 size={16} />
      </button>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <InputGroup 
          label="Job Title" 
          value={job.title} 
          onChange={(v) => onUpdate(job.id, 'title', v)} 
          placeholder="Software Engineer" 
        />
        <InputGroup 
          label="Company" 
          value={job.company} 
          onChange={(v) => onUpdate(job.id, 'company', v)} 
          placeholder="Acme Corp" 
        />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <InputGroup 
          label="Start Date" 
          value={job.startDate} 
          onChange={(v) => onUpdate(job.id, 'startDate', v)} 
          placeholder="Jan 2020" 
        />
        <InputGroup 
          label="End Date" 
          value={job.endDate} 
          onChange={(v) => onUpdate(job.id, 'endDate', v)} 
          placeholder="Present" 
        />
      </div>
      <InputGroup 
        multiline 
        label="Description" 
        value={job.description} 
        onChange={(v) => onUpdate(job.id, 'description', v)} 
        placeholder="Achievements and responsibilities..." 
      />
    </div>
  );
};

export default ExperienceCard;
