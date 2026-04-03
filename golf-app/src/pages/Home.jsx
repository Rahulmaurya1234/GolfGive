import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const steps = [
  { icon: '🏌️', title: 'Play Golf', desc: 'Submit your round scores after each game. Every round counts towards your entry.' },
  { icon: '🎯', title: 'Enter the Draw', desc: 'Your scores automatically enter you into monthly prize draws with real cash prizes.' },
  { icon: '❤️', title: 'Give Back', desc: 'A portion of every subscription goes directly to your chosen charity — every month.' },
];

const charities = [
  { name: 'Green Earth Foundation', icon: '🌱', impact: 'Rs.12,400 donated' },
  { name: 'Sudha Suman Foundation', icon: '⚽', impact: 'Rs.8,200 donated' },
  { name: 'Help Kids Foundation', icon: '🏥', impact: '$15,600 donated' },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800 text-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Monthly draws now live · Next draw in 14 days
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Play. Win.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              Give Back.
            </span>
          </h1>

          <p className="text-indigo-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            The world's first golf subscription that rewards your game and funds the causes you care about. Enter draws, win prizes, change lives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">
                  Go to Dashboard →
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-primary hover:bg-indigo-50 shadow-xl">
                    Start Playing Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="ghost" className="text-white border-white/30 border hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[['$240K+', 'Prize Pool'], ['18K+', 'Active Players'], ['$36K+', 'Donated']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display font-bold text-2xl text-white">{val}</div>
                <div className="text-indigo-300 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">How It Works</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Three simple steps to turn your golf game into prizes and positive impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {i + 1}
                </div>
                <div className="text-5xl mb-5 mt-2">{step.icon}</div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Monthly Prizes</span>
              <h2 className="font-display text-4xl font-bold text-gray-900 mt-2 mb-6">
                Real Prizes, Real Winners, Every Month
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Our prize pool grows with every subscription. The more players who join, the bigger the draws. First place, second place, third place — everyone has a shot.
              </p>
              <div className="space-y-4">
                {[['🥇 First Place', '$5,000 Cash Prize'], ['🥈 Second Place', '$2,000 Cash Prize'], ['🥉 Third Place', '$500 Gift Voucher']].map(([pos, prize]) => (
                  <div key={pos} className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <span className="font-semibold text-gray-700">{pos}</span>
                    <span className="text-primary font-bold">{prize}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">🏆</div>
                <h3 className="font-display font-bold text-2xl text-gray-900">Current Prize Pool</h3>
              </div>
              <div className="text-center">
                <div className="font-display font-extrabold text-5xl text-primary">$12,400</div>
                <p className="text-gray-400 text-sm mt-2">Growing with every new subscriber</p>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Pool Progress</span>
                  <span className="font-semibold text-primary">62%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full" style={{ width: '62%' }} />
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">Target: $20,000 by end of month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charity */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-success font-semibold text-sm uppercase tracking-widest">Social Impact</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 mt-2">Golf That Gives Back</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              15% of every subscription goes to your chosen charity. Choose the cause you care about most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {charities.map((c, i) => (
              <div key={i} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="font-display font-semibold text-gray-900 mb-2">{c.name}</h3>
                <p className="text-success font-bold text-sm">{c.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-indigo-600 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-4xl font-bold mb-4">Ready to Tee Off?</h2>
          <p className="text-indigo-200 mb-10 text-lg">
            Join thousands of golfers already winning prizes and making a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700">
                Create Free Account
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" className="border border-white text-white hover:bg-white hover:text-indigo-700">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl">⛳</span>
          <span className="font-display font-bold text-white">GolfGive</span>
        </div>
        <p>© {new Date().getFullYear()} GolfGive. All rights reserved. Play responsibly.</p>
      </footer>
    </div>
  );
}
