import React from 'react';
import { Award, BrainCircuit, User, BookOpen } from 'lucide-react';

export default function EvaluationResult({ evaluation }) {
  if (!evaluation) return null;

  const score = evaluation.match_score || 0;

  return (
    <div className="space-y-6 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <User className="w-6 h-6 text-sky-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{evaluation.candidate_name || 'Candidate Profile'}</h2>
            <p className="text-xs text-slate-400">{evaluation.filename}</p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-1">Match Rating</span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-white">{score}</span>
            <span className="text-slate-500 font-semibold">/ 10</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
          <BrainCircuit className="w-4 h-4" />
          LLM Semantic Evaluation Justification
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{evaluation.justification}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-medium text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" /> Extracted Skills
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {evaluation.skills?.length > 0 ? (
              evaluation.skills.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-700/50 text-slate-200 text-xs rounded-md border border-slate-600/50">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-slate-500 text-xs">No specific skills parsed</span>
            )}
          </div>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Education Summary
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">{evaluation.education || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}