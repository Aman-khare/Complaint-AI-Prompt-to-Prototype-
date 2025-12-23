import React, { useState, useEffect } from 'react';
import { ApiKeyInput } from './components/ApiKeyInput';
import { ComplaintForm } from './components/ComplaintForm';
import { ComplaintDisplay } from './components/ComplaintDisplay';
import { generateComplaint } from './services/gemini';
import { ComplaintState } from './types';
import { Scale, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [complaintState, setComplaintState] = useState<ComplaintState>({
    status: 'idle',
    data: null,
    error: null,
  });

  useEffect(() => {
    // Check local storage for existing key on mount
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const handleLogout = () => {
    setApiKey(null);
    localStorage.removeItem('gemini_api_key');
    setComplaintState({ status: 'idle', data: null, error: null });
  };

  const handleSubmitComplaint = async (text: string) => {
    if (!apiKey) return;

    setComplaintState({ status: 'loading', data: null, error: null });

    try {
      const result = await generateComplaint(apiKey, text);
      setComplaintState({ status: 'success', data: result, error: null });
    } catch (err) {
      setComplaintState({
        status: 'error',
        data: null,
        error: err instanceof Error ? err.message : 'An unexpected error occurred',
      });
    }
  };

  const handleReset = () => {
    setComplaintState({ status: 'idle', data: null, error: null });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-100">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">ComplaintAI</span>
          </div>
          {apiKey && (
             <button 
              onClick={handleLogout}
              className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors"
            >
              Clear API Key
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        {!apiKey ? (
          <ApiKeyInput onSave={handleSaveApiKey} />
        ) : (
          <div className="w-full max-w-6xl mx-auto">
            
            {complaintState.status === 'idle' || complaintState.status === 'loading' ? (
              <div className="animate-fade-in-up">
                <ComplaintForm 
                  onSubmit={handleSubmitComplaint} 
                  isLoading={complaintState.status === 'loading'} 
                />
              </div>
            ) : null}

            {complaintState.status === 'error' && (
              <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Generation Failed</h3>
                  <p className="text-sm text-red-700 mt-1">{complaintState.error}</p>
                  <button 
                    onClick={handleReset} 
                    className="mt-3 text-xs font-medium text-red-600 hover:text-red-800 underline"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {complaintState.status === 'success' && complaintState.data && (
              <ComplaintDisplay data={complaintState.data} onReset={handleReset} />
            )}

          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} ComplaintAI MVP. Powered by Gemini 3 Pro.</p>
      </footer>
    </div>
  );
};

export default App;
