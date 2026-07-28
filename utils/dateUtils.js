const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export const normalizeDateInput = (value) => {
  if (!value) return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return null;

  const [, year, month, day] = match;

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  date.setHours(0, 0, 0, 0);

  const isValidDate =
    date.getFullYear() === Number(year) &&
    date.getMonth() === Number(month) - 1 &&
    date.getDate() === Number(day);

  return isValidDate ? date : null;
};

export const getStatusFromExpiry = (expiry) => {
  const expiryDate = normalizeDateInput(expiry);

  if (!expiryDate) return "Unknown";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return expiryDate < today ? "Expired" : "Active";
};

export const getDaysLeft = (expiry) => {
  const expiryDate = normalizeDateInput(expiry);

  if (!expiryDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Math.ceil((expiryDate - today) / ONE_DAY_MS);
};