export const formatDate = (date: Date): string =>
  date.toLocaleDateString("fi-FI");

export const formatCurrency = (price: number): string => {
  const finnish = new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
    minimumSignificantDigits: 5,
    maximumSignificantDigits: 5,
  });
  return finnish.format(price);
};
