import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BattingStats {
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
}

interface BowlingStats {
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
}

const LiveScoring = () => {
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const [lastSixBalls, setLastSixBalls] = useState<string[]>([]);
  const [scoreHistory, setScoreHistory] = useState<{ action: string; value: number }[]>([]);
  const [battingTeam, setBattingTeam] = useState('Team A');
  const [bowlingTeam, setBowlingTeam] = useState('Team B');
  const [striker, setStriker] = useState<BattingStats>({ runs: 0, balls: 0, fours: 0, sixes: 0 });
  const [nonStriker, setNonStriker] = useState<BattingStats>({ runs: 0, balls: 0, fours: 0, sixes: 0 });
  const [currentBowler, setCurrentBowler] = useState<BowlingStats>({ overs: 0, maidens: 0, runs: 0, wickets: 0 });
  const [matchId, setMatchId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initializeMatch();
  }, []);

  const initializeMatch = async () => {
    setIsLoading(true);
    const { data: matches, error } = await supabase
      .from('live_scores')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error fetching match:', error);
      setIsLoading(false);
      return;
    }

    if (matches && matches.length > 0) {
      const match = matches[0];
      setMatchId(match.id);
      setScore(match.score);
      setWickets(match.wickets);
      setOvers(match.overs);
      setBalls(match.balls);
      setLastSixBalls(match.last_six_balls);
      setBattingTeam(match.batting_team);
      setBowlingTeam(match.bowling_team);
      setStriker(match.striker);
      setNonStriker(match.non_striker);
      setCurrentBowler(match.current_bowler);
    } else {
      const { data: newMatch, error: createError } = await supabase
        .from('live_scores')
        .insert([{
          batting_team: battingTeam,
          bowling_team: bowlingTeam,
          score,
          wickets,
          overs,
          balls,
          last_six_balls: lastSixBalls,
          striker,
          non_striker: nonStriker,
          current_bowler: currentBowler,
        }])
        .select()
        .single();

      if (createError) {
        console.error('Error creating match:', createError);
        setIsLoading(false);
        return;
      }

      if (newMatch) {
        setMatchId(newMatch.id);
      }
    }
    setIsLoading(false);
  };

  const updateMatch = async () => {
    if (!matchId) return;

    setIsLoading(true);
    const { error } = await supabase
      .from('live_scores')
      .update({
        score,
        wickets,
        overs,
        balls,
        last_six_balls: lastSixBalls,
        batting_team: battingTeam,
        bowling_team: bowlingTeam,
        striker,
        non_striker: nonStriker,
        current_bowler: currentBowler,
        updated_at: new Date().toISOString(),
      })
      .eq('id', matchId);

    setIsLoading(false);
    if (error) {
      console.error('Error updating match:', error);
      alert('Failed to update match. Please try again.');
    }
  };

  const addRuns = async (runs: number) => {
    setScore(prev => prev + runs);
    setStriker(prev => ({ ...prev, runs: prev.runs + runs, balls: prev.balls + 1 }));
    if (runs === 4) setStriker(prev => ({ ...prev, fours: prev.fours + 1 }));
    if (runs === 6) setStriker(prev => ({ ...prev, sixes: prev.sixes + 1 }));
    updateBalls(runs.toString());
    setScoreHistory(prev => [...prev, { action: 'runs', value: runs }]);
    if (runs % 2 === 1) rotateStrike();
    await updateMatch();
  };

  const addExtra = async (type: string) => {
    setScore(prev => prev + 1);
    updateBalls(type);
    setScoreHistory(prev => [...prev, { action: 'extra', value: 1 }]);
    await updateMatch();
  };

  const addWicket = async () => {
    if (wickets < 10) {
      setWickets(prev => prev + 1);
      setStriker({ runs: 0, balls: 0, fours: 0, sixes: 0 });
      updateBalls('W');
      setScoreHistory(prev => [...prev, { action: 'wicket', value: 1 }]);
      await updateMatch();
    }
  };

  const updateBalls = (value: string) => {
    setLastSixBalls(prev => [...prev.slice(-5), value]);
    if (value !== 'WD' && value !== 'NB') {
      setBalls(prev => {
        const newBalls = prev + 1;
        if (newBalls === 6) {
          setOvers(prev => prev + 1);
          setBalls(0);
          rotateStrike();
          return 0;
        }
        return newBalls;
      });
    }
  };

  const rotateStrike = () => {
    const temp = striker;
    setStriker(nonStriker);
    setNonStriker(temp);
  };

  const undoLastAction = async () => {
    if (scoreHistory.length > 0) {
      const lastAction = scoreHistory[scoreHistory.length - 1];

      if (lastAction.action === 'runs') {
        setScore(prev => prev - lastAction.value);
        setStriker(prev => ({
          ...prev,
          runs: prev.runs - lastAction.value,
          balls: prev.balls - 1,
          fours: lastAction.value === 4 ? prev.fours - 1 : prev.fours,
          sixes: lastAction.value === 6 ? prev.sixes - 1 : prev.sixes,
        }));
      } else if (lastAction.action === 'extra') {
        setScore(prev => prev - 1);
      } else if (lastAction.action === 'wicket') {
        setWickets(prev => prev - 1);
      }

      const lastBall = lastSixBalls[lastSixBalls.length - 1];
      if (lastBall !== 'WD' && lastBall !== 'NB') {
        setBalls(prev => (prev === 0 ? 5 : prev - 1));
      }

      setLastSixBalls(prev => prev.slice(0, -1));
      setScoreHistory(prev => prev.slice(0, -1));
      await updateMatch();
    }
  };

  const resetMatch = async () => {
    setScore(0);
    setWickets(0);
    setOvers(0);
    setBalls(0);
    setLastSixBalls([]);
    setScoreHistory([]);
    setStriker({ runs: 0, balls: 0, fours: 0, sixes: 0 });
    setNonStriker({ runs: 0, balls: 0, fours: 0, sixes: 0 });
    setCurrentBowler({ overs: 0, maidens: 0, runs: 0, wickets: 0 });
    await updateMatch();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Main Score Display */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Scoring</h1>
            <div className="text-6xl font-bold text-indigo-600 mb-2">
              {score}/{wickets}
            </div>
            <div className="text-xl text-gray-600">
              Overs: {overs}.{balls}
            </div>
          </div>

          {/* Teams */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">Batting Team</label>
              <input
                type="text"
                value={battingTeam}
                onChange={(e) => setBattingTeam(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bowling Team</label>
              <input
                type="text"
                value={bowlingTeam}
                onChange={(e) => setBowlingTeam(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Last Six Balls */}
          <div className="flex justify-center gap-2 mb-8">
            {lastSixBalls.map((ball, index) => (
              <div key={index} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                {ball}
              </div>
            ))}
          </div>

          {/* Batting Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Striker</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="font-bold">{striker.runs}</div>
                  <div className="text-sm text-gray-600">Runs</div>
                </div>
                <div>
                  <div className="font-bold">{striker.balls}</div>
                  <div className="text-sm text-gray-600">Balls</div>
                </div>
                <div>
                  <div className="font-bold">{striker.fours}</div>
                  <div className="text-sm text-gray-600">4s</div>
                </div>
                <div>
                  <div className="font-bold">{striker.sixes}</div>
                  <div className="text-sm text-gray-600">6s</div>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Non-Striker</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="font-bold">{nonStriker.runs}</div>
                  <div className="text-sm text-gray-600">Runs</div>
                </div>
                <div>
                  <div className="font-bold">{nonStriker.balls}</div>
                  <div className="text-sm text-gray-600">Balls</div>
                </div>
                <div>
                  <div className="font-bold">{nonStriker.fours}</div>
                  <div className="text-sm text-gray-600">4s</div>
                </div>
                <div>
                  <div className="font-bold">{nonStriker.sixes}</div>
                  <div className="text-sm text-gray-600">6s</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scoring Controls */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[0, 1, 2, 3, 4, 6].map(runs => (
              <button
                key={runs}
                onClick={() => addRuns(runs)}
                className="bg-indigo-600 text-white rounded-lg py-3 px-6 font-semibold hover:bg-indigo-700 transition"
              >
                {runs} {runs === 1 ? 'Run' : 'Runs'}
              </button>
            ))}
          </div>

          {/* Extra Runs and Wicket Controls */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => addExtra('WD')}
              className="bg-gray-200 text-gray-800 rounded-lg py-3 px-6 font-semibold hover:bg-gray-300 transition"
            >
              Wide
            </button>
            <button
              onClick={() => addExtra('NB')}
              className="bg-gray-200 text-gray-800 rounded-lg py-3 px-6 font-semibold hover:bg-gray-300 transition"
            >
              No Ball
            </button>
            <button
              onClick={addWicket}
              className="bg-red-600 text-white rounded-lg py-3 px-6 font-semibold hover:bg-red-700 transition"
            >
              Wicket
            </button>
            <button
              onClick={rotateStrike}
              className="bg-gray-200 text-gray-800 rounded-lg py-3 px-6 font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Rotate Strike
            </button>
          </div>

          {/* Undo Button */}
          <div className="mt-4">
            <button
              onClick={undoLastAction}
              disabled={scoreHistory.length === 0}
              className={`w-full bg-yellow-600 text-white rounded-lg py-3 px-6 font-semibold transition flex items-center justify-center gap-2
                ${scoreHistory.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-700'}`}
            >
              <RotateCcw className="w-4 h-4" /> Undo Last Action
            </button>
          </div>

          {/* Reset Button */}
          <div className="mt-4">
            <button
              onClick={resetMatch}
              className="w-full bg-red-600 text-white rounded-lg py-3 px-6 font-semibold hover:bg-red-700 transition"
            >
              Reset Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScoring;