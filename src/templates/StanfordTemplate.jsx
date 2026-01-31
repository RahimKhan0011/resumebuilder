import React from 'react';

/**
 * Stanford/Modern Resume Template
 * Modern two-column design with colored sidebar
 * Clean sans-serif design popular with tech professionals
 * Uses Arial/Helvetica for a clean, modern look
 */
const StanfordTemplate = ({ formData }) => {
  // Responsive name sizing for long names
  const getNameStyle = (name) => {
    const length = name?.length || 0;
    if (length > 30) return { fontSize: '20px' };
    if (length > 24) return { fontSize: '24px' };
    if (length > 18) return { fontSize: '28px' };
    return { fontSize: '32px' };
  };

  return (
    <div 
      className="bg-white shadow-lg min-h-[1056px] w-full max-w-[816px] mx-auto text-gray-900 fade-in print:shadow-none" 
      id="resume-preview"
      style={{
        fontFamily: 'Arial, "Helvetica Neue", sans-serif',
        boxSizing: 'border-box',
        lineHeight: '1.35'
      }}
    >
      {/* Two-column layout */}
      <div className="flex min-h-[1056px]">
        {/* Left Sidebar - 30% width */}
        <div 
          className="w-[30%] p-4" 
          style={{ 
            backgroundColor: '#1a365d',
            color: 'white'
          }}
        >
          {/* Name */}
          <div className="mb-6 pb-4 border-b border-blue-400/30">
            <h1 
              className="font-bold text-white leading-tight"
              style={{ 
                ...getNameStyle(formData.fullName),
                wordBreak: 'break-word'
              }}
            >
              {formData.fullName}
            </h1>
            {formData.summary && (
              <p style={{ fontSize: '10px' }} className="mt-2 text-blue-200 leading-snug">
                {formData.summary.substring(0, 120)}{formData.summary.length > 120 ? '...' : ''}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h3 
              style={{ fontSize: '11px' }} 
              className="font-bold uppercase tracking-wider mb-2 text-blue-300"
            >
              Contact
            </h3>
            <div className="space-y-1.5" style={{ fontSize: '10px' }}>
              {formData.email && (
                <div className="flex items-start gap-2">
                  <span className="text-blue-300">✉</span>
                  <span className="break-all">{formData.email}</span>
                </div>
              )}
              {formData.phone && (
                <div className="flex items-start gap-2">
                  <span className="text-blue-300">☎</span>
                  <span>{formData.phone}</span>
                </div>
              )}
              {formData.location && (
                <div className="flex items-start gap-2">
                  <span className="text-blue-300">◎</span>
                  <span>{formData.location}</span>
                </div>
              )}
              {formData.linkedin && (
                <div className="flex items-start gap-2">
                  <span className="text-blue-300">in</span>
                  <span className="break-all text-blue-200">
                    {formData.linkedin.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              )}
              {formData.github && (
                <div className="flex items-start gap-2">
                  <span className="text-blue-300">⌘</span>
                  <span className="text-blue-200">github.com/{formData.github}</span>
                </div>
              )}
              {formData.portfolio && (
                <div className="flex items-start gap-2">
                  <span className="text-blue-300">◆</span>
                  <span className="break-all text-blue-200">
                    {formData.portfolio.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Skills in sidebar */}
          {formData.skills && (
            <div className="mb-6">
              <h3 
                style={{ fontSize: '11px' }} 
                className="font-bold uppercase tracking-wider mb-2 text-blue-300"
              >
                Skills
              </h3>
              <div style={{ fontSize: '10px' }} className="leading-relaxed">
                {formData.skills.split(',').map((skill, idx) => (
                  <span key={idx} className="inline-block bg-blue-800/50 px-1.5 py-0.5 rounded mr-1 mb-1">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages in sidebar */}
          {formData.languages && formData.languages.length > 0 && (
            <div>
              <h3 
                style={{ fontSize: '11px' }} 
                className="font-bold uppercase tracking-wider mb-2 text-blue-300"
              >
                Languages
              </h3>
              <div className="space-y-1" style={{ fontSize: '10px' }}>
                {formData.languages.map(lang => (
                  <div key={lang.id} className="flex justify-between">
                    <span>{lang.language}</span>
                    <span className="text-blue-300">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content - 70% width */}
        <div className="w-[70%] p-5" style={{ backgroundColor: '#ffffff' }}>
          {/* Education */}
          {formData.education.length > 0 && (
            <section className="mb-5">
              <h2 
                className="font-bold uppercase tracking-wider text-blue-900 border-b-2 border-blue-900 pb-1 mb-3"
                style={{ fontSize: '13px' }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {formData.education.map(edu => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <h3 style={{ fontSize: '12px' }} className="font-bold text-gray-900">
                        {edu.school}
                      </h3>
                      <span style={{ fontSize: '10px' }} className="text-gray-500 text-right">
                        {edu.year}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px' }} className="text-gray-700 italic">
                      {edu.degree}
                    </div>
                    {(edu.gpa || edu.cgpa) && (
                      <div style={{ fontSize: '10px' }} className="text-gray-500 mt-0.5">
                        {edu.gpa && `GPA: ${edu.gpa}`}
                        {edu.gpa && edu.cgpa && ' • '}
                        {edu.cgpa && `CGPA: ${edu.cgpa}`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {formData.experience.length > 0 && (
            <section className="mb-5">
              <h2 
                className="font-bold uppercase tracking-wider text-blue-900 border-b-2 border-blue-900 pb-1 mb-3"
                style={{ fontSize: '13px' }}
              >
                Experience
              </h2>
              <div className="space-y-4">
                {formData.experience.map(job => (
                  <div key={job.id}>
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 style={{ fontSize: '12px' }} className="font-bold text-gray-900">
                        {job.title}
                      </h3>
                      <span style={{ fontSize: '10px' }} className="text-gray-500 text-right whitespace-nowrap ml-2">
                        {job.startDate} – {job.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px' }} className="text-blue-800 font-medium mb-1">
                      {job.company}
                    </div>
                    {job.description && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5">
                        {job.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                          <li key={idx} style={{ fontSize: '10px' }} className="text-gray-600 leading-snug">
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

          {/* Full Summary (if longer) */}
          {formData.summary && formData.summary.length > 120 && (
            <section className="mb-5">
              <h2 
                className="font-bold uppercase tracking-wider text-blue-900 border-b-2 border-blue-900 pb-1 mb-2"
                style={{ fontSize: '13px' }}
              >
                About
              </h2>
              <p style={{ fontSize: '11px' }} className="text-gray-700 leading-relaxed">
                {formData.summary}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default StanfordTemplate;
