import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { evaluateResume } from '../services/api';

export default function ResumeUploader({ onEvaluationSuccess }) {
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please upload a valid PDF document.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) {
      setError('Please provide a job description.');
      return;
    }
    if (!file) {
      setError('Please attach a candidate resume (PDF).');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await evaluateResume(jobDescription, file);
      onEvaluationSuccess(result);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze candidate. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Target Job Description <span className="text-sky-400">*</span>
        </label>
        <textarea
          rows={5}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste key responsibilities, required technical skills, and educational requirements here..."
          className="w-full bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Candidate Resume (PDF) <span className="text-sky-400">*</span>
        </label>
        <div className="relative border-2 border-dashed border-slate-700 hover:border-sky-500/50 rounded-2xl p-6 text-center bg-slate-800/30 hover:bg-slate-800/60 transition group cursor-pointer">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-slate-800 rounded-full group-hover:scale-110 transition">
              <Upload className="w-6 h-6 text-sky-400" />
            </div>
            {file ? (
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>{file.name}</span>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-slate-300">Click to upload or drag & drop</p>
                <p className="text-xs text-slate-500 mt-1">PDF files up to 10MB</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-sky-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing Resume with LLM...
          </>
        ) : (
          'Evaluate Candidate Fit'
        )}
      </button>
    </form>
  );
}