import { useState, useMemo, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import { analyseSentiment } from '../services/api';

export const useSentiment = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMessage = useCallback((message) => {
    if (message.type === 'history') {
      setHistory(message.payload);
    } else if (message.type === 'result') {
      setHistory(prev => [...prev.slice(-49), message.payload]);
    }
  }, []);

  const { isConnected } = useWebSocket(handleMessage);

  const stats = useMemo(() => {
    if (history.length === 0) return {
      total: 0,
      dominant: 'N/A',
      avgConfidence: 0,
      breakdown: { POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 }
    };

    const counts = { POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 };
    let totalConfidence = 0;

    history.forEach(item => {
      counts[item.prediction]++;
      totalConfidence += item.confidence;
    });

    const dominant = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

    return {
      total: history.length,
      dominant,
      avgConfidence: totalConfidence / history.length,
      breakdown: counts
    };
  }, [history]);

  const submit = async (text) => {
    setIsLoading(true);
    setError(null);
    try {
      await analyseSentiment(text);
      // History will be updated via WS broadcast
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => setHistory([]);

  return { history, stats, submit, isLoading, error, isConnected, clearHistory };
};
