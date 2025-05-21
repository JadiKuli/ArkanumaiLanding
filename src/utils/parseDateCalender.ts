const parseDate = (value: string) => {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // bulan dari 0–11
  const day = String(date.getDate()).padStart(2, "0");

  const formatted = `${year}-${month}-${day}`; // "2025-05-07"

  return formatted;
};

export { parseDate };
