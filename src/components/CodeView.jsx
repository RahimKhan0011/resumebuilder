import React from 'react';
import { Copy, Check } from 'lucide-react';

const CodeView = ({ content, language, copied, onCopy }) => {
  return (
    <div className="bg-slate-900 rounded-lg shadow-lg overflow-hidden flex flex-col h-full max-h-[800px] fade-in">
      <div className="bg-slate-800 p-3 flex justify-between items-center border-b border-slate-700">
        <span className="text-slate-300 font-mono text-sm uppercase">{language} Source</span>
        <button
          onClick={() => onCopy(content)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all duration-300 ${
            copied ? 'bg-green-600 text-white scale-105' : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105'
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
};

export default CodeView;
