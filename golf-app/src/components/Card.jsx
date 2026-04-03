export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-4 ${hover ? 'hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatCard({ icon, label, value, color = 'primary', trend }) {
  const colors = {
    primary: 'bg-indigo-50 text-primary',
    secondary: 'bg-cyan-50 text-secondary',
    success: 'bg-green-50 text-success',
    danger: 'bg-red-50 text-danger',
  };
  return (
    <Card className="animate-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold font-display text-gray-900">{value}</p>
          {trend && <p className="text-xs text-success mt-1 font-medium">{trend}</p>}
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
    </Card>
  );
}
