'use client';
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { transformToTrendData } from '../utils/chartHelpers';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass" style={{ padding: '0.75rem', fontSize: '0.75rem' }}>
        <p style={{ color: 'var(--muted)', marginBottom: '0.25rem' }}>Analysis #{data.index}</p>
        {payload.map((entry, idx) => (
          <p key={idx} style={{ color: entry.color, fontWeight: '600' }}>
            {entry.name}: {(entry.value * 100).toFixed(1)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TrendChart = ({ history }) => {
  const data = transformToTrendData(history);

  return (
    <div className="card" style={{ height: '400px' }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Sentiment Trends</h3>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis 
              dataKey="index" 
              stroke="var(--muted)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="var(--muted)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(val) => `${val * 100}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="POSITIVE" 
              name="Positive"
              stroke="#10B981" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 4 }}
              animationDuration={300}
            />
            <Line 
              type="monotone" 
              dataKey="NEGATIVE" 
              name="Negative"
              stroke="#EF4444" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 4 }}
              animationDuration={300}
            />
            <Line 
              type="monotone" 
              dataKey="NEUTRAL" 
              name="Neutral"
              stroke="#F59E0B" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 4 }}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
