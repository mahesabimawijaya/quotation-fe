export const formatDate = (date: string) => {
  return new Date(date).toLocaleString("id-ID", { hour12: false });
};

export const formatCurrency = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
