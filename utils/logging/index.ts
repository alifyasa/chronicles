import { DateTime } from "luxon";

const logLevels = ["info", "warn", "error", "log", "debug"] as const;
type LogLevel = (typeof logLevels)[number];

type CustomLogger = {
  [key in LogLevel]: (message: string) => void;
};

function createDefaultLogger(category: string): CustomLogger {
  const logger: CustomLogger = {} as CustomLogger;
  for (const level of logLevels) {
    logger[level] = (message: string) => {
      console[level](`[${DateTime.now().toISO()}] [${category}] ${message}`);
    };
  }
  return logger;
}

export { createDefaultLogger };
