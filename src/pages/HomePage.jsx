import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, GraduationCap, ArrowRight, Sparkles, Zap, Layout, Star } from 'lucide-react';

/**
 * Home Page - Template Selection
 * Displays available resume templates with preview images and descriptions
 * Fully responsive for all devices with modern design
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
    },
    {
      id: 'creative',
      name: 'Creative Professional',
      description: 'Bold and vibrant design for creative professionals. Perfect for designers, marketers, and content creators.',
      features: ['Creative', 'Bold Design', 'Visual Appeal', 'Standout Style'],
      path: '/creative',
      color: 'from-purple-600 to-pink-600',
      accent: 'bg-purple-500',
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      id: 'minimalist',
      name: 'Minimalist Modern',
      description: 'Clean and elegant minimalist design. Focuses on content with subtle styling for a professional look.',
      features: ['Minimalist', 'Elegant', 'Clean Design', 'Professional'],
      path: '/minimalist',
      color: 'from-emerald-600 to-teal-700',
      accent: 'bg-emerald-500',
      icon: <Layout className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-blue-500/25">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Resume Builder
                </h1>
                <p className="text-slate-400 text-sm hidden sm:block">
                  Professional resumes in minutes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs sm:text-sm rounded-full border border-emerald-500/30">
                <Zap className="w-3.5 h-3.5" />
                5 Templates Available
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 text-sm rounded-full border border-blue-500/20 mb-6">
            <Star className="w-4 h-4" />
            Trusted by thousands of job seekers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Build Your Perfect Resume
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Land Your Dream Job
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Choose from professionally designed templates inspired by top universities and tech companies.
            Export to PDF, DOCX, Markdown, or LaTeX.
          </p>
        </div>
      </section>

      {/* Template Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {templates.map((template, index) => (
              <Link
                key={template.id}
                to={template.path}
                className={`group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                aria-label={`Use ${template.name} template`}
              >
                {/* Template Preview Header */}
                <div className={`bg-gradient-to-r ${template.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 ${template.accent} rounded-xl shadow-lg`}>
                        {template.icon}
                      </div>
                      <ArrowRight 
                        className="w-6 h-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" 
                        aria-hidden="true" 
                      />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">{template.name}</h3>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-5 sm:p-6">
                  <p className="text-slate-400 text-sm sm:text-base mb-4 leading-relaxed">
                    {template.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="inline-block px-2.5 py-1 bg-slate-700/50 text-slate-300 text-xs sm:text-sm rounded-lg border border-slate-600/50"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-5 pt-4 border-t border-slate-700/50">
                    <span className="inline-flex items-center gap-2 text-blue-400 font-medium text-sm sm:text-base group-hover:text-blue-300 transition-colors">
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

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 sm:py-10 px-4">
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
