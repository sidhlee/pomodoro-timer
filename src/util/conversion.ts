/**
 * converts milliseconds to seconds
 * @param ms milliseconds
 */
export function toSeconds(ms: number) {
  return Math.floor(ms / 1000);
}

export function getMinute(seconds: number) {
  return Math.floor(seconds / 60);
}

export function getSecond(seconds: number) {
  return Math.floor(seconds) % 60;
}

/**
 * Format total seconds to mm:ss format
 * @param ms
 */
export function formatSeconds(seconds: number) {
  const minStr = getMinute(seconds).toString().padStart(2, '0');
  const secStr = getSecond(seconds).toString().padStart(2, '0');

  return minStr + ':' + secStr;
}
