export const formatNumber = (num) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(num);
