export const log = (type: "log" | "error" | "warn", message: unknown) => {
  console?.[type](`Softphone ${type}: `, message);
};
