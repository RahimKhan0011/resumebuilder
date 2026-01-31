import React, { useState, useEffect, useCallback } from 'react';
import { FileText, Code, Download, Save, Trash2, Upload, FileJson } from 'lucide-react';
import InputGroup from './components/InputGroup';
import SectionHeader from './components/SectionHeader';
import ExperienceCard from './components/ExperienceCard';
import EducationCard from './components/EducationCard';
import LanguageCard from './components/LanguageCard';
import ResumePreview from './components/ResumePreview';
import CodeView from './components/CodeView';
import { generateMarkdown, generateLatex, generateJSON } from './utils/generators';
import { COMMON_CLASSES, INITIAL_DATA } from './utils/constants';
import { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage } from './utils/storage';
import { generatePDF, downloadFile } from './utils/pdfGenerator';

function App() {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      // Ensure languages array exists for backward compatibility
      if (!savedData.languages) {
        savedData.languages = [];
      }
      setFormData(savedData);
      setSaveStatus('Loaded from storage');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  }, []);

  // Auto-save to localStorage with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (JSON.stringify(formData) !== JSON.stringify(INITIAL_DATA)) {
        saveToLocalStorage(formData);
        setSaveStatus('Auto-saved');
        setTimeout(() => setSaveStatus(''), 1500);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData]);

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
        { id: Date.now(), degree: "", school: "", year: "", gpa: "", cgpa: "" },
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

  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [
        { id: Date.now(), language: "", proficiency: "Intermediate" },
        ...prev.languages
      ]
    }));
  };

  const removeLanguage = (id) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(item => item.id !== id)
    }));
  };

  const updateLanguage = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.map(item => 
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

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      clearLocalStorage();
      setFormData(INITIAL_DATA);
      setSaveStatus('Data cleared');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  };

  const handleLoadSample = () => {
    setFormData(INITIAL_DATA);
    setSaveStatus('Sample data loaded');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleExportPDF = async () => {
    setIsSaving(true);
    setSaveStatus('Generating PDF...');
    
    const result = await generatePDF('resume-preview', `${formData.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    
    if (result.success) {
      setSaveStatus('PDF downloaded!');
    } else {
      setSaveStatus('PDF generation failed');
    }
    
    setIsSaving(false);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleExportJSON = () => {
    const json = generateJSON(formData);
    downloadFile(json, `${formData.fullName.replace(/\s+/g, '_')}_Resume.json`, 'application/json');
    setSaveStatus('JSON exported!');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleExportMarkdown = () => {
    const markdown = generateMarkdown(formData);
    downloadFile(markdown, `${formData.fullName.replace(/\s+/g, '_')}_Resume.md`, 'text/markdown');
    setSaveStatus('Markdown exported!');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleExportLatex = () => {
    const latex = generateLatex(formData);
    downloadFile(latex, `${formData.fullName.replace(/\s+/g, '_')}_Resume.tex`, 'text/plain');
    setSaveStatus('LaTeX exported!');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-900">
      <div className="w-full md:w-5/12 lg:w-1/3 bg-white border-r border-slate-200 h-screen overflow-y-auto custom-scrollbar shadow-xl z-10">
        <div className="p-6">
          <div className="mb-6 pb-6 border-b border-slate-100 text-center">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <FileText className="text-blue-600" />
              Resume Builder
            </h1>
            <p className="text-slate-500 text-sm mt-1">Fill in details to generate your resume.</p>
            {saveStatus && (
              <div className="mt-2 text-xs text-green-600 flex items-center justify-center gap-1">
                <Save size={12} /> {saveStatus}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={handleExportPDF}
              disabled={isSaving}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Download size={14} /> Export PDF
            </button>
            <button
              onClick={handleExportMarkdown}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Download size={14} /> Export MD
            </button>
            <button
              onClick={handleExportLatex}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Download size={14} /> Export LaTeX
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FileJson size={14} /> Export JSON
            </button>
            <button
              onClick={handleLoadSample}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              <Upload size={14} /> Load Sample
            </button>
            <button
              onClick={handleClearData}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              <Trash2 size={14} /> Clear All
            </button>
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
              <InputGroup label="LinkedIn" value={formData.linkedin} onChange={(v) => handleBasicChange('linkedin', v)} placeholder="linkedin.com/in/janedoe" />
              <InputGroup label="GitHub Username" value={formData.github} onChange={(v) => handleBasicChange('github', v)} placeholder="janedoe" />
              <InputGroup label="Portfolio Website" value={formData.portfolio} onChange={(v) => handleBasicChange('portfolio', v)} placeholder="https://janedoe.com" />
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
              <InputGroup multiline label="Skills List (comma separated)" value={formData.skills} onChange={(v) => handleBasicChange('skills', v)} placeholder="JavaScript, Python, React, Node.js..." />
            </section>

            <section>
              <SectionHeader title="Languages" onAdd={addLanguage} />
              <div className="space-y-4">
                {formData.languages.map((lang) => (
                  <LanguageCard
                    key={lang.id}
                    lang={lang}
                    onUpdate={updateLanguage}
                    onRemove={removeLanguage}
                  />
                ))}
              </div>
            </section>

            <div className="h-12"></div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-full md:w-7/12 lg:w-2/3 bg-slate-200 h-screen flex-col">
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
          <button
            onClick={() => setActiveTab('json')}
            className={COMMON_CLASSES.tabButton(activeTab === 'json')}
          >
            <FileJson size={16} /> JSON
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
          {activeTab === 'json' && (
            <CodeView 
              content={generateJSON(formData)} 
              language="JSON"
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
