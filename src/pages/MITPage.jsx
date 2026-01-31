import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Code, Download, Save, Trash2, Upload, FileJson, ArrowLeft, FileType } from 'lucide-react';
import InputGroup from '../components/InputGroup';
import SectionHeader from '../components/SectionHeader';
import ExperienceCard from '../components/ExperienceCard';
import EducationCard from '../components/EducationCard';
import LanguageCard from '../components/LanguageCard';
import CodeView from '../components/CodeView';
import { MITTemplate } from '../templates';
import { generateMarkdown, generateLatex, generateJSON } from '../utils/generators';
import { COMMON_CLASSES, INITIAL_DATA } from '../utils/constants';
import { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage } from '../utils/storage';
import { generatePDF, downloadFile, generateDOCX } from '../utils/pdfGenerator';

function MITPage() {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
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
    
    const result = await generatePDF('resume-preview', `${formData.fullName.replace(/\s+/g, '_')}_Resume_MIT.pdf`);
    
    if (result.success) {
      setSaveStatus('PDF downloaded!');
    } else {
      setSaveStatus('PDF generation failed');
    }
    
    setIsSaving(false);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleExportDOCX = async () => {
    setIsSaving(true);
    setSaveStatus('Generating DOCX...');
    
    try {
      await generateDOCX(formData, `${formData.fullName.replace(/\s+/g, '_')}_Resume_MIT.docx`);
      setSaveStatus('DOCX downloaded!');
    } catch (error) {
      console.error('DOCX generation failed:', error);
      setSaveStatus('DOCX generation failed');
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
      {/* Form Panel */}
      <div className="w-full md:w-5/12 lg:w-1/3 bg-white border-r border-slate-200 h-screen overflow-y-auto custom-scrollbar shadow-xl z-10">
        <div className="p-4 sm:p-6">
          {/* Header with back button */}
          <div className="mb-6 pb-6 border-b border-slate-100">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 mb-4 transition-colors"
              aria-label="Back to template selection"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back to Templates</span>
            </Link>
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                <FileText className="text-red-700" aria-hidden="true" />
                MIT Template
              </h1>
              <p className="text-slate-500 text-sm mt-1">Academic & Research focused design</p>
              {saveStatus && (
                <div className="mt-2 text-xs text-green-600 flex items-center justify-center gap-1" role="status" aria-live="polite">
                  <Save size={12} aria-hidden="true" /> {saveStatus}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={handleExportPDF}
              disabled={isSaving}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Export resume as PDF"
            >
              <Download size={14} aria-hidden="true" /> PDF
            </button>
            <button
              onClick={handleExportDOCX}
              disabled={isSaving}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Export resume as DOCX"
            >
              <FileType size={14} aria-hidden="true" /> DOCX
            </button>
            <button
              onClick={handleExportMarkdown}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Export resume as Markdown"
            >
              <Download size={14} aria-hidden="true" /> MD
            </button>
            <button
              onClick={handleExportLatex}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label="Export resume as LaTeX"
            >
              <Download size={14} aria-hidden="true" /> LaTeX
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              aria-label="Export resume as JSON"
            >
              <FileJson size={14} aria-hidden="true" /> JSON
            </button>
            <button
              onClick={handleLoadSample}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              aria-label="Load sample data"
            >
              <Upload size={14} aria-hidden="true" /> Sample
            </button>
            <button
              onClick={handleClearData}
              className="flex items-center gap-1 px-3 py-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Clear all data"
            >
              <Trash2 size={14} aria-hidden="true" /> Clear
            </button>
          </div>

          {/* Form Sections */}
          <div className="space-y-6">
            <section aria-labelledby="personal-info-heading">
              <h3 id="personal-info-heading" className="text-lg font-semibold text-slate-800 mb-4">Personal Info</h3>
              <InputGroup label="Full Name" value={formData.fullName} onChange={(v) => handleBasicChange('fullName', v)} placeholder="e.g. Jane Doe" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputGroup label="Email" value={formData.email} onChange={(v) => handleBasicChange('email', v)} placeholder="jane@example.com" />
                <InputGroup label="Phone" value={formData.phone} onChange={(v) => handleBasicChange('phone', v)} placeholder="(555) 123-4567" />
              </div>
              <InputGroup label="Location" value={formData.location} onChange={(v) => handleBasicChange('location', v)} placeholder="New York, NY" />
              <InputGroup label="LinkedIn" value={formData.linkedin} onChange={(v) => handleBasicChange('linkedin', v)} placeholder="linkedin.com/in/janedoe" />
              <InputGroup label="GitHub Username" value={formData.github} onChange={(v) => handleBasicChange('github', v)} placeholder="janedoe" />
              <InputGroup label="Portfolio Website" value={formData.portfolio} onChange={(v) => handleBasicChange('portfolio', v)} placeholder="https://janedoe.com" />
            </section>

            <section aria-labelledby="summary-heading">
              <h3 id="summary-heading" className="text-lg font-semibold text-slate-800 mb-4">Professional Summary</h3>
              <InputGroup multiline label="Summary" value={formData.summary} onChange={(v) => handleBasicChange('summary', v)} placeholder="Briefly describe your professional background..." />
            </section>

            <section aria-labelledby="experience-heading">
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

            <section aria-labelledby="education-heading">
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

            <section aria-labelledby="skills-heading">
              <h3 id="skills-heading" className="text-lg font-semibold text-slate-800 mb-4 mt-8">Skills</h3>
              <InputGroup multiline label="Skills List (comma separated)" value={formData.skills} onChange={(v) => handleBasicChange('skills', v)} placeholder="JavaScript, Python, React, Node.js..." />
            </section>

            <section aria-labelledby="languages-heading">
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

      {/* Preview Panel */}
      <div className="hidden md:flex w-full md:w-7/12 lg:w-2/3 bg-slate-200 h-screen flex-col">
        <div className="bg-white p-3 border-b border-slate-300 flex justify-center gap-2 sm:gap-4 shadow-sm z-10 flex-wrap">
          <button
            onClick={() => setActiveTab('preview')}
            className={COMMON_CLASSES.tabButton(activeTab === 'preview')}
            aria-pressed={activeTab === 'preview'}
          >
            <FileText size={16} aria-hidden="true" /> <span className="hidden sm:inline">Live</span> Preview
          </button>
          <button
            onClick={() => setActiveTab('markdown')}
            className={COMMON_CLASSES.tabButton(activeTab === 'markdown')}
            aria-pressed={activeTab === 'markdown'}
          >
            <Download size={16} aria-hidden="true" /> Markdown
          </button>
          <button
            onClick={() => setActiveTab('latex')}
            className={COMMON_CLASSES.tabButton(activeTab === 'latex')}
            aria-pressed={activeTab === 'latex'}
          >
            <Code size={16} aria-hidden="true" /> LaTeX
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={COMMON_CLASSES.tabButton(activeTab === 'json')}
            aria-pressed={activeTab === 'json'}
          >
            <FileJson size={16} aria-hidden="true" /> JSON
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
          {activeTab === 'preview' && <MITTemplate formData={formData} />}
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

      {/* Mobile Preview Button */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-3 bg-red-700 text-white rounded-full shadow-lg hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Back to template selection"
        >
          <ArrowLeft size={20} aria-hidden="true" />
          <span className="text-sm font-medium">Templates</span>
        </Link>
      </div>
    </div>
  );
}

export default MITPage;
