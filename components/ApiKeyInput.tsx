import React, { useState } from 'react';
import { Key, ShieldCheck, ArrowRight } from 'lucide-react';

interface ApiKeyInputProps {
  onSave: (key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSave }) => {
  const [inputKey, setInputKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      onSave(inputKey.trim());
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-blue-600 p-6 text-center">
        <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
          <Key className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">ComplaintAI Access</h2>
        <p className="text-blue-100 text-sm">
          Enter your Gemini API Key to activate the legal assistant.
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-slate-700 mb-1">
              Google Gemini API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-800 placeholder-slate-400"
              placeholder="AIzaSy..."
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Start Drafting <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
          <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            Your API key is used locally in your browser to communicate directly with Google's servers. It is not stored on any third-party backend.
          </p>
        </div>
      </div>
    </div>
  );
};
