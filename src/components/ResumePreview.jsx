import React from 'react';
import { COMMON_CLASSES } from '../utils/constants';

const ResumePreview = ({ formData }) => {
  // Calculate dynamic font size for long names - improved responsiveness
  const getNameStyle = (name) => {
    const length = name?.length || 0;
    if (length > 35) return { fontSize: '18px', className: 'text-lg' };
    if (length > 30) return { fontSize: '22px', className: 'text-xl' };
    if (length > 25) return { fontSize: '26px', className: 'text-2xl' };
    if (length > 20) return { fontSize: '30px', className: 'text-3xl' };
    return { fontSize: '36px', className: 'text-4xl' };
  };

  const nameStyle = getNameStyle(formData.fullName);

  return (
    <div 
      className="bg-white shadow-lg p-4 sm:p-6 md:p-8 min-h-[600px] md:min-h-[800px] w-full max-w-[800px] mx-auto text-slate-800 fade-in" 
      id="resume-preview"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <div className="text-center border-b-2 border-slate-800 pb-4 sm:pb-6 mb-4 sm:mb-6">
        <h1 
          className={`${nameStyle.className} font-bold uppercase tracking-wider mb-2 px-2 break-words`}
          style={{ 
            fontSize: nameStyle.fontSize,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto'
          }}
        >
          {formData.fullName}
        </h1>
        <div className="text-xs sm:text-sm text-slate-600 flex flex-wrap justify-center gap-2 sm:gap-3">
          {formData.email && <span className="break-all">{formData.email}</span>}
          {formData.email && formData.phone && <span className="hidden sm:inline">•</span>}
          {formData.phone && <span>{formData.phone}</span>}
          {formData.phone && formData.location && <span className="hidden sm:inline">•</span>}
          {formData.location && <span>{formData.location}</span>}
        </div>
        <div className="text-xs sm:text-sm text-blue-600 mt-2 flex flex-wrap justify-center gap-2 sm:gap-3">
          {formData.linkedin && (
            <a 
              href={`https://${formData.linkedin.replace(/^https?:\/\//, '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              LinkedIn
            </a>
          )}
          {formData.github && (
            <>
              {formData.linkedin && <span className="text-slate-400 hidden sm:inline">•</span>}
              <a 
                href={`https://github.com/${formData.github}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              >
                GitHub
              </a>
            </>
          )}
          {formData.portfolio && (
            <>
              {(formData.linkedin || formData.github) && <span className="text-slate-400 hidden sm:inline">•</span>}
              <a 
                href={formData.portfolio.startsWith('http') ? formData.portfolio : `https://${formData.portfolio}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              >
                Portfolio
              </a>
            </>
          )}
        </div>
      </div>

      {formData.summary && (
        <section className="mb-4 sm:mb-6" aria-labelledby="profile-heading">
          <h2 id="profile-heading" className={COMMON_CLASSES.sectionTitle}>Profile</h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{formData.summary}</p>
        </section>
      )}

      {formData.experience.length > 0 && (
        <section className="mb-4 sm:mb-6" aria-labelledby="experience-heading">
          <h2 id="experience-heading" className={`${COMMON_CLASSES.sectionTitle} mb-3 sm:mb-4`}>Experience</h2>
          <div className="space-y-4 sm:space-y-5">
            {formData.experience.map(job => (
              <article key={job.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1 gap-0.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">{job.title}</h3>
                  <span className="text-xs sm:text-sm font-medium text-slate-500 whitespace-nowrap">{job.startDate} - {job.endDate}</span>
                </div>
                <div className="text-slate-700 font-medium italic mb-1 sm:mb-2 text-sm sm:text-base">{job.company}</div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {formData.education.length > 0 && (
        <section className="mb-4 sm:mb-6" aria-labelledby="education-heading">
          <h2 id="education-heading" className={`${COMMON_CLASSES.sectionTitle} mb-3 sm:mb-4`}>Education</h2>
          <div className="space-y-3">
            {formData.education.map(edu => (
              <article key={edu.id} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base">{edu.degree}</h3>
                  <div className="text-slate-600 text-sm">{edu.school}</div>
                  {(edu.gpa || edu.cgpa) && (
                    <div className="text-slate-500 text-xs sm:text-sm mt-1">
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      {edu.gpa && edu.cgpa && <span> • </span>}
                      {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
                    </div>
                  )}
                </div>
                <div className="text-slate-500 font-medium text-sm sm:text-base">{edu.year}</div>
              </article>
            ))}
          </div>
        </section>
      )}

      {formData.skills && (
        <section className="mb-4 sm:mb-6" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className={COMMON_CLASSES.sectionTitle}>Skills</h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{formData.skills}</p>
        </section>
      )}

      {formData.languages && formData.languages.length > 0 && (
        <section aria-labelledby="languages-heading">
          <h2 id="languages-heading" className={COMMON_CLASSES.sectionTitle}>Languages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {formData.languages.map(lang => (
              <div key={lang.id} className="text-slate-700 text-sm sm:text-base">
                <span className="font-semibold">{lang.language}</span>
                <span className="text-slate-500 text-xs sm:text-sm ml-2">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
