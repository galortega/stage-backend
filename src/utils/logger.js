import winston from "winston"

const myLevels = {
  levels: {
    fatal: 0,
    crit: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
  },
  colors: {
    trace: "white",
    debug: "green",
    info: "green",
    warn: "yellow",
    crit: "red",
    fatal: "red"
  }
}
const consoleTransport = new winston.transports.Console({
  level: "trace",
  timestamp: true,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  )
})

const logger = winston.createLogger({
  levels: myLevels.levels,
  transports: [consoleTransport]
})

winston.addColors(myLevels.colors)

export default logger
