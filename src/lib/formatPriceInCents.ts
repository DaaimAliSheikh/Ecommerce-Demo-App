export default function formatPriceInCents(priceInCents: number): string {
  const dollars = (priceInCents / 100).toFixed(2); // Convert cents to dollars and format to 2 decimal places
  return `$${dollars}`;
}
