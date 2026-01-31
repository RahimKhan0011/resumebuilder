import React from 'react';

/**
 * MIT/Jake's Resume Template
 * Based on the popular single-column, ATS-friendly LaTeX template
 * Used by MIT EECS, Georgia Tech, and many tech companies
 * Clean, minimal design with clear section headers and horizontal rules
 */
const MITTemplate = ({ formData }) => {
  // Responsive name sizing for long names
  const getNameStyle = (name) => {
    const length = name?.length || 0;
    if (length > 35) return { fontSize: '18px' };
    if (length > 28) return { fontSize: '22px' };
    if (length > 20) return { fontSize: '26px' };
    return { fontSize: '32px' };
  };

  return (
    <div 
      className="bg-white shadow-lg min-h-[1056px] w-full max-w-[816px] mx-auto text-gray-900 fade-in print:shadow-none" 
      id="resume-preview"
      style={{
        fontFamily: '"Times New Roman", Times, serif',
        padding: '48px', // ~0.67 inch margins (adjusted for web display, PDF will have 1 inch)
        boxSizing: 'border-box',
        lineHeight: '1.3'
      }}
    >
      {/* Header - Jake's Resume Style: Name centered, contact info in single line */}
      <header className="text-center mb-3">
        <h1 
          className="font-bold tracking-wide mb-1"
          style={{ 
            ...getNameStyle(formData.fullName),
            fontFamily: '"Times New Roman", Times, serif',
            wordBreak: 'break-word'
          }}
        >
          {formData.fullName}
        </h1>
        
        {/* Contact Line - All in one row with separators */}
        <div 
          style={{ fontSize: '11px' }} 
          className="text-gray-700 flex flex-wrap justify-center items-center gap-1"
        >
          {formData.phone && <span>{formData.phone}</span>}
          {formData.phone && formData.email && <span className="mx-1">|</span>}
          {formData.email && (
            <span className="text-blue-700 underline">{formData.email}</span>
          )}
          {(formData.phone || formData.email) && formData.linkedin && <span className="mx-1">|</span>}
          {formData.linkedin && (
            <span className="text-blue-700 underline">
              {formData.linkedin.replace(/^https?:\/\//, '')}
            </span>
          )}
          {formData.github && (
            <>
              <span className="mx-1">|</span>
              <span className="text-blue-700 underline">github.com/{formData.github}</span>
            </>
          )}
          {formData.portfolio && (
            <>
              <span className="mx-1">|</span>
              <span className="text-blue-700 underline">
                {formData.portfolio.replace(/^https?:\/\//, '')}
              </span>
            </>
          )}
        </div>
        {formData.location && (
          <div style={{ fontSize: '11px' }} className="text-gray-600 mt-0.5">
            {formData.location}
          </div>
        )}
      </header>

      {/* Education Section - Jake's style with horizontal rule */}
      {formData.education.length > 0 && (
        <section className="mb-3">
          <h2 
            className="font-bold uppercase tracking-wider border-b border-gray-900 pb-0.5 mb-2"
            style={{ fontSize: '12px', fontFamily: '"Times New Roman", Times, serif' }}
          >
            Education
          </h2>
          <div className="space-y-2">
            {formData.education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <span style={{ fontSize: '11px' }} className="font-bold">{edu.school}</span>
                    {edu.location && (
                      <span style={{ fontSize: '11px' }} className="text-gray-600 ml-2">{edu.location}</span>
                    )}
                  </div>
                  <span style={{ fontSize: '11px' }} className="text-gray-600 text-right">{edu.year}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span style={{ fontSize: '11px' }} className="italic">{edu.degree}</span>
                  {(edu.gpa || edu.cgpa) && (
                    <span style={{ fontSize: '11px' }} className="text-gray-600">
                      {edu.gpa && `GPA: ${edu.gpa}`}
                      {edu.gpa && edu.cgpa && ' | '}
                      {edu.cgpa && `CGPA: ${edu.cgpa}`}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience Section */}
      {formData.experience.length > 0 && (
        <section className="mb-3">
          <h2 
            className="font-bold uppercase tracking-wider border-b border-gray-900 pb-0.5 mb-2"
            style={{ fontSize: '12px', fontFamily: '"Times New Roman", Times, serif' }}
          >
            Experience
          </h2>
          <div className="space-y-2">
            {formData.experience.map(job => (
              <div key={job.id}>
                <div className="flex justify-between items-start">
                  <span style={{ fontSize: '11px' }} className="font-bold">{job.company}</span>
                  <span style={{ fontSize: '11px' }} className="text-gray-600">{job.startDate} – {job.endDate}</span>
                </div>
                <div style={{ fontSize: '11px' }} className="italic mb-1">{job.title}</div>
                {job.description && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5">
                    {job.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                      <li key={idx} style={{ fontSize: '10px' }} className="text-gray-700 leading-snug">
                        {line.replace(/^[-•]\s*/, '')}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Summary/Objective */}
      {formData.summary && (
        <section className="mb-3">
          <h2 
            className="font-bold uppercase tracking-wider border-b border-gray-900 pb-0.5 mb-1"
            style={{ fontSize: '12px', fontFamily: '"Times New Roman", Times, serif' }}
          >
            Summary
          </h2>
          <p style={{ fontSize: '11px' }} className="text-gray-700 leading-snug">{formData.summary}</p>
        </section>
      )}

      {/* Skills Section */}
      {formData.skills && (
        <section className="mb-3">
          <h2 
            className="font-bold uppercase tracking-wider border-b border-gray-900 pb-0.5 mb-1"
            style={{ fontSize: '12px', fontFamily: '"Times New Roman", Times, serif' }}
          >
            Technical Skills
          </h2>
          <p style={{ fontSize: '11px' }} className="text-gray-700 leading-snug">
            <span className="font-bold">Skills: </span>{formData.skills}
          </p>
        </section>
      )}

      {/* Languages */}
      {formData.languages && formData.languages.length > 0 && (
        <section>
          <h2 
            className="font-bold uppercase tracking-wider border-b border-gray-900 pb-0.5 mb-1"
            style={{ fontSize: '12px', fontFamily: '"Times New Roman", Times, serif' }}
          >
            Languages
          </h2>
          <p style={{ fontSize: '11px' }} className="text-gray-700">
            {formData.languages.map((lang, idx) => (
              <span key={lang.id}>
                <span className="font-semibold">{lang.language}</span>
                <span className="text-gray-500"> ({lang.proficiency})</span>
                {idx < formData.languages.length - 1 && ', '}
              </span>
            ))}
          </p>
        </section>
      )}
    </div>
  );
};

export default MITTemplate;
