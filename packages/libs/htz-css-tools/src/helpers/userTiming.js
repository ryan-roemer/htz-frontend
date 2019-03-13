// @flow

declare var performance: Performance;
const supportsUserTiming = typeof performance !== 'undefined'
  && typeof performance.mark === 'function'
  && typeof performance.measure === 'function';

function formatMarkName(markName: string): string {
  return `⏳ ${markName}`;
}

export function startPerfTiming(markName: string): void {
  if (supportsUserTiming) performance.mark(`${formatMarkName(markName)} start`);
}

export function endPerfTiming(markName: string): void {
  if (supportsUserTiming) {
    const formattedName = formatMarkName(markName);
    const startMark = `${formattedName} start`;
    const endMark = `${formattedName} end`;
    performance.mark(endMark);
    performance.measure(formattedName, startMark, endMark);
  }
}
