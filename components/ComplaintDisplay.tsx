import React from 'react';
import { Download, Building2, CheckCircle2, FileText, ArrowLeft } from 'lucide-react';
import { ActionResponse } from '../types';
import { downloadComplaintPDF } from '../utils/pdfGenerator';
import { downloadComplaintDocx } from '../utils/docxGenerator';

interface ComplaintDisplayProps {
  data: ActionResponse;
  onReset: () => void;
}

export const ComplaintDisplay: React.FC<ComplaintDisplayProps> = ({ data, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <button 
          onClick={onReset}
          className="flex items-center text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Draft Another
        </button>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => downloadComplaintDocx(data)}
            className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 font-medium"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            Download Word
          </button>
          
          <button
            onClick={() => downloadComplaintPDF(data)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-95 font-medium"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column: Authority & Classification */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Target Authority</h3>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">{data.recommendedAuthority}</p>
                <span className="inline-block mt-2 text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                  {data.classification}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Action Plan</h3>
            <ul className="space-y-4">
              {data.actionSteps.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="leading-snug">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: The Letter */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700">
                <FileText className="w-5 h-5" />
                <span className="font-semibold text-sm">Drafted Complaint</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/20 border border-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400"></div>
              </div>
            </div>
            <div className="p-8 md:p-10">
              <div className="prose prose-slate max-w-none font-serif leading-relaxed text-slate-800 whitespace-pre-wrap">
                {data.formalComplaint}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
