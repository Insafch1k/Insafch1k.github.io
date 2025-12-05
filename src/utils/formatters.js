export function formatCurrency(amount) {
  return `${amount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽`;
}

export function formatAmountWithSign(amount) {
  const sign = amount >= 0 ? '+' : '';
  return `${sign}${formatCurrency(Math.abs(amount))}`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function formatShortDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('ru', { month: 'short' });
  return `${day} ${month}`;
}

export function formatPercent(value) {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value}%`;
}

export function calculatePercent(part, total) {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

