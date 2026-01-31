import React from 'react';

/**
 * Minimalist Modern Resume Template
 * Clean and elegant minimalist design
 * Focuses on content with subtle styling for a professional look
 */
const MinimalistTemplate = ({ formData }) => {
  const getNameStyle = (name) => {
    const length = name?.length || 0;
    if (length > 35) return { fontSize: '22px' };
    if (length > 28) return { fontSize: '26px' };
    if (length > 20) return { fontSize: '30px' };
    return { fontSize: '36px' };
  };

  return (
    <div 
      className="bg-white shadow-lg min-h-[1056px] w-full max-w-[816px] mx-auto text-gray-900 fade-in print:shadow-none" 
      id="resume-preview"
      style={{
        fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '56px',
        boxSizing: 'border-box',
        lineHeight: '1.5'
      }}
    >
      {/* Header - Minimalist centered design */}
      <header className="text-center mb-8 pb-6" style={{ borderBottom: '1px solid #e5e7eb' }}>
        <h1 
          className="font-light tracking-wide mb-3"
          style={{ 
            ...getNameStyle(formData.fullName),
            wordBreak: 'break-word',
            color: '#111827',
            letterSpacing: '0.05em'
          }}
        >
          {formData.fullName}
        </h1>
        
        {/* Contact Info */}
        <div 
          style={{ fontSize: '11px' }} 
          className="text-gray-500 flex flex-wrap justify-center items-center gap-3"
        >
          {formData.email && <span>{formData.email}</span>}
          {formData.email && formData.phone && <span className="text-gray-300">|</span>}
          {formData.phone && <span>{formData.phone}</span>}
          {(formData.email || formData.phone) && formData.location && <span className="text-gray-300">|</span>}
          {formData.location && <span>{formData.location}</span>}
        </div>
        
        {/* Links */}
        {(formData.linkedin || formData.github || formData.portfolio) && (
          <div 
            style={{ fontSize: '10px' }} 
            className="text-gray-400 flex flex-wrap justify-center items-center gap-3 mt-2"
          >
            {formData.linkedin && (
              <span>{formData.linkedin.replace(/^https?:\/\//, '')}</span>
            )}
            {formData.github && (
              <span>github.com/{formData.github}</span>
            )}
            {formData.portfolio && (
              <span>{formData.portfolio.replace(/^https?:\/\//, '')}</span>
            )}
          </div>
        )}
      </header>

      {/* Summary */}
      {formData.summary && (
        <section className="mb-6">
          <p style={{ fontSize: '11px' }} className="text-gray-600 text-center max-w-xl mx-auto leading-relaxed">
            {formData.summary}
          </p>
        </section>
      )}

      {/* Experience Section */}
      {formData.experience.length > 0 && (
        <section className="mb-6">
          <h2 
            className="font-medium uppercase tracking-widest mb-4 text-center"
            style={{ 
              fontSize: '11px',
              color: '#6b7280',
              letterSpacing: '0.15em'
            }}
          >
            Experience
          </h2>
          <div className="space-y-5">
            {formData.experience.map(job => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 style={{ fontSize: '12px' }} className="font-medium text-gray-900">{job.title}</h3>
                    <p style={{ fontSize: '11px' }} className="text-gray-500">{job.company}</p>
                  </div>
                  <span style={{ fontSize: '10px' }} className="text-gray-400 whitespace-nowrap ml-4">
                    {job.startDate} — {job.endDate}
                  </span>
                </div>
                {job.description && (
                  <ul className="mt-2 space-y-1">
                    {job.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                      <li 
                        key={idx} 
                        style={{ fontSize: '10px' }} 
                        className="text-gray-600 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-gray-400"
                      >
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

      {/* Education Section */}
      {formData.education.length > 0 && (
        <section className="mb-6">
          <h2 
            className="font-medium uppercase tracking-widest mb-4 text-center"
            style={{ 
              fontSize: '11px',
              color: '#6b7280',
              letterSpacing: '0.15em'
            }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {formData.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 style={{ fontSize: '12px' }} className="font-medium text-gray-900">{edu.school}</h3>
                  <p style={{ fontSize: '11px' }} className="text-gray-500">{edu.degree}</p>
                  {(edu.gpa || edu.cgpa) && (
                    <p style={{ fontSize: '10px' }} className="text-gray-400 mt-0.5">
                      {edu.gpa && `GPA: ${edu.gpa}`}
                      {edu.gpa && edu.cgpa && ' · '}
                      {edu.cgpa && `CGPA: ${edu.cgpa}`}
                    </p>
                  )}
                </div>
                <span style={{ fontSize: '10px' }} className="text-gray-400 whitespace-nowrap ml-4">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {formData.skills && (
        <section className="mb-6">
          <h2 
            className="font-medium uppercase tracking-widest mb-4 text-center"
            style={{ 
              fontSize: '11px',
              color: '#6b7280',
              letterSpacing: '0.15em'
            }}
          >
            Skills
          </h2>
          <p style={{ fontSize: '11px' }} className="text-gray-600 text-center">
            {formData.skills}
          </p>
        </section>
      )}

      {/* Languages Section */}
      {formData.languages && formData.languages.length > 0 && (
        <section>
          <h2 
            className="font-medium uppercase tracking-widest mb-4 text-center"
            style={{ 
              fontSize: '11px',
              color: '#6b7280',
              letterSpacing: '0.15em'
            }}
          >
            Languages
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {formData.languages.map(lang => (
              <div key={lang.id} className="text-center">
                <p style={{ fontSize: '11px' }} className="font-medium text-gray-900">{lang.language}</p>
                <p style={{ fontSize: '10px' }} className="text-gray-400">{lang.proficiency}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalistTemplate;
