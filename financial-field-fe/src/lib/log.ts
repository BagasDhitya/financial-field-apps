export type LogLevel = "info" | "warn" | "error";

const LEVEL_RANK: Record<LogLevel, number> = { info: 1, warn: 2, error: 3 };

type LogSink = (level: LogLevel, line: string, data?: unknown) => void;

function consoleSink(level: LogLevel, line: string, data?: unknown) {
  const args = data === undefined ? [line] : [line, data];
  if (level === "error") {
    console.error(...args);
    return;
  }
  if (level === "warn") {
    console.warn(...args);
    return;
  }
  console.info(...args);
}

/**
 * Builds the line in the webReader form `module::fn- message`. Callers pass
 * the prefix without the trailing dash so it stays greppable.
 */
export function formatLogLine(prefix: string, message: string): string {
  return `${prefix}- ${message}`;
}

/**
 * Leveled logger (conventions W3). Error is for real failures only. Never pass
 * user-entered text in full: log lengths or ids instead.
 */
export function createLogger(
  minLevel: LogLevel = "info",
  sink: LogSink = consoleSink,
) {
  function write(
    level: LogLevel,
    prefix: string,
    message: string,
    data?: unknown,
  ) {
    if (LEVEL_RANK[level] < LEVEL_RANK[minLevel]) {
      return;
    }
    sink(level, formatLogLine(prefix, message), data);
  }

  return {
    info: (prefix: string, message: string, data?: unknown) =>
      write("info", prefix, message, data),
    warn: (prefix: string, message: string, data?: unknown) =>
      write("warn", prefix, message, data),
    error: (prefix: string, message: string, data?: unknown) =>
      write("error", prefix, message, data),
  };
}

export const log = createLogger("info");
