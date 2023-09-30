import * as log4js from "log4js";
import * as fs_logger from "fs";
const logRootPath = "./logs";
//Remove old log files
if (fs_logger.existsSync(`${logRootPath}/service.log`)) {
  fs_logger.unlinkSync(`${logRootPath}/service.log`);
}

if (fs_logger.existsSync(`${logRootPath}/error.log`)) {
  fs_logger.unlinkSync(`${logRootPath}/error.log`);
}

const appendArr = ["service", "errors"];

if (process.env.NODE_ENV == 'production') { 
  appendArr.push("out");
}

log4js.configure({
  appenders: {
    out: { type: "stdout" },
    serviceFile: { type: "file", filename: "./logs/service.log" },
    service: { type: "logLevelFilter", level: "info", appender: "serviceFile" },
    errorFile: { type: "file", filename: "./logs/error.log" },
    errors: { type: "logLevelFilter", level: "error", appender: "errorFile" },
  },
  categories: {
    default: {
      appenders: appendArr,
      level:
        process.env.NODE_ENV === "test"
          ? "off"
          : process.env.NODE_ENV === "development"
          ? "debug"
          : "info",
    },
  },
});

export default log4js;

export const service_logger = log4js.getLogger("service");
