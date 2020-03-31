const END_COLOR_CONSOLE = '%s\x1b[0m'

const ERROR  = "\x1b[31m" + END_COLOR_CONSOLE
const SUCCESS = "\x1b[32m" + END_COLOR_CONSOLE
const WARNING = "\x1b[33m" + END_COLOR_CONSOLE
const INFO    = "\x1b[34m" + END_COLOR_CONSOLE

module.exports = { SUCCESS, ERROR, WARNING, INFO }
