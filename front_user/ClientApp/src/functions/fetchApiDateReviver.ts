const ISO8601Regex =
  /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??/;

export const fetchApiDateReviver = (_key: string, value: any): any => {
  if (typeof value === "string") {
    if (ISO8601Regex.test(value)) {
      return new Date(value);
    }
  }
  return value;
};
