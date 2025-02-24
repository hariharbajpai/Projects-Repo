import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2 } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
}

interface Team {
  id: string;
  name: string;
  logo: string;
  players: Player[];
}

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState<string | null>(null);
  const [newTeam, setNewTeam] = useState({ name: '', logo: '' });
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    role: '',
    battingStyle: '',
    bowlingStyle: ''
  });

  const addTeam = () => {
    if (newTeam.name) {
      const team: Team = {
        id: Date.now().toString(),
        name: newTeam.name,
        logo: newTeam.logo || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80',
        players: []
      };
      setTeams([...teams, team]);
      setNewTeam({ name: '', logo: '' });
      setShowAddTeam(false);
    }
  };

  const addPlayer = (teamId: string) => {
    if (newPlayer.name) {
      const player: Player = {
        id: Date.now().toString(),
        ...newPlayer
      };
      setTeams(teams.map(team => 
        team.id === teamId 
          ? { ...team, players: [...team.players, player] }
          : team
      ));
      setNewPlayer({ name: '', role: '', battingStyle: '', bowlingStyle: '' });
      setShowAddPlayer(null);
    }
  };

  const deleteTeam = (teamId: string) => {
    setTeams(teams.filter(team => team.id !== teamId));
  };

  const deletePlayer = (teamId: string, playerId: string) => {
    setTeams(teams.map(team => 
      team.id === teamId 
        ? { ...team, players: team.players.filter(player => player.id !== playerId) }
        : team
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
          <button
            onClick={() => setShowAddTeam(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700 transition"
          >
            <Plus className="w-5 h-5" /> Add Team
          </button>
        </div>

        {/* Add Team Modal */}
        {showAddTeam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Team</h2>
                <button onClick={() => setShowAddTeam(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                  <input
                    type="text"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="Enter team name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL (optional)</label>
                  <input
                    type="text"
                    value={newTeam.logo}
                    onChange={(e) => setNewTeam({ ...newTeam, logo: e.target.value })}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="Enter logo URL"
                  />
                </div>
                <button
                  onClick={addTeam}
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Add Team
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <div key={team.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <img src={team.logo} alt={team.name} className="w-16 h-16 rounded-full object-cover" />
                  <h3 className="text-xl font-semibold">{team.name}</h3>
                </div>
                <button
                  onClick={() => deleteTeam(team.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Players List */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Players ({team.players.length})</h4>
                  <button
                    onClick={() => setShowAddPlayer(team.id)}
                    className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Player
                  </button>
                </div>
                
                {team.players.map(player => (
                  <div key={player.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.role}</p>
                    </div>
                    <button
                      onClick={() => deletePlayer(team.id, player.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Add Player Modal */}
                {showAddPlayer === team.id && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Add New Player</h2>
                        <button onClick={() => setShowAddPlayer(null)} className="text-gray-500 hover:text-gray-700">
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Player Name</label>
                          <input
                            type="text"
                            value={newPlayer.name}
                            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                            className="w-full border rounded-md px-3 py-2"
                            placeholder="Enter player name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                          <select
                            value={newPlayer.role}
                            onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
                            className="w-full border rounded-md px-3 py-2"
                          >
                            <option value="">Select role</option>
                            <option value="Batsman">Batsman</option>
                            <option value="Bowler">Bowler</option>
                            <option value="All-rounder">All-rounder</option>
                            <option value="Wicket-keeper">Wicket-keeper</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Batting Style</label>
                          <select
                            value={newPlayer.battingStyle}
                            onChange={(e) => setNewPlayer({ ...newPlayer, battingStyle: e.target.value })}
                            className="w-full border rounded-md px-3 py-2"
                          >
                            <option value="">Select batting style</option>
                            <option value="Right-handed">Right-handed</option>
                            <option value="Left-handed">Left-handed</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bowling Style</label>
                          <select
                            value={newPlayer.bowlingStyle}
                            onChange={(e) => setNewPlayer({ ...newPlayer, bowlingStyle: e.target.value })}
                            className="w-full border rounded-md px-3 py-2"
                          >
                            <option value="">Select bowling style</option>
                            <option value="Right-arm fast">Right-arm fast</option>
                            <option value="Right-arm medium">Right-arm medium</option>
                            <option value="Right-arm off-spin">Right-arm off-spin</option>
                            <option value="Left-arm fast">Left-arm fast</option>
                            <option value="Left-arm medium">Left-arm medium</option>
                            <option value="Left-arm spin">Left-arm spin</option>
                          </select>
                        </div>
                        <button
                          onClick={() => addPlayer(team.id)}
                          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                          Add Player
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;