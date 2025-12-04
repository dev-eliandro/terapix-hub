import { mockResidents } from '@/data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const statusColors = {
  active: 'hsl(158, 64%, 42%)',
  discharged: 'hsl(199, 89%, 48%)',
  evaded: 'hsl(38, 92%, 50%)',
  terminated: 'hsl(0, 72%, 51%)'
};

const statusLabels = {
  active: 'Ativos',
  discharged: 'Alta Terapêutica',
  evaded: 'Evasão',
  terminated: 'Desligados'
};

export function ResidentStatusChart() {
  const statusCounts = mockResidents.reduce((acc, resident) => {
    acc[resident.status] = (acc[resident.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: statusLabels[status as keyof typeof statusLabels],
    value: count,
    color: statusColors[status as keyof typeof statusColors]
  }));

  return (
    <div className="card-elevated p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Status dos Acolhidos
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
                boxShadow: 'var(--shadow-md)'
              }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
