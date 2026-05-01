import React from 'react';
import { SENTIMENT_CONFIG } from '../constants/sentimentConfig';

const SentimentBadge = ({ sentiment }) => {
  const config = SENTIMENT_CONFIG[sentiment] || SENTIMENT_CONFIG.NEUTRAL;
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.025em',
      backgroundColor: config.bg,
      color: config.color,
      border: `1px solid ${config.border}`
    }}>
      {config.label}
    </span>
  );
};

export default SentimentBadge;
