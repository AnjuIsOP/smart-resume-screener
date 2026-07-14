import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ResumeUploader from './components/ResumeUploader';
import EvaluationResult from './components/EvaluationResult';
import CandidateLeaderboard from './components/CandidateLeaderboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('screen');
  const [currentEvaluation, setCurrentEvaluation] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'screen' ? (
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-1">Evaluate Resume</h2>
              <p className="text-xs text-slate-400 mb-6">Upload candidate PDF and supply target job description</p>
              <ResumeUploader onEvaluationSuccess={(data) => setCurrentEvaluation(data)} />
            </div>

            <div>
              {currentEvaluation ? (
                <EvaluationResult evaluation={currentEvaluation} />
              ) : (
                <div className="h-full min-h-[400px] border border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-900/30">
                  <p className="text-sm">Submit job description and candidate resume to display LLM evaluation here.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <CandidateLeaderboard />
        )}
      </main>
    </div>
  );
}