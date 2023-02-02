/**
 * 主进程日志工具
 */

const winston = require('winston');
const { format } = winston;
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

function timezoned_tm() {
  var a = new Date();
  return a.toLocaleString() + "." + a.getMilliseconds()
}

const conbinedFormat = combine(
  label({ label: '' + global.process.pid }),
  timestamp({ 'format': timezoned_tm }),
  format.splat(),
  myFormat
);

const logger = winston.createLogger({
  level: 'info',
  format: conbinedFormat,
  transports: [
    new winston.transports.File({
      filename: 'D:/logs/server.log',
      maxsize: 1024 * 1024 * 2,
      maxFiles: 8,
      tailable: true,
    })
  ]
})

module.exports = logger