import React, { useState } from 'react';
import { Plus, Trash2, FileText, Code, Download, Copy, Check } from 'lucide-react';

const generateMarkdown = (data) => {
  const parts = [
    `# ${data.fullName}\n`,
    `${data.email} | ${data.phone} | ${data.location}`,
    data.linkedin ? `[LinkedIn](${data.linkedin})` : '',
    '\n---\n'
  ];

  if (data.summary) {
    parts.push(`## Professional Summary\n\n${data.summary}\n`);
  }

  if (data.experience.length > 0) {
    parts.push('## Experience\n');
    data.experience.forEach(job => {
      parts.push(
        `### ${job.title}`,
        `**${job.company}** | ${job.startDate} - ${job.endDate}\n`,
        `${job.description}\n`
      );
    });
  }

  if (data.education.length > 0) {
    parts.push('## Education\n');
    data.education.forEach(edu => {
      parts.push(
        `### ${edu.degree}`,
        `**${edu.school}** | ${edu.year}\n`
      );
    });
  }

  if (data.skills) {
    parts.push(`## Skills\n\n${data.skills}`);
  }

  return parts.filter(Boolean).join('\n\n');
};

const generateLatex = (data) => {
  const parts = [
    `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{left=2cm, right=2cm, top=2cm, bottom=2cm}
\\usepackage{enumitem}
\\usepackage{hyperref}

\\title{\\vspace{-2cm}${data.fullName}}
\\date{}
\\author{}

\\begin{document}

\\maketitle
\\vspace{-1.5cm}
\\begin{center}
    ${data.email} -- ${data.phone} -- ${data.location} \\\\
    ${data.linkedin ? `\\url{${data.linkedin}}` : ''}
\\end{center}

\\hrule
\\vspace{0.5cm}\n`
  ];

  if (data.summary) {
    parts.push(`\\section*{Professional Summary}\n${data.summary}\n`);
  }

  if (data.experience.length > 0) {
    parts.push('\\section*{Experience}\n\\begin{itemize}[leftmargin=*]');
    data.experience.forEach(job => {
      parts.push(`    \\item \\textbf{${job.title}} at \\textit{${job.company}} \\hfill ${job.startDate} -- ${job.endDate} \\\\
    ${job.description}
    \\vspace{0.2cm}`);
    });
    parts.push('\\end{itemize}\n');
  }

  if (data.education.length > 0) {
    parts.push('\\section*{Education}\n\\begin{itemize}[leftmargin=*]');
    data.education.forEach(edu => {
      parts.push(`    \\item \\textbf{${edu.degree}}, ${edu.school} \\hfill ${edu.year}`);
    });
    parts.push('\\end{itemize}\n');
  }

  if (data.skills) {
    parts.push(`\\section*{Skills}\n${data.skills}`);
  }

  parts.push('\n\\end{document}');
  return parts.join('\n');
};

const COMMON_CLASSES = {
  input: "w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition",
  sectionTitle: "text-xl font-bold uppercase text-slate-800 mb-2 border-b border-slate-300 pb-1",
  card: "bg-slate-50 p-4 rounded-lg border border-slate-200 relative group",
  deleteButton: "absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity",
  tabButton: (isActive) => `flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
    isActive ? 'bg-slate-800 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
  }`
};

const InputGroup = ({ label, value, onChange, placeholder, type = "text", multiline = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    {multiline ? (
      <textarea
        className={COMMON_CLASSES.input}
        rows="4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        className={COMMON_CLASSES.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
);

const SectionHeader = ({ title, onAdd }) => (
  <div className="flex justify-between items-center mb-4 mt-8 pb-2 border-b border-slate-200">
    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    {onAdd && (
      <button
        onClick={onAdd}
        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        <Plus size={16} /> Add New
      </button>
    )}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Alex Developer",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexdev",
    summary: "Detail-oriented software engineer with 5+ years of experience building scalable web applications. Passionate about clean code and user-centric design.",
    skills: "JavaScript (ES6+), React, Node.js, Python, SQL, Git, AWS, Tailwind CSS",
    experience: [
      {
        id: 1,
        title: "Senior Frontend Engineer",
        company: "Tech Solutions Inc.",
        startDate: "2021",
        endDate: "Present",
        description: "Led the migration of a legacy codebase to React. Improved page load times by 40%. Mentored junior developers."
      },
      {
        id: 2,
        title: "Web Developer",
        company: "Creative Agency",
        startDate: "2018",
        endDate: "2021",
        description: "Developed responsive websites for 20+ clients using HTML, CSS, and JavaScript. Collaborated with designers to ensure pixel-perfect implementation."
      }
    ],
    education: [
      {
        id: 1,
        degree: "B.S. Computer Science",
        school: "University of Technology",
        year: "2018"
      }
    ]
  });

  const handleBasicChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        { id: Date.now(), title: "", company: "", startDate: "", endDate: "", description: "" },
        ...prev.experience
      ]
    }));
  };

  const removeExperience = (id) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }));
  };

  const updateExperience = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        { id: Date.now(), degree: "", school: "", year: "" },
        ...prev.education
      ]
    }));
  };

  const removeEducation = (id) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  const updateEducation = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderPreview = () => (
    <div className="bg-white shadow-lg p-8 min-h-[800px] w-full max-w-[800px] mx-auto text-slate-800" id="resume-preview">
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
             {formData.linkedin}
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

  const renderCodeView = (content, language) => (
    <div className="bg-slate-900 rounded-lg shadow-lg overflow-hidden flex flex-col h-full max-h-[800px]">
      <div className="bg-slate-800 p-3 flex justify-between items-center border-b border-slate-700">
        <span className="text-slate-300 font-mono text-sm uppercase">{language} Source</span>
        <button
          onClick={() => copyToClipboard(content)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            copied ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy Code'}
        </button>
      </div>
      <textarea
        readOnly
        className="flex-1 bg-slate-900 text-slate-300 font-mono p-4 text-sm resize-none focus:outline-none w-full"
        value={content}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-900">
      <div className="w-full md:w-5/12 lg:w-1/3 bg-white border-r border-slate-200 h-screen overflow-y-auto custom-scrollbar shadow-xl z-10">
        <div className="p-6">
          <div className="mb-6 pb-6 border-b border-slate-100">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <FileText className="text-blue-600" />
              Resume Builder
            </h1>
            <p className="text-slate-500 text-sm mt-1">Fill in details to generate Markdown or LaTeX.</p>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Personal Info</h3>
              <InputGroup label="Full Name" value={formData.fullName} onChange={(v) => handleBasicChange('fullName', v)} placeholder="e.g. Jane Doe" />
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Email" value={formData.email} onChange={(v) => handleBasicChange('email', v)} placeholder="jane@example.com" />
                <InputGroup label="Phone" value={formData.phone} onChange={(v) => handleBasicChange('phone', v)} placeholder="(555) 123-4567" />
              </div>
              <InputGroup label="Location" value={formData.location} onChange={(v) => handleBasicChange('location', v)} placeholder="New York, NY" />
              <InputGroup label="LinkedIn / Website" value={formData.linkedin} onChange={(v) => handleBasicChange('linkedin', v)} placeholder="linkedin.com/in/janedoe" />
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Professional Summary</h3>
              <InputGroup multiline label="Summary" value={formData.summary} onChange={(v) => handleBasicChange('summary', v)} placeholder="Briefly describe your professional background..." />
            </section>

            <section>
              <SectionHeader title="Experience" onAdd={addExperience} />
              <div className="space-y-6">
                {formData.experience.map((job) => (
                  <div key={job.id} className={COMMON_CLASSES.card}>
                    <button 
                      onClick={() => removeExperience(job.id)}
                      className={COMMON_CLASSES.deleteButton}
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <InputGroup label="Job Title" value={job.title} onChange={(v) => updateExperience(job.id, 'title', v)} placeholder="Software Engineer" />
                      <InputGroup label="Company" value={job.company} onChange={(v) => updateExperience(job.id, 'company', v)} placeholder="Acme Corp" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <InputGroup label="Start Date" value={job.startDate} onChange={(v) => updateExperience(job.id, 'startDate', v)} placeholder="Jan 2020" />
                      <InputGroup label="End Date" value={job.endDate} onChange={(v) => updateExperience(job.id, 'endDate', v)} placeholder="Present" />
                    </div>
                    <InputGroup multiline label="Description" value={job.description} onChange={(v) => updateExperience(job.id, 'description', v)} placeholder="Achievements and responsibilities..." />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeader title="Education" onAdd={addEducation} />
              <div className="space-y-4">
                {formData.education.map((edu) => (
                  <div key={edu.id} className={COMMON_CLASSES.card}>
                    <button 
                      onClick={() => removeEducation(edu.id)}
                      className={COMMON_CLASSES.deleteButton}
                    >
                      <Trash2 size={16} />
                    </button>
                    <InputGroup label="Degree" value={edu.degree} onChange={(v) => updateEducation(edu.id, 'degree', v)} placeholder="BS Computer Science" />
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <InputGroup label="School" value={edu.school} onChange={(v) => updateEducation(edu.id, 'school', v)} placeholder="University of X" />
                      <InputGroup label="Year" value={edu.year} onChange={(v) => updateEducation(edu.id, 'year', v)} placeholder="2018" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 mt-8">Skills</h3>
              <InputGroup multiline label="Skills List" value={formData.skills} onChange={(v) => handleBasicChange('skills', v)} placeholder="Java, Python, Public Speaking..." />
            </section>

            <div className="h-12"></div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-7/12 lg:w-2/3 bg-slate-200 h-screen flex flex-col">
        <div className="bg-white p-3 border-b border-slate-300 flex justify-center gap-4 shadow-sm z-10">
          <button
            onClick={() => setActiveTab('preview')}
            className={COMMON_CLASSES.tabButton(activeTab === 'preview')}
          >
            <FileText size={16} /> Live Preview
          </button>
          <button
            onClick={() => setActiveTab('markdown')}
            className={COMMON_CLASSES.tabButton(activeTab === 'markdown')}
          >
            <Download size={16} /> Markdown
          </button>
          <button
            onClick={() => setActiveTab('latex')}
            className={COMMON_CLASSES.tabButton(activeTab === 'latex')}
          >
            <Code size={16} /> LaTeX
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
          {activeTab === 'preview' && renderPreview()}
          {activeTab === 'markdown' && renderCodeView(generateMarkdown(formData), 'Markdown')}
          {activeTab === 'latex' && renderCodeView(generateLatex(formData), 'LaTeX')}
        </div>
      </div>
    </div>
  );
}
