export function fromDateToPtBRString(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "long",
  }).format(date);
}
