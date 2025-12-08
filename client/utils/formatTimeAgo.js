export const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now - date) / 1000;
  if (diff < 60) return `${Math.floor(diff)} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 172800) return "Yesterday";
  return date.toLocaleDateString();
};
