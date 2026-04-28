import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Mock user — replace with real API calls when backend is ready
const MOCK_USER = {
  id: '1',
  name: 'Arjun Kumar',
  email: 'arjun@example.com',
  xp: 4820,
  level: 12,
  levelName: 'Explorer',
  streak: 14,
  rank: 47,
  accuracy: 78,
  totalSolved: 342,
  badges: [
    { id: 1, name: 'Speed Demon', icon: '⚡', desc: 'Solved 10 in 5 min', earned: true },
    { id: 2, name: 'Streak Master', icon: '🔥', desc: '14-day streak!',    earned: true },
    { id: 3, name: 'Logic Pro',    icon: '🧠', desc: '90% reasoning acc.', earned: true },
    { id: 4, name: 'Top 10',       icon: '🏆', desc: 'Reach rank #10',     earned: false },
  ],
  categoryStats: {
    aptitude: { level: 9,  solved: 124, accuracy: 72 },
    reasoning: { level: 11, solved: 98,  accuracy: 85 },
    verbal:    { level: 7,  solved: 120, accuracy: 55 },
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 800))
    setUser(MOCK_USER)
    setLoading(false)
    return true
  }

  const register = async (name, email, password) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setUser({ ...MOCK_USER, name })
    setLoading(false)
    return true
  }

  const logout = () => setUser(null)

  const addXP = (amount) => {
    setUser(prev => prev ? { ...prev, xp: prev.xp + amount } : prev)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, addXP }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
