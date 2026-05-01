import React from 'react';

const StatCard = ({ label, value, subValue, icon: Icon, color }) => {
  return (
    <div className="card animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{label}</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: color || 'var(--text)' }}>{value}</h3>
          {subValue && <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{subValue}</p>}
        </div>
        {Icon && (
          <div style={{ 
            padding: '0.75rem', 
            borderRadius: '10px', 
            background: 'var(--surface2)',
            color: color || 'var(--accent)'
          }}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
