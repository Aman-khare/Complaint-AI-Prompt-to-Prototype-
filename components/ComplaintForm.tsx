import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ComplaintFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export const ComplaintForm: React.FC<ComplaintFormProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSubmit(text);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Describe Your Issue</h1>
        <p className="text-slate-500">
          Tell us what happened in plain language. We'll handle the legal phrasing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white rounded-xl shadow-lg border border-slate-100 p-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
            className="w-full h-48 p-4 text-lg text-slate-800 bg-transparent border-none outline-none resize-none placeholder-slate-300"
            placeholder="Example: My landlord hasn't fixed the leaking roof for 3 weeks despite multiple emails. It's causing mold in the bedroom..."
          />
          <div className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded-lg mt-2 border-t border-slate-100">
            <span className="text-xs font-medium text-slate-400">
              {text.length} characters
            </span>
            <button
              type="submit"
              disabled={!text.trim() || isLoading}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-all transform active:scale-95 ${
                !text.trim() || isLoading
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Generate Complaint
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
