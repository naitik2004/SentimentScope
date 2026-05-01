'use client';
import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend 
} from 'recharts';
import { transformToDistributionData } from '../utils/chartHelpers';

const DonutChart = ({ history }) => {
  const data = transformToDistributionData(history);
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="card" style={{ height: '400px', position: 'relative' }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Class Distribution</h3>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px' }}
              itemStyle={{ fontSize: '0.75rem' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
        {total > 0 && (
          <div style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Total</p>
            <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>{total}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonutChart;
