const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export const analyseSentiment = async (text) => {
  const response = await fetch(`${API_URL}/v1/analyse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Analysis failed');
  }

  return response.json();
};
