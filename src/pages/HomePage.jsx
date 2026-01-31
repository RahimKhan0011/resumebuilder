import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';

/**
 * Home Page - Template Selection
 * Displays available resume templates with preview images and descriptions
 * Fully responsive for all devices
 */
function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const templates = [
    {
      id: 'mit',
      name: 'MIT / Jake\'s Resume',
      description: 'Clean, single-column, ATS-friendly template. Perfect for tech jobs, engineering roles, and software developers.',
      features: ['ATS-Optimized', 'Single Column', 'Clean Layout', 'Tech-Focused'],
      path: '/mit',
      color: 'from-gray-800 to-gray-900',
      accent: 'bg-gray-700',
      icon: <Briefcase className="w-8 h-8" />
    },
    {
      id: 'stanford',
      name: 'Stanford / Deedy',
      description: 'Modern two-column design with a colored sidebar. Great for showcasing skills prominently alongside experience.',
      features: ['Two-Column', 'Modern Design', 'Skills Sidebar', 'Visual Impact'],
      path: '/stanford',
      color: 'from-blue-800 to-blue-900',
      accent: 'bg-blue-700',
      icon: <FileText className="w-8 h-8" />
    },
    {
      id: 'oxford',
      name: 'Oxford / Harvard Classic',
      description: 'Traditional academic style with Times New Roman. Ideal for academic positions, research, and formal applications.',
      features: ['Academic Style', 'Traditional', 'Formal Layout', 'Times New Roman'],
      path: '/oxford',
      color: 'from-gray-700 to-gray-800',
      accent: 'bg-gray-600',
      icon: <GraduationCap className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">
                  Resume Builder
                </h1>
                <p className="text-slate-500 text-sm hidden sm:block">
                  Create professional resumes in minutes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
              <span>Free • No Sign-up Required</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Choose Your Resume Template
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Select from professionally designed templates inspired by top universities and tech companies.
            Export to PDF, DOCX, Markdown, or LaTeX.
          </p>
        </div>
      </section>

      {/* Template Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {templates.map((template, index) => (
              <Link
                key={template.id}
                to={template.path}
                className={`group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                aria-label={`Use ${template.name} template`}
              >
                {/* Template Preview Header */}
                <div className={`bg-gradient-to-r ${template.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${template.accent} rounded-lg`}>
                      {template.icon}
                    </div>
                    <ArrowRight 
                      className="w-6 h-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" 
                      aria-hidden="true" 
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{template.name}</h3>
                </div>

                {/* Template Info */}
                <div className="p-5 sm:p-6">
                  <p className="text-slate-600 text-sm sm:text-base mb-4 leading-relaxed">
                    {template.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 text-xs sm:text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <span className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm sm:text-base group-hover:text-blue-700 transition-colors">
                      Use This Template
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 sm:py-16 px-4 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 text-center mb-8 sm:mb-12">
            Why Use Our Resume Builder?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: 'Multiple Formats',
                description: 'Export to PDF, DOCX, Markdown, LaTeX, and JSON',
                icon: '📄'
              },
              {
                title: 'ATS-Friendly',
                description: 'Optimized for Applicant Tracking Systems',
                icon: '✅'
              },
              {
                title: 'Auto-Save',
                description: 'Your data is automatically saved locally',
                icon: '💾'
              },
              {
                title: 'Responsive',
                description: 'Works on desktop, tablet, and mobile',
                icon: '📱'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="text-center p-4 sm:p-6"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4" role="img" aria-label={feature.title}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-6 sm:py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            Built with ❤️ for job seekers everywhere
          </p>
          <p className="text-xs mt-2 text-slate-500">
            Templates inspired by MIT, Stanford, Harvard, and Oxford career centers
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
