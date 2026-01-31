import React from 'react';
import { Copy, Check } from 'lucide-react';

const CodeView = ({ content, language, copied, onCopy }) => {
  return (
    <div className="bg-slate-900 rounded-lg shadow-lg overflow-hidden flex flex-col h-full max-h-[800px] w-full fade-in">
      <div className="bg-slate-800 p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-700">
        <span className="text-slate-300 font-mono text-sm uppercase">{language} Source</span>
        <button
          onClick={() => onCopy(content)}
          className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all duration-300 whitespace-nowrap ${
            copied ? 'bg-green-600 text-white scale-105' : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105'
          }`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Code'}</span>
          <span className="sm:hidden">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <textarea
        readOnly
        className="flex-1 bg-slate-900 text-slate-300 font-mono p-4 text-xs sm:text-sm resize-none focus:outline-none w-full overflow-auto"
        value={content}
      />
    </div>
  );
};

export default CodeView;
