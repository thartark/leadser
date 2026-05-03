export const formatCurrency = (amount) => `$${amount.toLocaleString()}`;
export const formatDate = (date) => new Date(date).toLocaleDateString();
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
