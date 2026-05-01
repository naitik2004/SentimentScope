import { useState, useEffect, useRef, useCallback } from 'react';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';

export const useWebSocket = (onMessage) => {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);
  const retryCount = useRef(0);

  const connect = useCallback(() => {
    try {
      ws.current = new WebSocket(`${WS_URL}/ws/sentiment`);

      ws.current.onopen = () => {
        console.log('WS Connected');
        setIsConnected(true);
        retryCount.current = 0;
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (onMessage) onMessage(data);
      };

      ws.current.onclose = () => {
        console.log('WS Disconnected');
        setIsConnected(false);
        // Exponential backoff
        const timeout = Math.min(1000 * Math.pow(2, retryCount.current), 30000);
        reconnectTimeout.current = setTimeout(() => {
          retryCount.current++;
          connect();
        }, timeout);
      };

      ws.current.onerror = (err) => {
        console.error('WS Error:', err);
        ws.current.close();
      };
    } catch (err) {
      console.error('Connection failed:', err);
    }
  }, [onMessage]);

  useEffect(() => {
    connect();
    return () => {
      if (ws.current) ws.current.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, [connect]);

  return { isConnected };
};
