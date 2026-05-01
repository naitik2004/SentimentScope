export const transformToTrendData = (history) => {
  return history.map((item, index) => {
    const dataPoint = { index: index + 1 };
    item.all_scores.forEach(s => {
      dataPoint[s.label] = s.score;
    });
    return dataPoint;
  });
};

export const transformToDistributionData = (history) => {
  const counts = { POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 };
  history.forEach(item => {
    counts[item.prediction]++;
  });
  
  return [
    { name: 'Positive', value: counts.POSITIVE, color: '#10B981' },
    { name: 'Negative', value: counts.NEGATIVE, color: '#EF4444' },
    { name: 'Neutral', value: counts.NEUTRAL, color: '#F59E0B' }
  ].filter(item => item.value > 0);
};
