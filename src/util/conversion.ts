/**
 * converts milliseconds to seconds
 * @param ms milliseconds
 */
export function toSeconds(ms: number) {
  return Math.floor(ms / 1000);
}

/**
 * Format total seconds to mm:ss format
 * @param ms
 */
export function formatSeconds(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds) % 60;

  const minStr = min.toString().padStart(2, '0');
  const secStr = sec.toString().padStart(2, '0');

  return minStr + ':' + secStr;
}
