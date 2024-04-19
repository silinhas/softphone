const STYLES = {
  log: "color: dodgerblue;",
  error: "color: red;",
  warn: "color: orange;",
};

export const log = (
  type: "log" | "error" | "warn",
  message: unknown,
  context?: unknown
) => {
  if (import.meta.env.SOFTPHONE_DEBUG) {
    console?.[type](
      `%c@telaclaims-tech/softphone ${type}: `,
      STYLES[type],
      message,
      context
    );
  }
};
