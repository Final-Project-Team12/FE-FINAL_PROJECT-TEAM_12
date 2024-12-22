export const getStatusColor = (status) => {
  const statusMap = {
    SUCCESS: 'bg-green-500',
    PENDING: 'bg-yellow-500',
    CANCELLED: 'bg-red-500',
    EXPIRED: 'bg-red-500',
    FAILED: 'bg-gray-500',
  };

  return statusMap[status.toUpperCase()] || 'bg-gray-200';
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatCurrency = (amount) => {
  return `IDR ${amount.toLocaleString('id-ID')}`;
};
