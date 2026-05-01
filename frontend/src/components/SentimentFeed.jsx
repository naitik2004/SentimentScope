import React from 'react';
import SentimentBadge from './SentimentBadge';
import { formatTimestamp, formatPercentage } from '../utils/formatters';

const SentimentFeed = ({ history }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '400px' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>Live Feed</h3>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        paddingRight: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {history.length === 0 ? (
          <div style={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--muted)',
            fontSize: '0.875rem'
          }}>
            No analyses yet. Start by typing something!
          </div>
        ) : (
          [...history].reverse().map((item) => (
            <div 
              key={item.id} 
              className="animate-fade-in"
              style={{ 
                padding: '0.75rem', 
                background: 'var(--surface2)', 
                borderRadius: '8px',
                borderLeft: `3px solid var(--border)`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <SentimentBadge sentiment={item.prediction} />
                <span style={{ color: 'var(--muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  {formatTimestamp(item.timestamp)}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text)', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                "{item.text}"
              </p>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                Confidence: {formatPercentage(item.confidence)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SentimentFeed;
