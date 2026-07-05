/**
 * Calculates the estimated reading time in minutes for a given text or array of texts.
 * Standard reading speed is ~200 words per minute.
 * Returns at least 1 minute.
 */
export interface ReadingTimeResult {
  minutes: number;
  wordCount: number;
  text: string;
}

export function calculateReadingTime(content: string | string[] | (string | string[])[]): ReadingTimeResult {
  let totalWords = 0;

  const countWords = (text: string): number => {
    if (!text) return 0;
    // Strip basic markdown / formatting characters
    const cleanText = text
      .replace(/[#*`_\[\]()\-]/g, ' ')
      .replace(/<\/?[^>]+(>|$)/g, '');
    const words = cleanText.trim().split(/\s+/);
    return words.filter(word => word.length > 0).length;
  };

  const processItem = (item: any) => {
    if (typeof item === 'string') {
      totalWords += countWords(item);
    } else if (Array.isArray(item)) {
      item.forEach(subItem => processItem(subItem));
    }
  };

  processItem(content);

  const wpm = 200;
  const minutes = Math.ceil(totalWords / wpm);
  const finalMinutes = minutes > 0 ? minutes : 1;

  return {
    minutes: finalMinutes,
    wordCount: totalWords,
    text: `${finalMinutes} min read`
  };
}
