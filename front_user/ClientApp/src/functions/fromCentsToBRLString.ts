export function fromCentsToBrazilianCurrency(price?: number) {
  price = price ?? 0;

  price = price / 100;
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(price);
}
