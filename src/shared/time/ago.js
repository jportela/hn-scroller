/**
 * Outputs timestamp in a friendly format
 * ... minutes/hours/days/etc ago
 */

const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const YEAR = 365 * DAY

export function ago (timeInSeconds) {
  if (timeInSeconds > YEAR) {
    const result = Math.floor(timeInSeconds / YEAR)
    return `over ${result} year${plural(result)} ago`
  } else if (timeInSeconds > MONTH) {
    const result = Math.floor(timeInSeconds / MONTH)
    return `over ${result} month${plural(result)} ago`
  } else if (timeInSeconds > WEEK) {
    const result = Math.floor(timeInSeconds / WEEK)
    return `over ${result} week${plural(result)} ago`
  } else if (timeInSeconds > DAY) {
    const result = Math.floor(timeInSeconds / DAY)
    return `over ${result} day${plural(result)} ago`
  } else if (timeInSeconds > HOUR) {
    const result = Math.floor(timeInSeconds / HOUR)
    return `over ${result} hour${plural(result)} ago`
  } else if (timeInSeconds > MINUTE) {
    const result = Math.floor(timeInSeconds / MINUTE)
    return `over ${result} minute${plural(result)} ago`
  } else {
    return 'a few seconds ago'
  }
}

export function agoFromTimestamp (timestamp) {
  const timeInSeconds = ((+new Date()) - timestamp) / 1000
  return ago(timeInSeconds)
}

function plural (result) {
  return result > 1 ? 's' : ''
}
