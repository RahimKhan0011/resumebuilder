import React from 'react';

/**
 * Oxford/Harvard Classic Resume Template
 * Traditional academic resume style used by Oxford, Harvard, and Cambridge
 * Single column, Times New Roman, formal and elegant
 * 1 inch margins, clean typography
 */
const OxfordTemplate = ({ formData }) => {
  // Responsive name sizing for long names
  const getNameStyle = (name) => {
    const length = name?.length || 0;
    if (length > 35) return { fontSize: '20px' };
    if (length > 28) return { fontSize: '24px' };
    if (length > 20) return { fontSize: '28px' };
    return { fontSize: '32px' };
  };

  return (
    <div 
      className="bg-white shadow-lg min-h-[1056px] w-full max-w-[816px] mx-auto text-gray-900 fade-in print:shadow-none" 
      id="resume-preview"
      style={{
        fontFamily: '"Times New Roman", Times, serif',
        padding: '72px', // 1 inch margins
        boxSizing: 'border-box',
        lineHeight: '1.4'
      }}
    >
      {/* Header - Classic Oxford Style */}
      <header className="text-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 
          className="font-bold mb-2"
          style={{ 
            ...getNameStyle(formData.fullName),
            fontFamily: '"Times New Roman", Times, serif',
            letterSpacing: '1px',
            wordBreak: 'break-word'
          }}
        >
          {formData.fullName}
        </h1>
        
        {/* Contact Information - Classic layout */}
        <div style={{ fontSize: '12px' }} className="text-gray-600 space-y-1">
          <div className="flex flex-wrap justify-center items-center gap-2">
            {formData.location && <span>{formData.location}</span>}
            {formData.location && formData.phone && <span>•</span>}
            {formData.phone && <span>{formData.phone}</span>}
            {formData.phone && formData.email && <span>•</span>}
            {formData.email && <span>{formData.email}</span>}
          </div>
          {(formData.linkedin || formData.github || formData.portfolio) && (
            <div className="flex flex-wrap justify-center items-center gap-2 text-gray-500">
              {formData.linkedin && (
                <span>{formData.linkedin.replace(/^https?:\/\//, '')}</span>
              )}
              {formData.linkedin && formData.github && <span>•</span>}
              {formData.github && (
                <span>github.com/{formData.github}</span>
              )}
              {(formData.linkedin || formData.github) && formData.portfolio && <span>•</span>}
              {formData.portfolio && (
                <span>{formData.portfolio.replace(/^https?:\/\//, '')}</span>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {formData.summary && (
        <section className="mb-5">
          <h2 
            className="font-bold text-gray-800 mb-2 uppercase tracking-wide"
            style={{ fontSize: '14px', fontFamily: '"Times New Roman", Times, serif' }}
          >
            Personal Statement
          </h2>
          <div className="border-l-2 border-gray-300 pl-4">
            <p style={{ fontSize: '12px' }} className="text-gray-700 leading-relaxed text-justify">
              {formData.summary}
            </p>
          </div>
        </section>
      )}

      {/* Education - Prominent for academic template */}
      {formData.education.length > 0 && (
        <section className="mb-5">
          <h2 
            className="font-bold text-gray-800 mb-3 uppercase tracking-wide"
            style={{ fontSize: '14px', fontFamily: '"Times New Roman", Times, serif' }}
          >
            Education
          </h2>
          <div className="space-y-4">
            {formData.education.map(edu => (
              <div key={edu.id} className="border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 style={{ fontSize: '13px' }} className="font-bold text-gray-900">
                      {edu.school}
                    </h3>
                    <div style={{ fontSize: '12px' }} className="text-gray-700 italic">
                      {edu.degree}
                    </div>
                  </div>
                  <div style={{ fontSize: '12px' }} className="text-gray-500 text-right">
                    {edu.year}
                  </div>
                </div>
                {(edu.gpa || edu.cgpa) && (
                  <div style={{ fontSize: '11px' }} className="text-gray-600">
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    {edu.gpa && edu.cgpa && <span className="mx-2">|</span>}
                    {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {formData.experience.length > 0 && (
        <section className="mb-5">
          <h2 
            className="font-bold text-gray-800 mb-3 uppercase tracking-wide"
            style={{ fontSize: '14px', fontFamily: '"Times New Roman", Times, serif' }}
          >
            Professional Experience
          </h2>
          <div className="space-y-4">
            {formData.experience.map(job => (
              <div key={job.id} className="border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 style={{ fontSize: '13px' }} className="font-bold text-gray-900">
                      {job.title}
                    </h3>
                    <div style={{ fontSize: '12px' }} className="text-gray-700 italic">
                      {job.company}
                    </div>
                  </div>
                  <div style={{ fontSize: '11px' }} className="text-gray-500 text-right whitespace-nowrap">
                    {job.startDate} – {job.endDate}
                  </div>
                </div>
                {job.description && (
                  <div style={{ fontSize: '11px' }} className="text-gray-600 mt-1">
                    {job.description.includes('\n') ? (
                      <ul className="list-disc list-outside ml-4 space-y-0.5">
                        {job.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                          <li key={idx} className="leading-snug">
                            {line.replace(/^[-•]\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="leading-relaxed">{job.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {formData.skills && (
        <section className="mb-5">
          <h2 
            className="font-bold text-gray-800 mb-2 uppercase tracking-wide"
            style={{ fontSize: '14px', fontFamily: '"Times New Roman", Times, serif' }}
          >
            Skills & Competencies
          </h2>
          <div className="border-l-2 border-gray-300 pl-4">
            <p style={{ fontSize: '12px' }} className="text-gray-700 leading-relaxed">
              {formData.skills}
            </p>
          </div>
        </section>
      )}

      {/* Languages */}
      {formData.languages && formData.languages.length > 0 && (
        <section>
          <h2 
            className="font-bold text-gray-800 mb-2 uppercase tracking-wide"
            style={{ fontSize: '14px', fontFamily: '"Times New Roman", Times, serif' }}
          >
            Languages
          </h2>
          <div className="border-l-2 border-gray-300 pl-4">
            <div style={{ fontSize: '12px' }} className="text-gray-700">
              {formData.languages.map((lang, idx) => (
                <span key={lang.id}>
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-gray-500"> ({lang.proficiency})</span>
                  {idx < formData.languages.length - 1 && <span className="mx-2">|</span>}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-gray-200 text-center">
        <p style={{ fontSize: '10px' }} className="text-gray-400 italic">
          References available upon request
        </p>
      </footer>
    </div>
  );
};

export default OxfordTemplate;
