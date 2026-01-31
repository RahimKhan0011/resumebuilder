import React, { useState } from 'react';
import { FileText, Code, Download } from 'lucide-react';
import InputGroup from './components/InputGroup';
import SectionHeader from './components/SectionHeader';
import ExperienceCard from './components/ExperienceCard';
import EducationCard from './components/EducationCard';
import ResumePreview from './components/ResumePreview';
import CodeView from './components/CodeView';
import { generateMarkdown, generateLatex } from './utils/generators';
import { COMMON_CLASSES, INITIAL_DATA } from './utils/constants';

function App() {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);

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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

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
                  <ExperienceCard 
                    key={job.id}
                    job={job}
                    onUpdate={updateExperience}
                    onRemove={removeExperience}
                  />
                ))}
              </div>
            </section>

            <section>
              <SectionHeader title="Education" onAdd={addEducation} />
              <div className="space-y-4">
                {formData.education.map((edu) => (
                  <EducationCard
                    key={edu.id}
                    edu={edu}
                    onUpdate={updateEducation}
                    onRemove={removeEducation}
                  />
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
          {activeTab === 'preview' && <ResumePreview formData={formData} />}
          {activeTab === 'markdown' && (
            <CodeView 
              content={generateMarkdown(formData)} 
              language="Markdown"
              copied={copied}
              onCopy={copyToClipboard}
            />
          )}
          {activeTab === 'latex' && (
            <CodeView 
              content={generateLatex(formData)} 
              language="LaTeX"
              copied={copied}
              onCopy={copyToClipboard}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
