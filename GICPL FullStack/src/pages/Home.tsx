import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface LiveScore {
  score: number;
  wickets: number;
  overs: number;
  balls: number;
  batting_team: string;
  bowling_team: string;
  striker: {
    runs: number;
    balls: number;
  };
  non_striker: {
    runs: number;
    balls: number;
  };
}

const Home = () => {
  const [liveScore, setLiveScore] = useState<LiveScore | null>(null);

  useEffect(() => {
    // Initial fetch
    fetchLiveScore();

    // Subscribe to changes
    const channel = supabase
      .channel('live_scores_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'live_scores'
        },
        (payload) => {
          setLiveScore(payload.new as LiveScore);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLiveScore = async () => {
    const { data, error } = await supabase
      .from('live_scores')
      .select('*')
      .limit(1)
      .single();

    if (!error && data) {
      setLiveScore(data);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-cover bg-center" style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              Welcome to GICPL
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8"
            >
              Where Cricket Dreams Come Alive
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/schedule" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition">
                View Matches
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Calendar className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upcoming Matches</h3>
              <p className="text-gray-600 mb-4">Stay updated with the latest match schedules and fixtures.</p>
              <Link to="/schedule" className="text-indigo-600 font-medium flex items-center hover:text-indigo-700">
                View Schedule <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Trophy className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tournament Stats</h3>
              <p className="text-gray-600 mb-4">Explore detailed statistics and performance analytics.</p>
              <Link to="/teams" className="text-indigo-600 font-medium flex items-center hover:text-indigo-700">
                View Stats <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Users className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Profiles</h3>
              <p className="text-gray-600 mb-4">Get to know the teams and players competing in GICPL.</p>
              <Link to="/teams" className="text-indigo-600 font-medium flex items-center hover:text-indigo-700">
                View Teams <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Scores Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Live Scores</h2>
          {liveScore ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div className="text-center">
                  <p className="font-semibold text-xl">{liveScore.batting_team}</p>
                  <p className="text-3xl font-bold text-indigo-600">{liveScore.score}/{liveScore.wickets}</p>
                  <p className="text-sm text-gray-500">
                    CRR: {((liveScore.score / (liveScore.overs + liveScore.balls/6)) || 0).toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium">Overs: {liveScore.overs}.{liveScore.balls}</p>
                  <p className="font-medium text-red-600 animate-pulse">LIVE</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xl">{liveScore.bowling_team}</p>
                  <div className="text-sm text-gray-600">
                    <p>To Bat</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <div>
                  Striker: {liveScore.striker.runs} ({liveScore.striker.balls})
                </div>
                <div>
                  Non-striker: {liveScore.non_striker.runs} ({liveScore.non_striker.balls})
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">No live matches at the moment</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;