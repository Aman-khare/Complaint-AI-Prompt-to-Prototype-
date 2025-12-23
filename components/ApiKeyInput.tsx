import React, { useState } from 'react';
import { Key, ShieldCheck, ArrowRight, Cpu } from 'lucide-react';

interface ApiKeyInputProps {
  onSave: (key: string, model: string) => void;
  defaultModel?: string;
}

const AVAILABLE_MODELS = [
  { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro (Preview) - Best for Reasoning' },
  { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash (Preview) - Fast & Efficient' },
  { id: 'gemini-flash-latest', name: 'Gemini 2.5 Flash' },
  { id: 'gemini-flash-lite-latest', name: 'Gemini 2.5 Flash Lite' },
];

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSave, defaultModel = 'gemini-3-pro-preview' }) => {
  const [inputKey, setInputKey] = useState('');
  const [selectedModel, setSelectedModel] = useState(defaultModel);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      onSave(inputKey.trim(), selectedModel);
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
          Configure your AI assistant settings.
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div>
             <label htmlFor="modelSelect" className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Cpu className="w-3 h-3" /> AI Model
            </label>
            <div className="relative">
              <select
                id="modelSelect"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-800 bg-white appearance-none cursor-pointer"
              >
                {AVAILABLE_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
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
