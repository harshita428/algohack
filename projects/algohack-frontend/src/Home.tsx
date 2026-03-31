// src/Home.tsx
import Dashboard from './components/Dashboard'

const Home = () => {
  return (
    <div className="hero min-h-screen bg-teal-400">
      <div className="hero-content w-full p-6">
        <Dashboard />
      </div>
    </div>
  )
}

export default Home
