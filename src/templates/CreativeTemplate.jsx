import React from 'react';

/**
 * Creative Professional Resume Template
 * Bold and vibrant design for creative professionals
 * Perfect for designers, marketers, and content creators
 */
const CreativeTemplate = ({ formData }) => {
  const getNameStyle = (name) => {
    const length = name?.length || 0;
    if (length > 35) return { fontSize: '20px' };
    if (length > 28) return { fontSize: '24px' };
    if (length > 20) return { fontSize: '28px' };
    return { fontSize: '36px' };
  };

  return (
    <div 
      className="bg-white shadow-lg min-h-[1056px] w-full max-w-[816px] mx-auto text-gray-900 fade-in print:shadow-none" 
      id="resume-preview"
      style={{
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        boxSizing: 'border-box',
        lineHeight: '1.4'
      }}
    >
      {/* Header with gradient accent */}
      <header 
        className="text-white p-8 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="relative z-10">
          <h1 
            className="font-bold tracking-wide mb-2"
            style={{ 
              ...getNameStyle(formData.fullName),
              wordBreak: 'break-word',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {formData.fullName}
          </h1>
          
          {formData.summary && (
            <p style={{ fontSize: '12px' }} className="text-purple-100 max-w-xl leading-relaxed mt-3">
              {formData.summary.substring(0, 150)}{formData.summary.length > 150 ? '...' : ''}
            </p>
          )}
        </div>
        
        {/* Decorative circles */}
        <div 
          className="absolute -right-10 -top-10 w-40 h-40 rounded-full"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        />
        <div 
          className="absolute -right-5 -bottom-10 w-24 h-24 rounded-full"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        />
      </header>

      {/* Contact bar */}
      <div 
        className="px-8 py-3 flex flex-wrap gap-4 justify-center items-center text-white"
        style={{ 
          background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
          fontSize: '10px'
        }}
      >
        {formData.email && (
          <span className="flex items-center gap-1">
            <span>✉</span> {formData.email}
          </span>
        )}
        {formData.phone && (
          <span className="flex items-center gap-1">
            <span>☎</span> {formData.phone}
          </span>
        )}
        {formData.location && (
          <span className="flex items-center gap-1">
            <span>◎</span> {formData.location}
          </span>
        )}
        {formData.linkedin && (
          <span className="flex items-center gap-1">
            <span>in</span> {formData.linkedin.replace(/^https?:\/\//, '')}
          </span>
        )}
        {formData.github && (
          <span className="flex items-center gap-1">
            <span>⌘</span> github.com/{formData.github}
          </span>
        )}
      </div>

      <div className="p-8">
        {/* Experience Section */}
        {formData.experience.length > 0 && (
          <section className="mb-6">
            <h2 
              className="font-bold uppercase tracking-wider mb-4 pb-2"
              style={{ 
                fontSize: '14px',
                color: '#764ba2',
                borderBottom: '3px solid #764ba2'
              }}
            >
              Experience
            </h2>
            <div className="space-y-4">
              {formData.experience.map(job => (
                <div key={job.id} className="relative pl-4" style={{ borderLeft: '2px solid #e2e8f0' }}>
                  <div 
                    className="absolute -left-1.5 top-1 w-3 h-3 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  />
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 style={{ fontSize: '12px' }} className="font-bold text-gray-900">{job.title}</h3>
                      <p style={{ fontSize: '11px', color: '#764ba2' }} className="font-medium">{job.company}</p>
                    </div>
                    <span style={{ fontSize: '10px' }} className="text-gray-500 whitespace-nowrap ml-2">
                      {job.startDate} – {job.endDate}
                    </span>
                  </div>
                  {job.description && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 mt-2">
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

        {/* Education Section */}
        {formData.education.length > 0 && (
          <section className="mb-6">
            <h2 
              className="font-bold uppercase tracking-wider mb-4 pb-2"
              style={{ 
                fontSize: '14px',
                color: '#764ba2',
                borderBottom: '3px solid #764ba2'
              }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {formData.education.map(edu => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 style={{ fontSize: '12px' }} className="font-bold text-gray-900">{edu.school}</h3>
                    <p style={{ fontSize: '11px' }} className="text-gray-700 italic">{edu.degree}</p>
                    {(edu.gpa || edu.cgpa) && (
                      <p style={{ fontSize: '10px' }} className="text-gray-500 mt-0.5">
                        {edu.gpa && `GPA: ${edu.gpa}`}
                        {edu.gpa && edu.cgpa && ' • '}
                        {edu.cgpa && `CGPA: ${edu.cgpa}`}
                      </p>
                    )}
                  </div>
                  <span style={{ fontSize: '10px' }} className="text-gray-500">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {formData.skills && (
          <section className="mb-6">
            <h2 
              className="font-bold uppercase tracking-wider mb-4 pb-2"
              style={{ 
                fontSize: '14px',
                color: '#764ba2',
                borderBottom: '3px solid #764ba2'
              }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {formData.skills.split(',').map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 rounded-full text-white"
                  style={{ 
                    fontSize: '10px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages Section */}
        {formData.languages && formData.languages.length > 0 && (
          <section>
            <h2 
              className="font-bold uppercase tracking-wider mb-4 pb-2"
              style={{ 
                fontSize: '14px',
                color: '#764ba2',
                borderBottom: '3px solid #764ba2'
              }}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {formData.languages.map(lang => (
                <div key={lang.id} className="text-center">
                  <p style={{ fontSize: '11px' }} className="font-semibold text-gray-900">{lang.language}</p>
                  <p style={{ fontSize: '10px' }} className="text-gray-500">{lang.proficiency}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
