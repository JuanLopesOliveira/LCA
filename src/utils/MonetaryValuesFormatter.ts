export function monetaryValuesFormatter(monetaryValue: number) {
  return monetaryValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "USD",
  });
}
