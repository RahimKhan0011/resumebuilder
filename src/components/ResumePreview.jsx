import React from 'react';
import { COMMON_CLASSES } from '../utils/constants';

const ResumePreview = ({ formData }) => {
  return (
    <div className="bg-white shadow-lg p-8 min-h-[800px] w-full max-w-[800px] mx-auto text-slate-800 fade-in" id="resume-preview">
      <div className="text-center border-b-2 border-slate-800 pb-6 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{formData.fullName}</h1>
        <div className="text-sm text-slate-600 flex flex-wrap justify-center gap-3">
          <span>{formData.email}</span>
          <span>•</span>
          <span>{formData.phone}</span>
          <span>•</span>
          <span>{formData.location}</span>
        </div>
        {formData.linkedin && (
          <div className="text-sm text-blue-600 mt-1">
            <a href={`https://${formData.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer">
              {formData.linkedin}
            </a>
          </div>
        )}
      </div>

      {formData.summary && (
        <div className="mb-6">
          <h2 className={COMMON_CLASSES.sectionTitle}>Profile</h2>
          <p className="text-slate-700 leading-relaxed">{formData.summary}</p>
        </div>
      )}

      {formData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className={`${COMMON_CLASSES.sectionTitle} mb-4`}>Experience</h2>
          <div className="space-y-5">
            {formData.experience.map(job => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold text-slate-800">{job.title}</h3>
                  <span className="text-sm font-medium text-slate-500 whitespace-nowrap">{job.startDate} - {job.endDate}</span>
                </div>
                <div className="text-slate-700 font-medium italic mb-2">{job.company}</div>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {formData.education.length > 0 && (
        <div className="mb-6">
          <h2 className={`${COMMON_CLASSES.sectionTitle} mb-4`}>Education</h2>
          <div className="space-y-3">
            {formData.education.map(edu => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                  <div className="text-slate-600">{edu.school}</div>
                </div>
                <div className="text-slate-500 font-medium">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {formData.skills && (
        <div>
          <h2 className={COMMON_CLASSES.sectionTitle}>Skills</h2>
          <p className="text-slate-700 leading-relaxed">{formData.skills}</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
