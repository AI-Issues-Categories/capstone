const EN_STOP = new Set([
  'the','is','are','a','an','and','or','but','if','then','else','for','to','of','in','on','at','by','with','as','from','that','this','it','its','be','been','was','were','will','would','can','could','should','may','might','we','you','they','he','she','i','me','my','our','your','their','them','his','her','about','into','over','under','than','so','not'
]);
const KO_STOP = new Set([
  '그리고','또는','그러나','하지만','만약','그러면','그','이','저','것','수','등','및','에서','으로','에게','에서','을','를','은','는','이','가','도','하다','했다','된다','대한','대해','관련','통해','및','에서','까지','보다','같은','있다','없다','위해','더','또','등','때문','때','중','바','이번','최근'
]);

export function extractTopKeywords(text: string, max = 6): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2);

  const freq = new Map<string, number>();
  for (const w of words) {
    if (EN_STOP.has(w) || KO_STOP.has(w)) continue;
    freq.set(w, (freq.get(w) || 0) + 1);
  }
  const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]).map(([w]) => w);
  return sorted.slice(0, max);
}
