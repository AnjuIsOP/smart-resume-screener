import React, { useEffect, useState } from 'react';
import { getCandidates } from '../services/api';
import { Trophy, Search, Loader2 } from 'lucide-react';

export default function CandidateLeaderboard() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);
    } catch (err) {
      console.error('Failed to load leaderboard', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = candidates.filter((c) =>
    c.candidate_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.filename?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> Candidate Shortlist Leaderboard
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Ranked by highest LLM match score</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-slate-400 gap-2 text-sm">
          <Loader2 className="w-5 h-5 animate-spin" /> Fetching candidate rankings...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/30 rounded-2xl border border-slate-800 text-slate-500 text-sm">
          No candidates evaluated yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-4">Score</th>
                <th className="py-3.5 px-4">Justification</th>
                <th className="py-3.5 px-4">Evaluated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white">{item.candidate_name || 'Candidate'}</div>
                    <div className="text-[11px] text-slate-500">{item.filename}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-lg font-bold ${
                      item.match_score >= 8
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : item.match_score >= 5
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {item.match_score} / 10
                    </span>
                  </td>
                  <td className="py-4 px-4 max-w-xs truncate text-slate-400">{item.justification}</td>
                  <td className="py-4 px-4 text-slate-500 text-[11px]">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}