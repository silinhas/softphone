export const log = (
  type: "log" | "error" | "warn",
  message: unknown,
  context?: unknown
) => {
  console?.[type](`Softphone ${type}: `, message, context);
};
