'use client';
import React from 'react';
import { useSentiment } from '../hooks/useSentiment';
import StatCard from './StatCard';
import TrendChart from './TrendChart';
import DonutChart from './DonutChart';
import TextInput from './TextInput';
import SentimentFeed from './SentimentFeed';
import { BarChart3, Activity, Target, Zap } from 'lucide-react';
import { formatPercentage } from '../utils/formatters';
import { SENTIMENT_CONFIG } from '../constants/sentimentConfig';

const Dashboard = () => {
  const { 
    history, 
    stats, 
    submit, 
    isLoading, 
    isConnected,
    error 
  } = useSentiment();

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text)' }}>
            SentimentScope
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Real-Time Social Sentiment Dashboard
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: isConnected ? 'var(--positive)' : 'var(--negative)',
            boxShadow: isConnected ? '0 0 8px var(--positive)' : 'none'
          }} />
          <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            {isConnected ? 'LIVE' : 'DISCONNECTED'}
          </span>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.2)', 
          borderRadius: '8px',
          color: 'var(--negative)',
          fontSize: '0.875rem'
        }}>
          Error: {error}
        </div>
      )}

      {/* Stats Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem' 
      }}>
        <StatCard 
          label="Total Analysed" 
          value={stats.total} 
          icon={Activity} 
        />
        <StatCard 
          label="Dominant Sentiment" 
          value={stats.dominant} 
          icon={Target}
          color={SENTIMENT_CONFIG[stats.dominant]?.color}
        />
        <StatCard 
          label="Avg Confidence" 
          value={formatPercentage(stats.avgConfidence)} 
          icon={Zap}
        />
      </div>

      {/* Charts Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '1.5rem',
        '@media (max-width: 900px)': {
          gridTemplateColumns: '1fr'
        }
      }}>
        <TrendChart history={history} />
        <DonutChart history={history} />
      </div>

      {/* Input & Feed Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1.5fr', 
        gap: '1.5rem' 
      }}>
        <TextInput onSubmit={submit} isLoading={isLoading} />
        <SentimentFeed history={history} />
      </div>

      {/* Footer */}
      <footer style={{ 
        marginTop: '2rem', 
        textAlign: 'center', 
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--border)',
        color: 'var(--muted)',
        fontSize: '0.75rem'
      }}>
        <p>© 2026 SentimentScope • Fine-tuned DistilBERT • FastAPI WebSocket</p>
      </footer>

      <style jsx>{`
        @media (max-width: 900px) {
          div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
