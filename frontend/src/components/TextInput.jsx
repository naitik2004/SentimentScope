import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const TextInput = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <div className="card" style={{ height: 'fit-content' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>Analyse Text</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste social media text here..."
          style={{
            width: '100%',
            height: '120px',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '1rem',
            color: 'var(--text)',
            fontSize: '0.9375rem',
            resize: 'none',
            marginBottom: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        />
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          style={{
            width: '100%',
            background: 'var(--accent)',
            color: 'white',
            padding: '0.75rem',
            borderRadius: '8px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            opacity: (!text.trim() || isLoading) ? 0.6 : 1,
            transition: 'transform 0.1s active'
          }}
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          {isLoading ? 'Analysing...' : 'Analyse Sentiment'}
        </button>
      </form>
    </div>
  );
};

export default TextInput;
